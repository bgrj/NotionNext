/** @jest-environment node */
import { beginCompliance, acceptCompliance, requireCompliance } from '@/lib/activities/miniCompliance'
const actor={id:'wx:one'}
function redis() { const rows=new Map(); return {set:jest.fn(async(k,v)=>rows.set(k,v)),get:jest.fn(async k=>rows.get(k))} }
test('the server enforces twenty seconds, explicit agreement, account ownership and expiry',async()=>{
  const store=redis(), now=100000
  const {token}=await beginCompliance(store,actor,now)
  await expect(acceptCompliance(store,actor,token,now+19999)).rejects.toMatchObject({code:'compliance_wait'})
  await expect(requireCompliance(store,actor,token,true,now+20000)).rejects.toMatchObject({code:'compliance_required'})
  await expect(acceptCompliance(store,{id:'other'},token,now+20000)).rejects.toMatchObject({code:'compliance_required'})
  await acceptCompliance(store,actor,token,now+20000)
  expect((await requireCompliance(store,actor,token,true,now+21000)).acceptedAt).toBe(now+20000)
  await expect(requireCompliance(store,actor,token,true,now+1200000)).rejects.toMatchObject({code:'compliance_required'})
})
