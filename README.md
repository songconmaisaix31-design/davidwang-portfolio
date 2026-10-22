# David Wang · Personal Portfolio

个人作品站，以轻盈透明玻璃、大留白、系统字体和滚动过渡，展示真实项目、获奖经历与个人主张。

## Agent 可读入口（2026-10-23）

保留现有界面、CSS、动画、筛选和弹窗行为。项目卡片、荣誉、个人主张和关于介绍现在直接存在于初始 HTML；静态输出与浏览器交互共用 `dist/render-content.js` 中的原有渲染模板。

| 路径 | 内容 |
| --- | --- |
| `/llms.txt` | Agent 资料索引，指向完整资料与各项目 |
| `/index.md`、`/llms-full.txt` | 完整文字资料，包括弹窗里的项目详情、限制、技术用途与来源 |
| `/profile.md` | 个人简介、GitHub、荣誉、主张与经历记录 |
| `/technologies.md` | 全部技术与 AI 工具及具体用途、项目证据和素材署名 |
| `/projects/<id>.md` | 单个项目的贡献、状态、实现范围、源码、演示与截图出处 |
| `/data/portfolio.json` | 完整结构化资料；`schemaVersion` 表示接口版本，`updatedAt` 沿用原内容日期，`assetBaseUrl` 用于解析资产相对路径 |
| `/sitemap.xml`、`/robots.txt` | 发现入口，受站点实际访问权限约束 |

HTML head 包含 Markdown / JSON alternate 链接、llms.txt describedby 链接，以及 Schema.org ProfilePage、Person、SoftwareSourceCode / CreativeWork 的 JSON-LD。资料保留团队贡献、研究原型、Mock、示例数据和截图版本说明，不把品牌素材、推送日期或工具使用记录解释为成果认证。

日常继续维护 `dist/content.js` 和 `dist/tech-data.js`，随后执行 `npm run build` 再发布。该命令无需第三方依赖，会重新生成上述文件、初始 HTML 和 JSON-LD；不要手动修改生成文件或 `generated:*` 标记内的内容。`scripts/build-agent-content.mjs` 中的 origin 对应当前正式域名 davidwang.space，迁移域名时需同步更新。原生应用继续由静态 `dist` 目录部署。

这些入口与 davidwang.space 一同公开。Vercel 构建会从页面数据自动重新生成资料；HTML head 和 HTTP Link 响应头都提供发现入口。原个人资料的日期仍为 2026-10-19，本次只改变读取方式，未重新核查所有项目进度。

格式参考：[llms.txt 提案](https://llmstxt.org/)、[Schema.org ProfilePage](https://schema.org/ProfilePage)、[SoftwareSourceCode](https://schema.org/SoftwareSourceCode)。

## Hello 手写引导与 Logo 行星带（2026-10-19）

开场借鉴 Apple 设置欢迎屏的书写节奏，以原创 SVG 笔画缓慢写出黑色小写 `hello`，约 5.5 秒完成书写，随后淡出进入首页。每个标签页首次进入首页时播放；“进入主页”、Escape 和首页“重播引导”可控制流程。系统减少动态效果时直接进入页面，带锚点的深层链接也直接进入目标。没有字体下载或专有字体依赖。

导航、首页标题、页脚的 David Wang 全部使用同一套加粗原创手写 SVG，并在出现时按真实笔画顺序书写，约 6 秒写完，支持暂停与减少动态效果。首页姓名位于画面正中心，已删除姓名上下的介绍文案与主按钮，工具和动效控制位于底部，保留可访问的姓名文本。原稿在 `dist/assets/david-wang-signature.svg` 与 `dist/assets/hello-handwriting.svg`。

已移除首页莫比乌斯玻璃带及其渲染分支。29 个纯 Logo 沿三层相邻椭圆轨道缓慢运动，随前后深度轻微缩放、转动；没有轨道实体、白色外框、底牌或常驻名称。鼠标悬停及键盘聚焦时停住，便于点击。完整 35 项通过“技术与 AI 工具”入口浏览，手机展示 21 个标识。引导显示时暂停 Logo，关闭后再开始 Logo 入场。

保留 OpenCode、DeepSeek Harness 官方黑鲸、Qoder 和腾讯 WorkBuddy。“Workbody”按此前编程 Agent 上下文解释为腾讯 WorkBuddy。DeepSeek Harness 与普通 DeepSeek 分别保留。Cursor、OpenAI、MCP、LangGraph、NVIDIA 使用从官方素材提取的独立符号；来源和处理记录见 `hero-symbol-provenance.json`。

- `dist/welcome.js`、`dist/welcome.css`、`dist/signature.js`：黑色 Hello、逐笔姓名书写、引导生命周期、统一加粗字样。
- `dist/hero-orbit.js`：行星带投影、时间、暂停与引导衔接。
- `dist/tech.js`、`dist/tech.css`：纯符号运动、移动适配、文字避让和详情样式。
- `dist/tech-data.js`：完整清单、官方来源与仓库证据。
- `tech-assets-provenance.json`、`hero-symbol-provenance.json`：官方素材出处和 SHA256。

新增 Linux Tux、MiniMax 吉祥物、Kimi、GLM / Z.ai、Grok Bot、Muse、Seedance；Go、GitHub、Claude Code 分别使用官方 Gopher、Octocat、Clawd 形象，Codex 使用经典云形 >_ Logo（LobeHub 社区维护 SVG，已记录来源和 MIT 许可），OpenAI 独立保留。所有首页素材均为无底框符号，新增素材来源、作者署名和处理记录见 `mascot-assets-provenance.json`。Seedance 当前使用官方发行方 ByteDance 的符号，详情已明确说明。

Logo 动效支持暂停、重播引导后重新入场、减少动态效果、离屏与页面隐藏暂停。首页不依赖 WebGL。深色页面对黑色单色标识调整明暗，保持辨识度。

## 内容与行为

- `dist/content.js`：7 个项目、4 项获奖/认证、个人介绍、主张、图片来源及官方品牌来源。
- `dist/index.html`：手写姓名、Hello 引导、Logo 行星带、作品、荣誉、个人主张、关于与联系。
- `dist/styles.css`：响应式排版、浅/深玻璃主题、滚动显现、减少动态/透明效果与打印样式。
- `dist/app.js`：项目筛选、原生详情弹窗、移动导航、主题保存、复制链接、GitHub 同步和 IntersectionObserver 动画。
- `dist/hero.css`、`dist/principles.css`：居中首屏与主张排版、玻璃画幅、移动适配与静态后备层。
- `dist/glass-sculpture.js`：个人主张区无依赖原生 WebGL 空间无限符号、固定环境反射、透明折射、指针响应、暂停与离屏节能。
- `dist/assets/`：真实前端截图、官方 Logo、玻璃图形静态后备渲染与初版参考素材。

公开 GitHub 同步包含 6 个仓库的最近推送时间。项目集合签名控制 15 分钟本机缓存。后台同步不重建卡片，避免打断阅读、键盘焦点和滚动动效。仓库更新日期不被解释成功能完成状态。

## 个人主张的无限玻璃图形

个人主张保留同一中轴上的标题、大幅横向无限图形和五个关键词；关键词及原说明全部展开，宽屏五列，平板 3+2，手机 2+2+1。关于我保留此前确认的个人介绍。

无限符号使用原生 WebGL 着色器、椭圆截面与真实前后深度。根据表面法线计算镜面反射、Fresnel 边缘和低强度色散；深度预写保持交叉处顺序。渲染节流至 30 fps、像素比上限 1.6，独立响应手动暂停、系统减少动态效果、离屏和页面隐藏。WebGL 不可用时显示浅/深主题的透明 PNG 后备图。

## 作品与图片来源

| 项目 | 代码来源 | 展示素材 |
| --- | --- | --- |
| CrewTrace | CrewTrace / main · dcb9ae7 | 仓库归档的 2026.10.19 首页与任务截图（画面基线 3ef15dd）；最新源码已迭代为任务、交流、公告三面板。现有公开部署仍为较早版本 |
| OpenDashboard · 氢哨 | OpenDashboard-H2 / main | 2026-10-19 从 204421.xyz/h2-sentinel/?mode=fixture 拍摄的实际前端，使用示例数据 |
| RealTag · 真实标签 | tongpin-real-tags / main | 仓库内实际运行 QA 首页截图 |
| Astrocyte | frontend-observatory-20261018 · 32672499 | 原 React 前端与 Go 后端运行实拍：资料沉淀、添加资料；独立空数据库实例 |
| Morphogenesis | codex/morphogenesis-mainline · ddd2849 | 原主线观测台运行实拍：研究任务池与科研工作台；仓库自带 seed 示例数据 |
| Finance Agent Lab | main | 文字与代码入口；现有仓库以流水线和接口为主，无网页前端图片 |
| 投研分析 · 多系统协同 | 用户获奖记录 | 真实科大讯飞 Logo 与一等奖信息 |

项目详情提供源码、文档、图片原始出处、可访问的演示入口、真实实现范围与贡献。截图、示例数据与品牌标识的性质按实际来源标注。CrewTrace、Astrocyte 和 Morphogenesis 的详情各有两张运行截图；主页卡片使用对应主图。`project-visuals-provenance.json` 保存各项目的图片来源、新截图的精确提交、尺寸、SHA256 与数据范围；`brand-assets-provenance.json` 保存品牌素材原始来源和校验信息。

2026-10-19 CrewTrace 再次同步：仓库已从 `co-vibe` 更名为 `CrewTrace`，前端已合入 `main@dcb9ae78b0836a6e067d1f2abaa919f8e243d23b`。已同步源码入口、三面板说明、React / TypeScript / Three.js 技术和更新日期。两张替换图片直接来自该提交的 `design-audit/evidence`，未修改图像；审查 README 明确其实际画面基线为 `3ef15dd00b9451a42e2a5b34ef7d6d24a0877f76`，不能作为最新三面板界面的截图。页面已标注这一差异。Browser 核对 `mon.davidwang.space` 仍展示较早前端；本轮未部署 CrewTrace 应用，受管预览故障仍限制最新源码截图和作品站整页 QA。

## 获奖与认证

依据用户 2026-10-19 的直接补充：

- 2026 科大讯飞 AI 开发者大会一等奖：投研分析领域多系统协同。
- NVIDIA 初级工程师：推理、部署、RAG 与 Agent 相关方向。页面不将此前报考代码推断为本次已获证书的具体型号。
- RealTag：腾讯 LinkGen 主办的纯爱战神黑客松全场第二名。
- OpenDashboard：浦发中关村新能源黑客松全场前十，对应氢哨独立比赛项目。

未推测新增两项奖项的日期，未添加未提供的学校、雇主、联系方式或量化指标。

## 设计参考

- https://developer.apple.com/design/human-interface-guidelines/typography
- https://developer.apple.com/design/human-interface-guidelines/motion
- https://reactbits.dev/components/glass-surface
- https://in.pinterest.com/paint4722/glassmorphism/

使用浏览器系统字体，不嵌入 Apple 专有字体。设计参考用于排版节奏、透明材质和目的明确的过渡，代码独立实现。每个主要板块、项目卡、奖项与主张都有入场动效；系统减少动态效果或不支持观察器时，内容保持可见。

## 验证与发布

无打包静态网站，部署目录 `dist`。GitHub 仓库保存网站源码，Vercel Git 集成负责预览与正式部署；`npm run build` 生成 Agent 资料和初始 HTML，并检查入口与本地资源引用。

执行 JavaScript 语法、HTML/资源引用、SVG 可解析性、项目和奖项关系检查，并进行代码复审。保留移动菜单跨断点、Escape 焦点恢复与滚动显现处理。

作品站受管预览环境此前报 `bwrap: Can't mount proc on /newroot/proc: Operation not permitted`，整体浏览器视觉与交互 QA 仍未完成。

2026-10-19 补充核对三个仓库的前端分支，运行精确提交的原始应用并取得六张未经编辑的 Browser 截图，已逐张目视检查。CrewTrace 和 Astrocyte 的前端构建通过，Astrocyte 的 Go 后端构建与运行通过，Morphogenesis 的原 FastAPI 服务正常读取隔离的仓库示例数据。截图完成后关闭自有运行服务。未将这些项目的截图验证解释为个人作品站整页浏览器 QA。

本次作品站更新通过 JavaScript 语法、内容结构、全部本地图片引用与解码检查，并只读复核了新增详情图片渲染逻辑和源码来源。

本次莫比乌斯与无限图形使用实际生产着色器、网格和统一参数，在 EGL 1.5 / OpenGL ES 3.2 原生离屏环境完成编译、链接、深度预写、透明混合及图像检查。检查涵盖首屏、无限符号、不同时间形态及浅/深背景；根据渲染结果增强局部反射，保持主体透明。静态后备采用 2 倍尺寸渲染、透明颜色反预乘和缩小，以减轻边缘锯齿。

上述验证覆盖图形渲染，未代替整页浏览器交互验收。已知受管预览基础设施故障未修复，本轮未重试或替换基础设施。源码检查覆盖渲染器初始化、暂停状态、主题切换、后备显示、居中布局断点及本地资源引用。

本次黑色 Hello 与加粗姓名经过原生 SVG 渲染和目视检查；慢速书写、引导完成后启动姓名、导航/首页/页脚显现、重播、暂停、后台暂停与减少动态效果通过行为检查，行星带在 320/390/768/1440 像素宽度的投影边界通过检查。新增 Logo 与吉祥物已逐项核对官方来源、透明性及引用。受管浏览器此前的 bwrap/proc 挂载故障仍是整页浏览器验收的限制，未将独立 SVG 渲染或代码检查解释为整页浏览器验收。

## 部署（GitHub + Vercel）

仓库与线上环境的对应关系：

- GitHub：`songconmaisaix31-design/davidwang-portfolio`
- Vercel 项目：`davidwang-portfolio`（团队 `dwwww`），部署目录 `dist`
- 线上主域名：<https://davidwang.space>，`www.davidwang.space` 308 跳转到主域名

`vercel.json` 指定 `outputDirectory: dist`，Vercel 执行 `npm run build` 生成并校验静态产物。GitHub 账号 `songconmaisaix31-design` 已连接 Vercel，Vercel GitHub App 的仓库授权范围为 `davidwang-portfolio`。

- 推送功能分支或提交 Pull Request，Vercel 自动创建预览部署。
- 合入 `main` 后，Vercel 自动部署到 <https://davidwang.space>。
- 本地运行 `npm run build` 校验资源，运行 `npm run dev` 启动预览。
- `.vercel/` 与 `.env*` 由 Git 忽略。

精简的 GitHub Profile 位于 <https://github.com/songconmaisaix31-design>，简介、网站字段和 Profile README 均提供个人网站入口。网站的关于与联系区域链接回 GitHub；页面中的「同步 GitHub」读取公开项目的最新推送时间。

域名 DNS 托管在阿里云（HiChina），不使用 Vercel 托管 DNS，因此阿里云 DNS 里维护三条记录（TTL 600）：

| 主机记录 | 类型 | 值 |
| --- | --- | --- |
| `@` | A | `216.198.79.1` |
| `@` | A | `64.29.17.1` |
| `www` | CNAME | `e30f432c4e2eec4b.vercel-dns-017.com` |

顶级域的两条 A 记录与 `www` 的 CNAME 值由 Vercel 按项目生成，重新添加域名时以 `vercel domains verify davidwang.space` 的输出为准。主域名是 `davidwang.space`，`www` 由 `vercel.json` 的 `redirects` 以 308 跳回主域名（保留路径与查询串）。

`*.davidwang.space` 下的其它子域（`mon`、`mcp`、`family`、`realtags`、`tags`、`app`）各自指向独立 Vercel 项目，不受主域名记录影响。

页面加载时会匿名请求 GitHub API 读取 6 个仓库的最近推送时间；共享出口 IP 容易触发 403 限流，此时页面显示「暂时无法连接 GitHub，作品资料仍可查看」，卡片内容不受影响。如需稳定显示，可加一层带 token 的 Vercel Function 代理。

