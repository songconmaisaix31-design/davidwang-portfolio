# David Wang

> 把好奇心，做成能运行的东西。

我围绕 Agent、上下文与协作构建工具，在真实问题里试验想法，也让每次探索留下可以继续使用的代码、经验和作品。

沿着真实问题走进 AI 开发。我的起点是业务中的数据工具，后来把更多时间投入 Agent、协作系统和开源项目。黑客松让我把想法快速做出来，也遇见不同背景的人，听他们分享自己正在解决的问题。

我希望长期构建一套可拆解、可组合的 Agent 工具平台，让注意力进入工作空间，再通过协作变成实际成果。每个项目都是一次探索，也应该为下一次留下可以复用的东西。

## 联系与身份

- [个人网站](https://davidwang.space/)
- [GitHub](https://github.com/songconmaisaix31-design)

## 获奖与认证

### 一等奖

科大讯飞 · 2026 科大讯飞 AI 开发者大会

投研分析领域 · 多系统协同

记录时间：2026.10

[投研分析 · 多系统协同](https://davidwang.space/projects/research.md)

### NVIDIA 初级工程师认证

NVIDIA · 推理 · 部署 · RAG · Agent

NVIDIA 初级工程师，学习与实践方向包括模型推理、部署，以及 RAG 与 Agent 应用。

记录时间：2026.10

学习与实践方向：推理、部署、RAG、Agent

### 全场第二名

腾讯 LinkGen · 纯爱战神黑客松

RealTag · 同频真实标签

腾讯 LinkGen 主办

[RealTag · 真实标签](https://davidwang.space/projects/realtag.md)

### 全场前十

浦发 · 浦发中关村新能源黑客松

OpenDashboard · 氢哨

[OpenDashboard · 氢哨](https://davidwang.space/projects/opendashboard.md)

## 个人主张

### 复利 · Compounding

把项目留下的代码、经验和上下文整理好，让下一次从更高的起点开始。

### 好奇心 · Curiosity

遇到不懂的东西，先追问它为什么有效，再动手试一试。

### 行动力 · Action

给想法一个可以运行的形状，让实际反馈推动下一步。

### 生命力 · Vitality

为探索保留热情，也给运动、交流和生活里的意外发现留出位置。

### 自律 · Discipline

把重要的事放进日常，在没有截止日期的时候，也持续往前走。

## 经历记录

- 2026 · 从业务问题开始：在真实经营数据中开发处理与监控工具，开始把重复工作整理成可复用流程。

- 2026.09 · 探索 Agent 群体协作：推进 Morphogenesis，把任务分工、局部选路与失败接续带进可运行原型。

- 2026.10 · 把注意力连接到行动：持续开发 Astrocyte，围绕注意力、上下文与 Agent 接入推进工具平台。

- 2026.10.17 · 在 Monad 黑客松开发 CrewTrace：和伙伴探索 Agent 任务对接、协作记录与链上信誉，完成协作原型。

- 2026.10 · 投研协同作品获一等奖：获得 2026 科大讯飞 AI 开发者大会一等奖，作品方向为投研分析领域多系统协同。

- 2026.10 · 获得 NVIDIA 初级工程师认证：取得生成式 AI 与大语言模型方向认证，继续学习推理、部署、RAG 与 Agent。

## 资料说明

内容快照日期：2026-10-19。这些资料来自本站维护的介绍，未在生成机器可读版本时重新核查仓库进展。

项目状态、实现范围、团队贡献、Mock / 示例数据及图片版本说明均保留原文。仓库推送日期不代表功能完成日期。

获奖与认证按本站个人记录呈现；品牌素材链接仅说明图像来源。技术与工具清单描述具体使用情况，不表示熟练程度或官方背书。

Markdown、JSON 和网页使用相同的站点访问权限。读取这些静态文件不需要执行 JavaScript。

## 项目

### CrewTrace

> 围绕 Agent 任务对接与协作记录构建网络，并探索链上信誉与激励。

让协作留下可追踪的记录

- ID：crewtrace
- 分类：agent
- 状态：黑客松原型
- 技术与方向：React、TypeScript、Three.js、MCP、Agent 网络

#### 起点

Agent 开始彼此协作时，怎样知道对方做过什么？

#### 项目与贡献

- 新版前端以动态圆环与折射文字开场，任务、交流、公告分为三个同级面板，支持中英切换与双向手势导航。
- 任务浏览、交流全文和公告通过居中弹窗展开，支持悬停预览与任务内交流。
- 支持需求发布、任务认领、分工、交流与交接，让协作有清晰的入口。
- HTTP 与 MCP 共享状态，连接网页工作台与 Agent 工具调用。
- 继续探索信誉与链上激励；当前 MON 悬赏用于模拟体验。

#### 实现范围与限制

协作流程已有可运行原型，链上信誉与激励机制仍在探索。截图为仓库留存的 2026.10.19 设计迭代记录；最新主分支已采用任务、交流、公告三个面板，线上演示仍为较早版本。

#### 链接与来源

- [本站项目资料](https://davidwang.space/projects/crewtrace.md)
- [代码仓库](https://github.com/songconmaisaix31-design/CrewTrace)
- [项目文档](https://github.com/songconmaisaix31-design/CrewTrace/blob/main/docs/three-workspace-panels.md)
- [查看线上版本](https://mon.davidwang.space)
- [CrewTrace 完整网站 · 实时动效与交互](https://mon.davidwang.space/)（个人主页内嵌原站；内容随原站更新）
- 记录分支：main
- 资料对应提交：dcb9ae78b0836a6e067d1f2abaa919f8e243d23b
- 已记录的仓库推送时间：2026-10-19T09:06:19Z
- 内容快照日期：2026-10-19

#### 图片与出处

- [首页设计迭代 · 仓库截图 · 2026.10.19](https://davidwang.space/assets/crewtrace-hero-3ef15dd.png)
  - 画面：CrewTrace 仓库归档的首页迭代截图，展示紫色编织圆环、流动文字与加入入口
  - [原始出处](https://github.com/songconmaisaix31-design/CrewTrace/blob/dcb9ae78b0836a6e067d1f2abaa919f8e243d23b/design-audit/evidence/home-desktop.png)
- [任务面板设计迭代 · 仓库截图 · 2026.10.19](https://davidwang.space/assets/crewtrace-tasks-3ef15dd.png)
  - 画面：CrewTrace 仓库归档的协作任务迭代截图，展示公开任务、状态筛选与模拟悬赏
  - [原始出处](https://github.com/songconmaisaix31-design/CrewTrace/blob/dcb9ae78b0836a6e067d1f2abaa919f8e243d23b/design-audit/evidence/tasks-desktop.png)

### OpenDashboard · 氢哨

> 把弱电网绿氢系统的异常转化为可追溯的证据、诊断与运检建议。

绿氢系统异常诊断与运检助手

- ID：opendashboard
- 分类：industry
- 状态：黑客松全场前十
- 技术与方向：React、TypeScript、FastAPI、ECharts

#### 起点

如何让复杂能源系统里的异常，更容易被人理解与复核？

#### 项目与贡献

- 基于 OpenDashboard 插件架构，组合氢能领域契约、EMS 插件、分析侧车和六个中文业务页面。
- 将事件总览、异常诊断、数据分析、运行助手与报告导出串联为可追溯的运检流程。
- 我选定初赛方向并完成大部分初赛实现，继续推进全量数据导入与部分平台整合；朋友负责复赛算法推进与现场问题处理。
- 获得浦发中关村新能源黑客松全场前十。

#### 实现范围与限制

比赛版本独立保存在 OpenDashboard-H2。截图来自固定样例演示，运检建议由人工复核。

#### 获奖

浦发 · 全场前十 · 浦发中关村新能源黑客松

#### 链接与来源

- [本站项目资料](https://davidwang.space/projects/opendashboard.md)
- [代码仓库](https://github.com/songconmaisaix31-design/OpenDashboard-H2)
- [项目文档](https://github.com/songconmaisaix31-design/OpenDashboard-H2/blob/main/README.md)
- [项目演示](https://204421.xyz/h2-sentinel/?mode=fixture)
- [底座仓库](https://github.com/songconmaisaix31-design/OpenDashboard)
- 记录分支：main
- 已记录的仓库推送时间：2026-09-29T05:55:03Z
- 内容快照日期：2026-10-19

#### 图片与出处

- [前端实拍 · 示例数据 · 2026.10.19](https://davidwang.space/assets/opendashboard-h2-fixture-20261019.jpg)
  - 画面：OpenDashboard 氢哨前端真实演示界面截图
  - [原始出处](https://204421.xyz/h2-sentinel/?mode=fixture)

### RealTag

> 从行为标签出发，在匿名互动中找到同频的人，再逐步解锁彼此的身份。

同频 · 真实标签

- ID：realtag
- 分类：industry
- 状态：黑客松全场第二
- 技术与方向：Flask、Jinja2、SQLite

#### 起点

如何让人与人的连接，先从真实行为与共同兴趣开始？

#### 项目与贡献

- 将行为信号整理为包含来源、可见性与验证状态的标签，以服务端偏好筛选和匿名匹配连接用户。
- 实现双向会话、L0–L4 渐进身份解锁、兴趣饭局与管理后台；第三方数据连接使用确定性 Mock。
- 四人团队共同构思产品。我带入真实标签与个人数据接口方向，承担主体前端、后端、整合、部署、演示视频和部分路演。
- 获得腾讯 LinkGen 主办的纯爱战神黑客松全场第二名。

#### 实现范围与限制

黑客松原型。第三方数据连接使用 Mock，演示匿名匹配与渐进身份解锁流程。

#### 获奖

腾讯 LinkGen · 全场第二名 · 纯爱战神黑客松

#### 链接与来源

- [本站项目资料](https://davidwang.space/projects/realtag.md)
- [代码仓库](https://github.com/songconmaisaix31-design/tongpin-real-tags)
- [项目文档](https://github.com/songconmaisaix31-design/tongpin-real-tags/blob/main/README.md)
- [项目演示](https://realtags.davidwang.space)
- 记录分支：main
- 已记录的仓库推送时间：2026-09-29T06:12:45Z
- 内容快照日期：2026-10-19

#### 图片与出处

- [仓库中的实际运行截图](https://davidwang.space/assets/realtag-desktop.png)
  - 画面：RealTag 仓库真实前端首页截图
  - [原始出处](https://raw.githubusercontent.com/songconmaisaix31-design/tongpin-real-tags/main/docs/qa/hackathon/integration/screenshots/home-desktop-1100x900.png)

### Astrocyte

> 连接注意力、上下文与 Agent 协作的工具平台，也是我当前的长期主线。

注意力、上下文与 Agent 协作

- ID：astrocyte
- 分类：agent
- 状态：持续研发
- 技术与方向：Go、React、TypeScript、SQLite、MCP

#### 起点

人与 Agent，怎样知道此刻该关注什么？

#### 项目与贡献

- 以 Event / Signal 组织线索，通过 explain_focus 回溯当前关注点的依据。
- React 工作台包含资料沉淀、共同工作区与协作网络，连接资料来源、研究线索和项目上下文。
- 围绕 Agent 接入与动态 DAG 继续开发，让不同工具和协作协议能够组合使用。

#### 实现范围与限制

前端已连接 Go 服务与本地数据。截图展示本地实例的初始界面；Agent 平台与动态拓扑能力持续研发。

#### 链接与来源

- [本站项目资料](https://davidwang.space/projects/astrocyte.md)
- [代码仓库](https://github.com/songconmaisaix31-design/Astrocyte)
- [项目文档](https://github.com/songconmaisaix31-design/Astrocyte/blob/songconmaisaix31-design/frontend-observatory-20261018/README.md)
- 记录分支：songconmaisaix31-design/frontend-observatory-20261018
- 资料对应提交：3267249922082cb1808b6529a2f04084d40c1f92
- 已记录的仓库推送时间：2026-10-19T03:59:17Z
- 内容快照日期：2026-10-19

#### 图片与出处

- [资料沉淀 · 前端实拍](https://davidwang.space/assets/astrocyte-attention-32672499.jpg)
  - 画面：Astrocyte 资料沉淀前端实拍，包含工作空间导航、资料导入与筛选界面
  - [原始出处](https://github.com/songconmaisaix31-design/Astrocyte/tree/3267249922082cb1808b6529a2f04084d40c1f92/web)
- [添加资料 · 前端实拍](https://davidwang.space/assets/astrocyte-import-32672499.jpg)
  - 画面：Astrocyte 添加资料界面实拍，展示论文来源、标题与收藏理由输入项
  - [原始出处](https://github.com/songconmaisaix31-design/Astrocyte/tree/3267249922082cb1808b6529a2f04084d40c1f92/web)

### Morphogenesis

> 探索多 Agent 如何围绕长任务协作，并在失败、中断和交接之后继续推进。

一群 Agent，把任务继续做下去

- ID：morphogenesis
- 分类：agent
- 状态：研究原型
- 技术与方向：Agent Swarm、局部选路、失败接续、观测与回放

#### 起点

当一条路线走不通，协作怎样继续？

#### 项目与贡献

- 在同机多进程环境中，让 Worker 共享账本并进行局部选路。
- 围绕任务状态、失败接续与上下文交接积累可运行的工程实现。
- 研究工作台呈现任务池、研究分支、事件与回放，让协作过程可以被观察与复核。

#### 实现范围与限制

研究原型运行于同机多进程环境，持续验证协作机制与任务接续。截图使用仓库自带的研究任务示例数据。

#### 链接与来源

- [本站项目资料](https://davidwang.space/projects/morphogenesis.md)
- [代码仓库](https://github.com/songconmaisaix31-design/Morphogenesis)
- [项目文档](https://github.com/songconmaisaix31-design/Morphogenesis/blob/codex/morphogenesis-mainline/README.md)
- 记录分支：codex/morphogenesis-mainline
- 资料对应提交：ddd2849afe330bf221d405dc2b91948c2416bd47
- 已记录的仓库推送时间：2026-10-12T15:03:15Z
- 内容快照日期：2026-10-19

#### 图片与出处

- [研究任务池 · 实拍 · 示例数据](https://davidwang.space/assets/morphogenesis-signals-20261019.jpg)
  - 画面：Morphogenesis 主线前端任务池实拍，展示仓库示例中的研究候选任务与分支
  - [原始出处](https://github.com/songconmaisaix31-design/Morphogenesis/tree/ddd2849afe330bf221d405dc2b91948c2416bd47/src/env-observatory)
- [科研工作台 · 实拍 · 示例数据](https://davidwang.space/assets/morphogenesis-workspace-20261019.jpg)
  - 画面：Morphogenesis 科研工作台实拍，展示仓库示例中的研究目标、分支和事件记录
  - [原始出处](https://github.com/songconmaisaix31-design/Morphogenesis/tree/ddd2849afe330bf221d405dc2b91948c2416bd47/src/env-observatory)

### Finance Agent Lab

> 面向多城市规则差异的配置化财务流水线，从实际业务的数据处理问题出发。

配置化财务流水线

- ID：finance
- 分类：industry
- 状态：工程实践
- 技术与方向：Python、n8n、数据流水线、规则配置

#### 起点

业务规则不同，怎样让同一套流程继续复用？

#### 项目与贡献

- 以固安为参考城市，组织可配置的数据处理步骤与财务规则。
- 结合 Python 与 n8n 工作流，把重复处理衔接为可执行流程。
- 通过自动化测试和批量运行记录检查流程稳定性、执行时间与资源消耗。

#### 实现范围与限制

固安为参考城市；多城市适配按各地规则与审批进度推进。

#### 链接与来源

- [本站项目资料](https://davidwang.space/projects/finance.md)
- [代码仓库](https://github.com/songconmaisaix31-design/finance-agent-lab)
- [项目文档](https://github.com/songconmaisaix31-design/finance-agent-lab/blob/main/README.md)
- 记录分支：main
- 已记录的仓库推送时间：2026-09-29T05:22:29Z
- 内容快照日期：2026-10-19

### 投研分析 · 多系统协同

> 围绕投研分析任务，探索多个系统之间的协同。

行业场景中的 AI 协作

- ID：research
- 分类：industry
- 状态：一等奖作品
- 技术与方向：投研分析、多系统协同、科大讯飞

#### 起点

多个系统，如何一起完成投研分析任务？

#### 项目与贡献

- 作品方向聚焦投研分析领域的多系统协同。
- 获得 2026 科大讯飞 AI 开发者大会一等奖。

#### 实现范围与限制

投研分析方向的获奖作品。

#### 获奖

科大讯飞 · 一等奖 · 2026 科大讯飞 AI 开发者大会

#### 链接与来源

- [本站项目资料](https://davidwang.space/projects/research.md)
- 内容快照日期：2026-10-19

## 技术与 AI 工具

> 本站展示的工具及其具体使用情况。保留项目证据、官方来源和素材署名。

### TypeScript

前端与应用开发

Astrocyte、CrewTrace 和氢哨的前端使用 TypeScript；类型检查参与构建与验证。

- ID：typescript
- 分组：code

- [项目使用证据](https://github.com/songconmaisaix31-design/Astrocyte/blob/57a91f4601b4292df4f55ba6cac541bad5caab3f/web/package.json)

- [官方来源](https://www.typescriptlang.org/branding/)

### Python

Agent 与数据处理

Morphogenesis 使用 Python 实现蜂群运行与研究任务；RealTag 的服务端也使用 Python。

- ID：python
- 分组：code

- [项目使用证据](https://github.com/songconmaisaix31-design/Morphogenesis/blob/codex/morphogenesis-mainline/pyproject.toml)

- [官方来源](https://www.python.org/community/logos/)

### Go

服务与 Agent 接入

Astrocyte 使用 Go 实现服务端、MCP 接入及 SQLite 持久化。

- ID：go
- 分组：code

- [项目使用证据](https://github.com/songconmaisaix31-design/Astrocyte/blob/57a91f4601b4292df4f55ba6cac541bad5caab3f/go.mod)

- [官方来源](https://go.dev/wiki/Gopher)

Gopher 形象由 Renee French 创作，采用 CC BY 4.0 许可。

### React

交互式前端

Astrocyte、CrewTrace 与氢哨使用 React 构建交互界面。

- ID：react
- 分组：code

- [项目使用证据](https://github.com/songconmaisaix31-design/Astrocyte/blob/57a91f4601b4292df4f55ba6cac541bad5caab3f/web/package.json)

- [官方来源](https://react.dev/)

### Vite

前端开发与构建

Astrocyte、CrewTrace 和氢哨使用 Vite 进行本地开发与前端构建。

- ID：vite
- 分组：code

- [项目使用证据](https://github.com/songconmaisaix31-design/OpenDashboard-H2/blob/main/package.json)

- [官方来源](https://vite.dev/)

### Docker

容器与执行环境

Morphogenesis 的项目依赖包含 Docker SDK，用于容器与沙箱相关工作。

- ID：docker
- 分组：engineering

- [项目使用证据](https://github.com/songconmaisaix31-design/Morphogenesis/blob/codex/morphogenesis-mainline/pyproject.toml)

- [官方来源](https://www.docker.com/company/newsroom/media-resources/)

### Cursor

AI 编程工具

在日常开发中使用 Cursor 阅读项目、编写代码和推进功能。

- ID：cursor
- 分组：ai

- [官方来源](https://cursor.com/brand)

### Codex

OpenAI · 编程与思考

使用 Codex 编写与检查代码，推进项目实现。首页采用经典云形终端 Logo。

- ID：codex
- 分组：ai

- [官方来源](https://openai.com/codex/)

经典 Logo 的 SVG 由 LobeHub Icons 社区维护。

### Claude Code

Anthropic · AI 协作

使用 Claude Code 与 Claude 协助代码开发、项目分析和文档工作。首页展示官方 Clawd 小螃蟹。

- ID：claude
- 分组：ai

- [官方来源](https://claude.ai/code)

### DeepSeek

模型与日常推敲

在日常学习、方案推敲和 AI 应用探索中使用 DeepSeek。

- ID：deepseek
- 分组：ai

- [官方来源](https://www.deepseek.com/)

### Qwen

阿里巴巴 · 通义千问

使用通义千问参与日常学习、代码与方案分析。

- ID：qwen
- 分组：ai

- [官方来源](https://qwen.ai/)

### Solidity

链上协作合约

CrewTrace 使用 Solidity 编写 AgentLedger 与 CollaborationLedger 合约。

- ID：solidity
- 分组：code

- [项目使用证据](https://github.com/songconmaisaix31-design/co-vibe/blob/a6bb49857b87cac9fd380c7ff44c895a0e67d741/contracts/src/AgentLedger.sol)

- [官方来源](https://docs.soliditylang.org/)

### LangGraph

Agent 任务编排

Morphogenesis 的 Python 依赖包括 LangGraph 与 SQLite checkpoint 组件。

- ID：langgraph
- 分组：engineering

- [项目使用证据](https://github.com/songconmaisaix31-design/Morphogenesis/blob/codex/morphogenesis-mainline/pyproject.toml)

- [官方来源](https://www.langchain.com/brand-assets)

### MCP

连接 Agent 与工具

Astrocyte 使用 MCP Go SDK；Morphogenesis 和 McPet 也包含 MCP 相关实现。

- ID：mcp
- 分组：engineering

- [项目使用证据](https://github.com/songconmaisaix31-design/Astrocyte/blob/57a91f4601b4292df4f55ba6cac541bad5caab3f/go.mod)

- [官方来源](https://modelcontextprotocol.io/)

### FastAPI

服务接口与观测台

Morphogenesis 使用 FastAPI 提供观测台与相关服务接口。

- ID：fastapi
- 分组：engineering

- [项目使用证据](https://github.com/songconmaisaix31-design/Morphogenesis/blob/codex/morphogenesis-mainline/pyproject.toml)

- [官方来源](https://fastapi.tiangolo.com/)

### NVIDIA

推理、部署与 Agent 学习

围绕模型推理、部署、RAG 与 Agent 持续学习，并把课程内容带回项目实践。

- ID：nvidia
- 分组：learning

- [官方来源](https://www.nvidia.com/en-us/about-nvidia/legal-info/logo-brand-usage/)

### Node.js

构建与项目脚本

氢哨、Astrocyte 和 CrewTrace 使用 Node.js 执行开发、构建与测试脚本。

- ID：nodejs
- 分组：engineering

- [项目使用证据](https://github.com/songconmaisaix31-design/OpenDashboard-H2/blob/main/package.json)

- [官方来源](https://nodejs.org/en/about/branding)

### SQLite

本地数据持久化

Astrocyte 使用 modernc.org/sqlite；Morphogenesis 也使用 SQLite 保存运行状态。

- ID：sqlite
- 分组：engineering

- [项目使用证据](https://github.com/songconmaisaix31-design/Astrocyte/blob/57a91f4601b4292df4f55ba6cac541bad5caab3f/go.mod)

- [官方来源](https://www.sqlite.org/)

### Three.js

三维界面

CrewTrace 的前端依赖包括 Three.js，用于三维视觉界面。

- ID：threejs
- 分组：code

- [项目使用证据](https://github.com/songconmaisaix31-design/co-vibe/blob/a6bb49857b87cac9fd380c7ff44c895a0e67d741/apps/web/package.json)

- [官方来源](https://threejs.org/)

### Flask

Web 服务

RealTag 使用 Flask 构建服务端。

- ID：flask
- 分组：engineering

- [项目使用证据](https://github.com/songconmaisaix31-design/tongpin-real-tags/blob/main/requirements.txt)

- [官方来源](https://flask.palletsprojects.com/)

### Apache ECharts

数据可视化

氢哨使用 Apache ECharts 展示数据。

- ID：echarts
- 分组：code

- [项目使用证据](https://github.com/songconmaisaix31-design/OpenDashboard-H2/blob/main/package.json)

- [官方来源](https://echarts.apache.org/)

### Git

版本与分支管理

通过 Git 保存项目变更，使用分支组织不同功能和实验。

- ID：git
- 分组：engineering

- [项目使用证据](https://github.com/songconmaisaix31-design)

- [官方来源](https://git-scm.com/downloads/logos)

### GitHub

项目与协作

在 GitHub 维护项目源码、文档、分支与协作记录。

- ID：github
- 分组：engineering

- [项目使用证据](https://github.com/songconmaisaix31-design)

- [官方来源](https://octodex.github.com/original/)

### OpenCode

AI 编程工具

我的日常 AI 工具之一。

- ID：opencode
- 分组：ai

- [官方来源](https://opencode.ai/brand)

### DeepSeek Harness

DeepSeek · Agent Harness

我的日常 AI 工具之一。

- ID：ds-harness
- 分组：ai

- [官方来源](https://github.com/deepseek-ai/deepseek-harness)

### Qoder

AI 编程工具

我的日常 AI 工具之一。

- ID：qoder
- 分组：ai

- [官方来源](https://qoder.com/)

### WorkBuddy

腾讯 · Agent 协作

我的日常 AI 工具之一。

- ID：workbuddy
- 分组：ai

- [官方来源](https://www.workbuddy.cn/)

### Linux

开发与运行环境

在 Linux / WSL 环境中开发、运行服务与管理项目。

- ID：linux
- 分组：engineering

- [官方来源](https://github.com/torvalds/linux/blob/master/Documentation/images/logo.svg)

Tux 原画由 Larry Ewing 创作；此 SVG 来自 Linux 内核官方仓库。

### MiniMax

模型与 AI Agent

我的日常 AI 工具之一。首页采用 MiniMax Agent 官方吉祥物。

- ID：minimax
- 分组：ai

- [官方来源](https://agent.minimax.io/)

### Kimi

月之暗面 · AI 助手

我的日常 AI 工具之一。

- ID：kimi
- 分组：ai

- [官方来源](https://www.kimi.com/resources/kimi-brand)

### GLM · Z.ai

智谱 · 模型与 AI 助手

我的日常 AI 工具之一。采用 Z.ai 官方符号。

- ID：glm
- 分组：ai

- [官方来源](https://z.ai/)

### Grok Bot

xAI · AI Bot

我的日常 AI 工具之一。首页采用官方 Grok Bot 形象。

- ID：grok-bot
- 分组：ai

- [官方来源](https://x.ai/bot)

### Muse

Meta · 个人 AI Agent

我的日常 AI 工具之一。

- ID：muse
- 分组：ai

- [官方来源](https://introducing.muse.ai/)

### OpenAI · ChatGPT

思考、研究与创作

使用 ChatGPT 推敲研究、产品与项目文档。

- ID：openai
- 分组：ai

- [官方来源](https://openai.com/brand/)

### Seedance · ByteDance Seed

字节 Seed · 视频生成

我的 AI 视频工具之一。此处采用官方发行方 ByteDance 的标识。

- ID：seedance
- 分组：ai

- [官方来源](https://seed.bytedance.com/en/seedance2_0)

### 资料说明

内容快照日期：2026-10-19。这些资料来自本站维护的介绍，未在生成机器可读版本时重新核查仓库进展。

项目状态、实现范围、团队贡献、Mock / 示例数据及图片版本说明均保留原文。仓库推送日期不代表功能完成日期。

获奖与认证按本站个人记录呈现；品牌素材链接仅说明图像来源。技术与工具清单描述具体使用情况，不表示熟练程度或官方背书。

Markdown、JSON 和网页使用相同的站点访问权限。读取这些静态文件不需要执行 JavaScript。

## 参考与来源

- [Apple · Typography](https://developer.apple.com/design/human-interface-guidelines/typography)

- [Apple · Motion](https://developer.apple.com/design/human-interface-guidelines/motion)

- [React Bits · Glass Surface](https://reactbits.dev/components/glass-surface)

- [Pinterest · Glassmorphism](https://in.pinterest.com/paint4722/glassmorphism/)

### 品牌素材

- [科大讯飞](https://www.iflytek.com/en/Public/Uploads/uploadfile/images/20230812/comlogo1.svg)

- [NVIDIA](https://www.nvidia.com/en-us/about-nvidia/legal-info/logo-brand-usage/)

- [腾讯](https://www.tencent.com/wp-content/uploads/2024/05/logo@2x-en.png)

- [浦发银行](https://download.spdb.com.cn/wap/zh_CN/imgs/common/banklogo.gif)

## 机器可读数据

[JSON 完整数据](https://davidwang.space/data/portfolio.json)
