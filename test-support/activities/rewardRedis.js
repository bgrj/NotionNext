// Stateful repository fixture for service-level race and permission tests.
export function rewardRedis() {
  const rows = new Map(), sets = new Map(), reports = []
  const set = key => { if (!sets.has(key)) sets.set(key, new Set()); return sets.get(key) }
  const db = {
    rows, sets, reports,
    get: jest.fn(async key => rows.get(key) ?? null),
    set: jest.fn(async (key, value) => { rows.set(key, value); return 'OK' }),
    scard: jest.fn(async key => set(key).size),
    zrange: jest.fn(async () => reports.slice()),
    mget: jest.fn(async keys => keys.map(key => rows.get(key) ?? null)),
    eval: jest.fn(async (script, count, ...args) => {
      const keys = args.slice(0, count), values = args.slice(count)
      if (script.includes('membership-bug-seed-v1')) {
        if (rows.get(keys[0]) !== values[0]) return 0
        set(keys[1]).add(values[1]); return 1
      }
      if (script.includes('membership-offer-claim-v1')) {
        if ((rows.get(keys[0]) || '') !== values[0] || rows.get(keys[1]) !== values[1]) return 'conflict'
        const account = JSON.parse(values[1])
        if (values[3] === 'founding' && (!Number.isSafeInteger(account.number) || account.number < 1 || account.number > Number(values[4]))) return 'ineligible'
        if (values[3] === 'beta' && set(keys[2]).size < Number(values[4])) return 'ineligible'
        rows.set(keys[0], values[2]); return 'claimed'
      }
      if (script.includes('feedback-review-v2')) {
        if (rows.get(keys[0]) !== values[0]) return 'conflict'
        rows.set(keys[0], values[1])
        if (values[2] === '1') set(keys[1]).add(values[3])
        if (values[2] === '0') set(keys[1]).delete(values[3])
        return values[1]
      }
      throw Error('Unexpected repository transaction')
    })
  }
  return db
}
