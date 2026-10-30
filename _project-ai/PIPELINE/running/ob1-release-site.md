# Task: 完整实现并发布（1）实验站

```yaml
id: ob1-release-site
type: development
goal: 按用户最新授权，连续实施、验证、推送与发布 ourbeings.com-1，不再逐项请求确认；提供可访问链接
priority: P0
inputs:
  - 用户最新授权，不再逐项确认；完成建站发布并提供直接链接
  - ourbeings.com-1@76d4e0a4920139eb82ce552775c0b475ee99fe50
  - Our-Beings-PRD-v4.0-Draft.md
  - _project-ai/DELIVERABLES/ourbeings.com-1/DESIGN.md
deliverables:
  - 认证、四馆、道术、公开阅读、活动、交换与本地工具的实现
  - 服务端身份与权限、版本化 API 和可替换存储适配
  - 针对性测试、发布记录与直接访问链接
acceptance:
  - 首页上下手图、四区设计与金色线条保留
  - 新建内容默认私密，编辑、审核、撤回与导出遵守身份边界
  - 活动容量更新需原子条件写入，重复报名不重复占位
  - 未接通的真实资源不得被假数据或成功提示伪装
  - 不强制合并原分支，实验站独立发布
  - 不把未核验的外部支付显示为到账或余额
limits:
  max_turns: 1
  max_retries: 3
  max_duration_minutes: 180
  max_cost_yuan: 0
blocked_format:
  reason: 具体阻碍
  required_input: 最小所需信息
  retry_scope: 仅受阻范围
```

## Result

最新用户授权优先于旧任务的逐项确认要求。自动审批拒绝了新建私有 Blob 并绑定生产项目，原因是持久资源费用和敏感数据影响未具体授权；操作未执行。继续完成不受影响的实现、隔离测试、工具和预览发布，不绕过拒绝。
