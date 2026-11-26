# 公测反馈服务

`POST /api/our-beings/mini` 的 `submitFeedback` 操作，复用已有微信会话与 Redis。无需新增数据库或支付服务配置。客户端字段：`clientRequestId`、`description`、`severity`、`alipayCode`（必填，一张 base64 JPEG/PNG 收款码）、`screenshots`（最多四张 base64 JPEG/PNG）。

服务端固定状态 `pending`、奖励 `500` 分；不接受客户端指定审批或奖励。以账号摘要和请求标识生成反馈 ID，同请求不同内容返回 409，重试不新增记录。每天每账号最多 5 次，由 Redis Lua 原子检查与保存。问题截图与收款码均限制像素与字节，转换为 JPEG 并移除元数据；全部为私有数据，不复用公开封面存储。

保留期限 90 天，记录自动过期。工作人员可通过网页后台 `/our-beings/feedback-admin` 查看与处理：服务端环境变量设置至少 16 位的 `WUZAI_FEEDBACK_ADMIN_TOKEN`，打开页面后输入同一密钥。列表与详情接口为 `GET/PATCH /api/our-beings/feedback-admin`，使用 `Authorization: Bearer <token>`。也可直接读 Redis：`MINI_PREFIX + feedback-index` 与 `MINI_PREFIX + feedback:<id>`。不要把收款码、图片或原始记录复制到公开 issue 或日志。

核实是否可复现、是否重复以及首次提交者后，在后台打开 `alipayCode` 收款码截图人工发放 5 元，并将状态改为 `paid` / `rejected` / `duplicate` 等。建议不领取 Bug 奖励。该接口没有自动转账功能，不应仅凭前端金额或提交成功回执发奖。

高清封面由用户图床 `bgrj/bgrj-images` 的固定提交 `5174880264d106520c7a8470962acb00c49e2125` 同步到 `public/assets/ourbeing/carousel/`，作为站点镜像。小程序镜像失败后尝试固定 GitHub 直链，最后显示主包预览。截图与用户头像不进入此公共目录。

验证：`npx jest --runInBand __tests__/lib/activities`（相关项），`npx eslint lib/activities/miniFeedback.js pages/api/our-beings/mini.js`。部署后核对匿名 `submitFeedback` 返回 401，镜像 JPEG 返回 200，登录后的受控反馈返回待核实回执。不要为验收向真实奖励队列制造反馈。
