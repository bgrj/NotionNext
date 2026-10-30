# Our Being 国内访问性能与安全优化：执行计划与发布门禁

审计开始：2026-10-02。站点：<https://ourbeings.com/>。基线：`ourbeings.com` 分支 `90624a21e95092d1091139c38e1722a2c2a14ef5`。修复分支：`perf-security/ourbeing-20261002`。

**本轮只在独立分支准备修复，没有合并、生产发布、改 DNS、改 Notion 发布状态、部署 Worker 或购买服务。** 工作电脑在续接时被重置，代码从本次操作记录恢复后重新验证；恢复前的通过记录不代替当前验收。

GitHub 写入首次触发额外确认；所有者随后已明确批准独立分支推送和草稿 PR，但同一接口再次被安全机制拦截。因此补丁仍未推送，草稿 PR 仍未创建；没有改用其他写入通道绕过。所有者选择保留密码阅读、先准备真正服务端授权改造，实际状态 / 权限 / 部署仍另行确认。

## 1. 目标与证据边界

目标不是先换 CDN，而是减少不必要的跨域关键资源、让正文更早出现在初始 HTML、去掉普通页面额外的边缘请求，并修复已定位的授权 / 敏感信息处理问题。网络路径与应用负担要分别测量。

- 原站使用自定义域名和 Vercel，首屏两张原 PNG 来自 jsDelivr。原页面初始 HTML 主要是骨架，内容依赖客户端接管。
- 国内多节点测试被验证码阻断，刷新后的挑战图片未能加载；已有示例表格已排除。**没有可用国内三网数据，也没有宣称国内提速百分比。** 非大陆观测与 localhost 不能作国内前后对照。
- 两张主视觉原文件总计 **2,405,008 字节**，本轮 WebP 总计 **119,784 字节**，减少 **95.02%**。这是图片文件体积，不是整站速度。
- 未用真实账户验收 Clerk / OAuth；托管后台、WAF、DNS、部署环境变量及原有 Security 告警仍有访问边界。

## 2. 分阶段 Plan

| 阶段 | 优先级 | 工作 | 验收 / 决策门槛 |
| --- | --- | --- | --- |
| A 基线 | P0 | 确认生产分支、主题、图源、响应头、API、依赖、CI；只读观测 | 保护私有证据；不写线上、不压测；区分地区和测量方式 |
| B 应用性能 | P1 | 原作品保真压缩 / 同源化、修复主题 SSR、移除无效预热、限制 UUID 跳转表请求 | 手机 / 桌面可读，无首屏 hydration 重建，视觉和内容不改，有回滚开关 |
| C 安全修复 | P0/P1 | 缓存管理 fail-closed、OAuth 防泄漏、图片来源 / 类型约束、响应头 / CORS、兼容依赖补丁 | 自动回归、生产模式构建；真实凭据不进页面、URL、日志 |
| D 可审阅交付 | P1 | 独立分支、草稿 PR、计划、验收和回滚记录；覆盖生产分支 CI / CodeQL | 检查实际 CI / CodeQL，不把配置当结果；等待所有者审阅 |
| E 机密内容与告警 | P0 | 真正服务端文章授权、源站权限、旧缓存；原 Code scanning 告警逐条对账 | 所有者先确认处置；匿名 HTML / JSON / RSS / 搜索 / 缓存不含机密正文 |
| F 预览与发布 | P1 | 先预览，核对环境 / 图源 / 评论 / 登录；获批后生产；国内三网和微信内复测 | 有正常部署回滚点；发布批准明确；没有批准不合并 |
| G 基础设施 | P2 | 核实备案、托管、DNS 控制权、预算；据三网数据比较香港近源 / 合规国内源站与 CDN | 不盲目套代理，不自动改 DNS 或买套餐 |

## 3. 已准备的性能修复

### 图片：原作品不换，只减轻负担

| 原资源 | 原字节 | 新字节 | 尺寸 |
| --- | ---: | ---: | --- |
| `web-mainpage-uphand.png` | 999,053 | 44,176 | 保持 2048 × 872 |
| `web-mainpage-downhand.png` | 1,405,955 | 75,608 | 保持 2048 × 989 |
| `faction2.ico` | 67,646 | 6,166 | 输出 64 × 64 favicon |

- 两张主视觉使用 WebP quality 90，完整尺寸与构图保留；已检查并排对照。
- 只将已知的三个作者资源及其对应 raw GitHub 地址映射为本站哈希路径，其他作者、版本、正文图源不擅自重写。
- CSS 背景、头图、头像和 favicon 采用相同精确映射；哈希资源使用一年 `immutable` 缓存，更新内容会换文件名。
- 仓库写入工具仅接受 UTF-8，因此原料放在不属于 `public` 静态目录的源码 manifest，构建时校验 SHA-256 / 长度、还原二进制。不是把 base64 图片塞进客户端 JS；生产构建会另验这个边界。
- 回滚：`NEXT_PUBLIC_LOCAL_SITE_ASSETS=false` 后重新构建，恢复原引用。

### SSR、首屏稳定和边缘请求

- 为正在使用的 `my-theme` 提前注册字面量动态布局导入，避免 render 内创建 loadable 导致首屏只出骨架。其他主题保留原逻辑。
- 页脚、友情链接、存在分类的静态样式采用项目已有的 `styled-jsx global` 模式，解决 raw-text style 的引号转义差异造成的 React hydration 失败。不是用 suppressHydrationWarning 掩盖问题；品牌文案未改。
- 存在分类的 SSG 与首次客户端渲染使用同一序列化时钟快照，挂载后再启动实时计时，避免构建与访问时间不同、上海跨午夜时日历和倒计时触发 hydration 重建。普通分类和分页语义不变，新增跨午夜回归。
- 普通首页、文章和 API 不再先取 `redirect.json`；仅合法 UUID / 32 位 Notion 旧地址查询。来源用受信的规范站点、1.5 秒上限、禁止上游重定向；目标为安全本站路径并避免循环。
- 移除无条件 Unsplash preconnect / DNS-prefetch 和 regular / brands 字体预加载；真正用到时仍加载，solid 图标字体保留。规范链接默认 HTTPS。
- 可选计数、打字等外部服务仍有波动。本轮不盲目搬运所有第三方；下一轮按瀑布图、用途和许可证逐个处理，不能让统计成为阅读前置条件。
- 构建仍报告部分分类、搜索、归档和 404 页面数据超出建议体积；这是下一轮按路由裁剪无用字段与延后非关键组件的明确范围，本轮没有宣称所有页面载荷已经优化完毕。

## 4. 已准备的安全修复

| 项目 | 措施 | 验收与边界 |
| --- | --- | --- |
| 缓存管理 API | POST only；缺少 / 空白 token 503，错误授权 401；摘要常量时间比较；no-store | 需配置高熵 `CACHE_REVALIDATION_TOKEN` 才能使用；没有调用线上清缓存 |
| Notion OAuth 示例 | 默认关闭；显式开启且完整配置才启动；随机 state + HttpOnly / SameSite / Secure cookie；校验后限时换 token；只返回状态 | 不向 URL / props / 日志回显凭据。仍是没有 token 存储的演示，不是完整多用户集成；真实集成需服务器存储、撤销与权限设计 |
| Next 图片优化 | 仅精确可信 HTTPS 主机；关闭 SVG 优化；限制响应体；附件 disposition | 防御面收缩，不声称旧版已遭 SSRF 利用；额外可信域名用 `NEXT_IMAGE_ALLOWED_HOSTS`，不恢复通配符 / HTTP / 私有 IP |
| Notion 图片 Worker | 只缓存成功图片 MIME；上游错误 / HTML 不缓存；忽略不安全旧缓存；nosniff、CSP、SVG attachment | 代码和部署说明同步；没有部署 Worker；保持原 Notion / S3 路径来源限制 |
| 响应头 / CORS | nosniff、Referrer-Policy、Permissions-Policy；CSP object / base / frame-ancestors；RSS 保留匿名专用 CORS | 不是完整 script-src/XSS CSP；未粗暴禁用作者脚本、样式和文章嵌入 |
| 依赖 | 保持调用方主版本范围的选择性补丁，Clerk React / PostCSS 等 resolution | 没有强升 Next / React，也没有 audit fix --force |
| 持续验证 | CI / CodeQL 覆盖实际生产分支的 push / PR；CodeQL security-extended；contents:read；Worker 回归进入 CI | 必须核对实际运行结果；既有告警没有自动视作关闭 |

如果旧 OAuth 演示曾处理真实授权，需要检查旧日志和 URL、撤销可能泄露的 access token、轮换 client secret；代码修复不撤销历史泄漏。

### 依赖审计：不要把安装路径当独立漏洞

| 范围 | 原锁文件 | 修复后 |
| --- | --- | --- |
| 受影响安装路径 | 275：high 187 / moderate 87 / low 1 | 10：high 8 / moderate 2 |
| 不重复的受影响包 | 15 | 3 |
| 当前 production dependencies 分组 | 修复后单独检查 | 0 条已知审计发现 |

上述数字已在恢复后的环境重新核验。同一 advisory 可沿多条路径重复；生产分组零发现不是“网站绝对安全”。

剩余是开发 / 质量工具链：`vite@5.4.21`（VitePress，告警需迁移到更高主版本）、`extract-zip@2.0.1`（Lighthouse CI，当前没有上游补丁版）、`basic-ftp@5.3.1`（Lighthouse CI，补丁 >=6.2.1，跨越父依赖约束）。单独开兼容升级 / 替换任务；文档 dev server 不暴露公网；CI 不处理未知压缩包或不可信 FTP 列表。本站没有新增 FTP 服务。

Clerk React 的同主版本安全补丁为 5.61.6。原父依赖精确旧版本会产生 resolution 警告，应以锁文件重复安装、回归、构建和实际登录验收判断，不能直接忽略警告。[^https://github.com/advisories/GHSA-w24r-5266-9c3c]

## 4.1 第二轮已落地（仍未推送 / 未上线）

在第一轮应用修复之上，本轮按 Plan 的 E / 授权 S2–S3 和“下一轮列表体积 / 第三方”范围改了代码，**没有合并、发布、改 Notion 权限或重设真实阅读密码**。

| 项目 | 做法 | 边界 |
| --- | --- | --- |
| 匿名数据边界 | 统一 Public DTO：列表、文章外壳、RSS、搜索命中不再带密码摘要、blockMap、正文片段 | 源站 Notion 若仍匿名可读，直接请求 Notion 仍可能拿到正文；这不是本轮能单独关闭的 |
| 文章页 | 受保护文章 SSG 只出外壳；浏览器不再比较哈希、不再把密码写入 localStorage / URL | 纯静态 `EXPORT=true` 无法解锁，接口 fail-closed |
| 解锁 / 正文 API | `POST /api/protected/unlock` 与 `GET /api/protected/content`；HMAC 文章级 HttpOnly 会话；Origin 校验；限速；no-store | 需要部署环境配置 `ARTICLE_AUTH_SECRET`（≥32 字符）。未配置时接口 503，不会退回前端校验。现有 Notion 摘要仍按 SHA-256 / 旧 MD5 在**服务器**核对；scrypt 已支持新存储，真实文章尚未迁移到 KDF |
| Algolia / 搜索 | 用 `protected` 标志跳过，而不是在删掉 `password` 字段后误当成公开 | 旧索引仍需上线后按现有删除逻辑清理 |
| 列表体积 | 全站 `allPages` 先打成公开摘要；404 / 搜索 / 归档不再把完整 allPages 送给浏览器；存在分类保留日历字段 | 长文正文本身仍可能超过 128 kB，那是内容不是列表垃圾数据 |
| 统计脚本 | Busuanzi / GA / Vercel / Ackee / 51LA / Clarity 等到空闲后再挂 | 不把统计当阅读前置；没有宣称国内 LCP 数字 |

本地新增测试已并入 Jest。GitHub 写入仍按既有拦截处理，不换通道重试。

## 5. 当前验收状态

| 验收 | 当前结果 | 解释 |
| --- | --- | --- |
| Jest | 66 组 / 380 个测试通过 | 包括第一轮 API / OAuth / 跳转 / 图片策略，以及第二轮公开 DTO、会话与解锁接口回归 |
| 图片 Worker | 7 个测试通过 | 独立 Node test runner，已纳入 CI；没有部署到线上 |
| Lint / 类型 | 两者退出码 0；构建后恢复原类型配置再检查也为 0 | 仍有既有 warning，不把成功退出写成“没有任何警告” |
| 生产模式构建 | `npm run build` 退出码 0 | 使用真实 build 生命周期；没有用仅开发模式通过代替 |
| 文档构建 | VitePress 构建通过 | 环境提示及部分语言高亮 warning 非致命 |
| 锁文件复现 | frozen install 成功，锁文件字节不变 | Clerk 父依赖精确版本 resolution 警告仍需真实登录预览验收 |
| 本地浏览器 | 36 / 36 项通过 | 1440px 桌面 / 390px 手机、普通公开文章、友情链接、存在分类；API 预期状态、响应头、同源主视觉、无横向溢出、无 runtime error；增加首屏截图非空白检查，并人工重看桌面 / 手机 / 日历 |
| 源码秘密扫描 | Gitleaks v8.30.1：本轮 35 个代码 / 工作流文件，未发现匹配 | 不是全仓库或全历史秘密审计 |
| 图片与客户端边界 | 1160 个客户端 JS chunks 未检出三张资源的 base64 前缀 | 源码 manifest 只用于构建；部署的图片是独立静态文件 |
| 说明一致性 | Worker 与文档内嵌源码一致，`git diff --check` 通过 | 提交范围排除自动生成的 sitemap / redirect、Next 类型文件和本地证据 |

浏览器验收只覆盖列出的 36 项，不等于全部网络请求都成功。请求记录随运行波动，记录窗口还包含关闭测试页时的后台请求中止；不能把这些 abort 一概归为站点或第三方故障。额外单独复查的手机会话在关闭前没有请求失败。实际图片和阅读页面已另查，第三方仍需国内瀑布图验收。截图等到公告关闭、主视觉解码后取样，不能用这些等待时间冒充 LCP 或国内体验指标。

**这些是隔离环境的本地验收，不是 GitHub CI / CodeQL 的运行结果、生产环境验收或国内测速。** 推送 / 草稿 PR、远端检查、预览和生产发布是后续不同关卡。

GitHub MCP 秘密扫描返回仓库未启用 Advanced Security，所以不能称 GitHub 扫描已通过；本轮用免费的本地 Gitleaks 检查 task-owned 代码 / 工作流。不包括全历史、忽略文件或私有文章样本。

## 6. 仍阻断生产发布的事项

1. **文章显示锁不是服务端授权。** 机密正文不应进入匿名 HTML / `__NEXT_DATA__` / Next data JSON、RSS、搜索、摘要或共享缓存；源站若匿名可读，必须同步处理 Notion 权限并配置服务器认证读取。只藏按钮、前端密码比较、仅隐藏列表都不足以保密。详细验证只在私有记录中，不把地址、标题、密码、正文或受影响统计写入公开仓库。
2. **原 Code scanning 告警尚未逐条核销。** 当前连接没有告警读取接口；匿名 REST 需要认证。需受权 Security 访问或导出 SARIF / 告警信息，才能按编号对账。添加 security-extended 工作流不等于旧告警清零。
3. **真实环境和发布待批准。** 评论、登录、所有正文图源、作者脚本和整站 iframe 兼容性需预览核验；不能自动合并。

机密内容最小整改：服务器验证、正文按授权返回、不暴露密码摘要、安全 cookie、尝试频率限制、受保护响应不共享缓存、源站权限达到同一保密目标。是否临时下线、改解锁方式、改 Notion 状态或权限，先由所有者确认。下线还必须验直达路由和旧 ISR/CDN/搜索缓存；Draft 并不可以未经验证就当作安全边界。

## 7. 国内部署路径：先核实条件

Vercel 官方说明没有大陆 CDN / 服务器节点，国内可达性与延迟不受保证，也不推荐简单在现有部署前加反向代理。函数 region 变化不等于静态网页有国内 CDN。[^https://vercel.com/kb/guide/accessing-vercel-hosted-sites-from-mainland-china][^https://vercel.com/docs/regions]

| 条件 | 下一步 | 边界 |
| --- | --- | --- |
| 无有效备案 / 预算较低 | 先本轮应用修复，实测后比较现有部署与香港近源 | 香港仍是跨境；需要构建、监控、回滚；不保证某 CDN 必然更快 |
| 有有效备案且国内体验优先 | 比较合规国内源站 + 国内 CDN，尽量把静态发布与运行时跨境读取解耦 | 国内 CDN 有实名认证 / 备案前提，跨境回源仍可能慢 |
| 先保留 Vercel | 自定义域名、同源关键资源、已有区域 / 缓存能力；不要叠加未经验证的多层代理 | 不承诺改 DNS、加 Cloudflare 就解决问题 |

腾讯云的大陆 / 全球 CDN 接入有备案等要求；境外节点条件不同，不能把香港当大陆节点。[^https://www.tencentcloud.com/document/product/228/32978]

此阶段需确认：真实有效 ICP 备案、托管 / DNS 服务商、域名控制权、月预算、是否允许换部署平台。页脚文案不能证明备案有效。

## 8. 获批后的顺序和验收

1. 先确认机密内容处置和原告警；审阅 PR / CI / CodeQL，准备正常部署回滚点。
2. 先预览部署，不换生产域名。核对缓存 token、OAuth 默认关闭、图片额外主机、评论、登录和自定义脚本。
3. 1440px 桌面、390px 手机、微信内浏览器验：首页、普通文章、分类、搜索、友情链接、公告、暗色模式；受保护正文单独验且不进公开日志。
4. 匿名响应无受保护正文；授权访问正常；旧缓存清除；原 Notion 源权限同样安全。不能只验界面锁。
5. 获明确批准再合并 / 发布；观察 404/5xx、浏览器错误、缓存命中和可达性。
6. 国内覆盖电信 / 联通 / 移动，至少三个地区，多次冷 / 热访问：HTTP 节点验 DNS / TLS / TTFB / 可达性；真实手机验 LCP / CLS / 交互。HTTP 下载时间不是 LCP，单次实验室点击不是真实 INP。
7. 建议初始目标（不是已达成绩）：p75 LCP <=2.5s、INP <=200ms、CLS <=0.1，核心阅读不依赖可选第三方成功。若跨境路径不达标，再据分运营商数据投资基础设施。

兼容点：缓存 API 缺 token 的 503 是预期安全关闭；OAuth 不为了兼容恢复令牌回显；CSP frame-ancestors self 限制别人嵌入整站，不是禁止文章嵌入视频；NEXT_PUBLIC 开关修改后需重新构建；裁剪运行目录时须保留构建材料 / 脚本或复制已生成 public 静态资源；Worker 修改未经单独部署不会生效。

## 9. 回滚

- 主回滚：发布前的正常部署或基线 SHA，不 force push 覆盖生产历史。
- 仅图片兼容问题：`NEXT_PUBLIC_LOCAL_SITE_ASSETS=false` 后重建；额外图源仅增补可信 exact HTTPS host。
- 性能与安全分别定位，不能一键回退为开放缓存管理、令牌回显或任意图片代理。
- 授权整改后回滚也必须保持机密正文不向匿名访问开放；必要时维持下线 / 私有源，而不是只考虑页面恢复。

参考：[Vercel 国内访问](https://vercel.com/kb/guide/accessing-vercel-hosted-sites-from-mainland-china)、[地区](https://vercel.com/docs/regions)、[函数区域](https://vercel.com/docs/functions/configuring-functions/region)、[腾讯云接入要求](https://www.tencentcloud.com/document/product/228/32978)、[Clerk](https://github.com/advisories/GHSA-w24r-5266-9c3c)、[Vite 剩余告警](https://github.com/advisories/GHSA-fx2h-pf6j-xcff)、[extract-zip](https://github.com/advisories/GHSA-7pqw-9j4j-h8q3)、[basic-ftp](https://github.com/advisories/GHSA-c475-qrg2-pj4r)。
