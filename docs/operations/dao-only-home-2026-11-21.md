# 首页暂时仅开放「道」

## 同步与实施

1. 本地 `ourbeings.com` 从 `d7d91ab6` 快进至远端 `b8fe4c44`，保留原有三个未跟踪文件，并备份至 `E:\MyWeb\backups\NotionNext-before-dao-20261121`。
2. 保留手部背景及「道」原有书法与点击区域，仅渲染已启用入口。桌面位于左下方，手机保留阅读提示。
3. Notion「Our beings」的 18 篇 `category=道`、`type=Post` 文章由 `Draft` 改为 `Published`，正文与其他分类不变。
4. Notion 配置中心新增并启用 `OURBEINGS_HOME_SECTIONS=dao`，首页入口指向 `/category/道`。首次访问公告同步介绍当前开放的「道」，不再推荐隐藏板块。
5. 推送至 GitHub `ourbeings.com`，由现有 Vercel `ourbeing` 项目部署至 `ourbeings.com`。

## 配置

入口标识：`our`（我们的存在）、`self`（我的存在）、`dao`（道）、`shu`（术）。

恢复四入口：将配置值改为 `our,self,dao,shu`；也支持 JSON 数组。隐藏入口不会删除其他分类或文章，也不改变它们的访问权限。

## 验证

- 首页、导航和生命记录的相关测试共 10 项通过。
- 本次组件在正式站布局内预览：1440×900、390×844、320×568、768×1024 均只有「道」链接且无横向溢出。
- 本地完整开发服务器因内存分配失败退出；完整文章流程在 Vercel 部署后复核。
