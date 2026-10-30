# 社区 API v1 与数据边界

入口 `/api/ourbeings/v1`。所有身份来自服务端验证的 Clerk 请求，不接受客户端 ownerId 或 moderator 声明。不在默认日志中写正文、联系人或 SDK 错误载荷。错误结构为 `{error:{code,message},requestId}`；成功为 `{data,requestId}`。返回私有不缓存响应；修改请求拒绝外站 Origin。

| 方法／查询 | 用途与权限 |
| --- | --- |
| GET status | 当前身份配置、存储是否可用；不返回令牌与私密内容 |
| GET feed／reading/:id | 当前审核通过的公开摘要／版本；私密、撤回、归档、删除不返回 |
| GET events／event/:id | 公开活动与安排；本人确认报名后才附加会议安排 |
| GET exchanges／exchange/:id | 公开物品与约定状态；双方同意后才共享必要联系人 |
| GET workspace／content/:id／trash | 当前用户的记录、私人查询、计数和最近删除 |
| GET my-events／event-draft/:id／registrations/:id | 组织者自己的活动与报名联系人；管理员不能因此读取别人的联系人 |
| GET my-registrations／notifications／bookmarks／my-exchanges | 仅当前用户自己的管理记录 |
| GET export | 当前用户的 ID、时间、分类、来源和文字；组织者导出不包含其他报名者联系方式 |
| GET review | 经过服务端验证的审核者；只读主动提交的公开版本、公开反馈与回应 |
| POST commands | 显式动作与 input；修改记录需携带 revision，冲突返回 409，输入保留 |

动作包括 `profile.save`、`content.create/save/submit/withdraw/archive/delete/restore`、`event.create/save/submit/withdraw/cancel`、`registration.join/cancel`、`bookmark.toggle`、`notifications.read`、`report.create`、`comment.create`、`exchange.create/propose/accept/deliver/complete/cancel/dispute/close`、`review.decide/report/comment`。

Content 的 kind 与 domain 独立；草稿、公开版本、审核状态和个人归档独立。普通编辑保留已公开版本；主动提交后审核通过才替换。关联笔记保留原 ID，私人关联不进入公开 DTO。附件上传本轮关闭，来源只作为索引链接。

活动使用 UTC 时间戳及独立 IANA 展示时区。前端把当地时间转换为明确时刻，并拒绝夏令时不存在或重复的输入；服务端判定截止、容量和幂等报名。整个状态快照条件提交，因此报名、名额与站内通知一同生效。没有外部消息自动发送。

当前真实存储未开通。配置缺失时拒绝真实修改，不退化为内存成功。显式功能导览使用相同的规则和内存 CAS，但持久化范围仅当前浏览器；不作为真实身份与云端业务验收证据。

私有 Blob 用作低量实验的有界存储适配，读取绕过 CDN，更新需 ETag，状态总量不超过 4 MiB。后续可保持模型与接口，用事务数据库替换 read／compareSwap 接口；需迁移演练、数量核对与身份映射，不把缓存当数据库。
