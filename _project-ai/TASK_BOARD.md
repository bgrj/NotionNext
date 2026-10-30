# Task Board

Current scope: implement and publish `ourbeings.com-1` under the latest user authorization. No per-item confirmation pauses. Merge back to `ourbeings.com` remains a later user decision.

## Current release

- Runtime commit: `67d37db736918e2f7338ef156aebdb8bd8193352`.
- Implemented: account-flow corrections, four collections, Dao/Shu editing, moderated public editions, reading room, events, exchanges, support-link review and local file tools.
- Evidence: 189 tests / 11 suites passed; complete Next.js build passed; six protected homepage files unchanged.
- Live boundary: new cloud persistence disabled. Automatic approval rejected creation of a private Blob store bound to the production project; no resource was created and the rejected operation was not retried through another surface.
- Demo: explicitly labelled synthetic actors/data in browser storage, separate from real private APIs. Original desk requires leaving the demo.
- Permanent public sharing: automatic approval rejected a non-expiring deployment share link; temporary sharing remains available. No protection setting was changed.
- Primary preview: `dpl_Du2ZCipV5K2rHx1tpeThidMtyVRm` READY; critical routes and actual temporary demo share URL return 200.
- Deployment, access and remaining checks: [release record](DELIVERABLES/ourbeings.com-1/RELEASE-01.md).

## Planning records

[PRD execution](DELIVERABLES/ourbeings.com-1/EXECUTION.md) · [design](DELIVERABLES/ourbeings.com-1/DESIGN.md) · [acceptance](DELIVERABLES/ourbeings.com-1/ACCEPTANCE.md).

Earlier OB1 task files and candidate reviews describe their original baseline. The latest continuous-release authorization and RELEASE-01 supersede their per-item conversational pauses and historical progress labels. They do not automatically authorize new paid resources, production promotion, data migration or later native-client publication.

## Queues

`PIPELINE/done/ob1-release-site.md` records accepted source/demo/preview delivery. `PIPELINE/blocked/ob1-cloud-persistence.md` and `ob1-permanent-public-access.md` record the automatic-approval blockers. Full cloud rollout and real-environment verification remain incomplete.
