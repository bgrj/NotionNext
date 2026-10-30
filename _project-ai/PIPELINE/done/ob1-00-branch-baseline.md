# Task: 建立 Our beings 独立实施分支

```yaml
id: ob1-00-branch-baseline
type: development
goal: 从 ourbeings.com 最新提交复制实验分支，逐项映射完整 PRD、设计参考、依赖和验收节点
priority: P0
inputs:
  - 用户于 2026-10-31 授权创建（1）分支，后续调整后再合并
  - bgrj/NotionNext@b8fe4c443c8a4310622ed33bdfb1a7d7b73fb74b
  - Our-Beings-PRD-v4.0-Draft.md v4.0.6
  - https://shizhe-buguo-renjian.stonycake21.chatgpt.site/
deliverables:
  - ourbeings.com-1 分支
  - _project-ai/DELIVERABLES/ourbeings.com-1/EXECUTION.md
  - _project-ai/DELIVERABLES/ourbeings.com-1/DESIGN.md
  - _project-ai/DELIVERABLES/ourbeings.com-1/ACCEPTANCE.md
  - 逐项实施任务文件
acceptance:
  - 分支从实际远端最新提交创建，包含已有登录改动
  - 原分支、正式域名、Notion 数据和环境变量保持原状态
  - PRD 所有章节和需求编号均有去向，不能把计划标记为完成
  - 首页上下手图、四区设计和金色线条保留
  - 实施分项可单独审阅与回退，合并需用户后续明确确认
limits:
  max_turns: 1
  max_retries: 2
  max_duration_minutes: 90
  max_cost_yuan: 0
blocked_format:
  reason: 具体阻碍
  required_input: 最小所需信息
  retry_scope: 仅重试受阻节点
```

## Result

```yaml
status: done
task_id: ob1-00-branch-baseline
deliverables:
  - ourbeings.com-1 分支，从 b8fe4c443c8a4310622ed33bdfb1a7d7b73fb74b 创建
  - 全文执行矩阵、子页面设计、T01～20 验收账本
  - OB1-01～16 任务队列，前置决策与发布授权独立记录
checks:
  - 实际远端分支和完整树已核对，无 AGENTS.md
  - 参考站第 1 版源码与托管身份已核对
  - 首项候选 67 项针对性测试和隔离构建通过，但运行文件尚未启用
blocked: none
```

原分支与生产环境未改变。真实身份和浏览器验收限制记录在 AUTH-01-REVIEW.md，不作为分支复制的阻碍。
