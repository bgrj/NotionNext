# 公测反馈服务

`POST /api/our-beings/mini` 的 `submitFeedback` 操作，复用已有微信会话与 Redis。无需新增数据库或支付服务配置。客户端字段：`clientRequestId`、`description`、`severity`、`contact`、`screenshots`（最多四张 base64 JPEG/PNG）。

服务端固定状态 `pending`、奖励 `500` 分；不接受客户端指定审批或奖励。以账号摘要和请求标识生成反馈 ID，同请求不同内容返回 409，重试不新增记录。每天每账号最多 5 次，由 Redis Lua 原子检查与保存。截图限制像素与字节，转换为 JPEG 并移除元数据；所有反馈与截图均为私有数据，不复用公开封面存储。

保留期限 90 天，记录自动过期。工作人员使用现有 Redis 管理权限，通过 `MINI_PREFIX + feedback-index` 的有序集合读取编号，再查 `MINI_PREFIX + feedback:<id>`。索引只包含编号和提交时间，过期索引在下次提交时清理；不存在的记录可忽略。不要把联系方式、图片或原始记录复制到公开 issue 或日志。

核实是否可复现、是否重复以及首次提交者后，使用记录内联系方式联系并人工发放 5 元。建议不领取 Bug 奖励。该接口没有自动转账、审核或领奖功能，不应仅凭前端金额或提交成功回执发奖。

高清封面由用户图床 `bgrj/bgrj-images` 的固定提交 `5174880264d106520c7a8470962acb00c49e2125` 同步到 `public/assets/ourbeing/carousel/`，作为站点镜像。小程序镜像失败后尝试固定 GitHub 直链，最后显示主包预览。截图与用户头像不进入此公共目录。

验证：`npx jest --runInBand __tests__/lib/activities`（329 项），`npx eslint lib/activities/miniFeedback.js pages/api/our-beings/mini.js`。部署后核对匿名 `submitFeedback` 返回 401，镜像 JPEG 返回 200，登录后的受控反馈返回待核实回执。不要为验收向真实奖励队列制造反馈。
