# Task Board

Current rule: one smallest verifiable task per round.

## Our beings（1）实施分支

- 分支：`ourbeings.com-1`，复制起点 `b8fe4c443c8a4310622ed33bdfb1a7d7b73fb74b`。
- [完整 PRD 执行清单](DELIVERABLES/ourbeings.com-1/EXECUTION.md) · [子页面设计](DELIVERABLES/ourbeings.com-1/DESIGN.md) · [验收账本](DELIVERABLES/ourbeings.com-1/ACCEPTANCE.md)。
- OB1-00：分支与计划完成；OB1-01：候选评审，尚未启用运行文件。
- OB1-02～16：按依赖排队。任务登记不表示前置决策、真实资源或发布权限已经通过；执行前核对各任务的 acceptance。
- 沿用用户逐项确认的节奏，合并回 `ourbeings.com` 等用户后续明确确认。

## Queues

- `PIPELINE/ready/`: scoped task files queued for execution; check prerequisites and approval state inside each file first
- `PIPELINE/running/`: one executor actively working
- `PIPELINE/review/`: deliverables waiting for QA or director review
- `PIPELINE/blocked/`: tasks missing required input
- `PIPELINE/done/`: accepted tasks

## Metrics To Track

- accepted deliverables
- first-pass acceptance rate
- retry count
- cycle time
- human approval count
- real business outcome

Do not track message count, role count, or meeting summaries.
