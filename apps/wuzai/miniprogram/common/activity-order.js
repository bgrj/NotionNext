const ranks = { open: 0, full: 1, closed: 1, ongoing: 2, ended: 3, cancelled: 4 }

function compareActivityCards(a, b) {
  const rankA = ranks[a.status] ?? 5, rankB = ranks[b.status] ?? 5
  if (rankA !== rankB) return rankA - rankB
  const startA = Date.parse(a.startsAt), startB = Date.parse(b.startsAt)
  const difference = (Number.isFinite(startA) ? startA : 0) - (Number.isFinite(startB) ? startB : 0)
  if (difference) return rankA >= 3 ? -difference : difference
  return String(a.id || '').localeCompare(String(b.id || ''))
}

module.exports = { compareActivityCards }
