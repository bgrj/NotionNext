# Task Board

Current scope: continuously implement and publish ourbeings.com-1 under the latest user authorization; no per-item conversational pauses.

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

## 当前连续发布

`ob1-release-site` 覆盖本轮实现、验证与发布。189 项针对性测试及完整 Next 构建通过。新私有 Blob 绑定生产的创建请求被自动审批拒绝，操作未执行；真实存储关闭，导览与实时 API 隔离。详细状态见 RELEASE-01.md。
