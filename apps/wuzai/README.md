# 吾在 · 原生微信小程序

整个目录可以独立复制并导入微信开发者工具。它是原生 WXML / WXSS / JS 工程，不需要网站的 Node.js 依赖或 Next.js 构建。活动使用吾在网站的统一后端，与网站共用数据。

1. 确认 `project.config.json` 的 AppID 和 `miniprogram/settings.js` 的云环境属于你的微信账号；默认值来自 `D:\02_Dev\Our-Being` 参考工程。
2. 在微信开发者工具中上传新云函数 `wuzaiApi`，选择云端安装依赖。不要覆盖原有 `activityService`。
3. 网站服务端设置 `WUZAI_MINI_APP_ID`；网站与云函数环境各设置同一随机 `WUZAI_MINI_BRIDGE_SECRET`，云函数的 `WUZAI_API_ORIGIN` 使用 `https://ourbeings.com`。密钥不能写入客户端。
4. 确认文本检查权限、网站 Redis 服务正常；本目录本身不包含另一套数据库或历史数据迁移。
5. 在 `settings.js` 填写真实支持邮箱，完善微信后台隐私指引、主体资料和服务类目，完成开发者工具和真机回归，再上传并提交审核。

本版提供活动列表、详情、草稿与发布、预约与退出、活动通知、我的活动。微信活动使用发起人自建微信群，没有小程序内聊天。通知显示在详情页，尚未启用微信订阅推送。微信账号与网站账号独立，未做自动绑定。

`miniprogram/common/activities.js` 同时供网站后端使用，包含纯 JavaScript 业务规则。客户端云函数只信任微信服务端上下文中的身份，不信任页面传入的 OPENID。

当前为可复制的原生源码包；静态检查通过不代表已上传云函数、完成微信真机验收或获得审核通过。完整设计与接口见网站仓库的 `docs/operations/our-beings-activities-2026-11-24.md`。
