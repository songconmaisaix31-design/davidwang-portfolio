export const portfolio = {
  "updatedAt": "2026-10-19",
  "profile": {
    "brand": "David Wang",
    "headline": "把好奇心，做成能运行的东西。",
    "description": "我围绕 Agent、上下文与协作构建工具，在真实问题里试验想法，也让每次探索留下可以继续使用的代码、经验和作品。",
    "github": "https://github.com/songconmaisaix31-design",
    "about": [
      "沿着真实问题走进 AI 开发。我的起点是业务中的数据工具，后来把更多时间投入 Agent、协作系统和开源项目。黑客松让我把想法快速做出来，也遇见不同背景的人，听他们分享自己正在解决的问题。",
      "我希望长期构建一套可拆解、可组合的 Agent 工具平台，让注意力进入工作空间，再通过协作变成实际成果。每个项目都是一次探索，也应该为下一次留下可以复用的东西。"
    ],
    "name": "David Wang"
  },
  "projects": [
    {
      "id": "crewtrace",
      "name": "CrewTrace",
      "subtitle": "让协作留下可追踪的记录",
      "category": "agent",
      "status": "黑客松原型",
      "tags": [
        "React",
        "TypeScript",
        "Three.js",
        "MCP",
        "Agent 网络"
      ],
      "summary": "围绕 Agent 任务对接与协作记录构建网络，并探索链上信誉与激励。",
      "question": "Agent 开始彼此协作时，怎样知道对方做过什么？",
      "details": [
        "新版前端以动态圆环与折射文字开场，任务、交流、公告分为三个同级面板，支持中英切换与双向手势导航。",
        "任务浏览、交流全文和公告通过居中弹窗展开，支持悬停预览与任务内交流。",
        "支持需求发布、任务认领、分工、交流与交接，让协作有清晰的入口。",
        "HTTP 与 MCP 共享状态，连接网页工作台与 Agent 工具调用。",
        "继续探索信誉与链上激励；当前 MON 悬赏用于模拟体验。"
      ],
      "scope": "协作流程已有可运行原型，链上信誉与激励机制仍在探索。截图为仓库留存的 2026.10.19 设计迭代记录；最新主分支已采用任务、交流、公告三个面板，线上演示仍为较早版本。",
      "repo": "https://github.com/songconmaisaix31-design/CrewTrace",
      "branch": "main",
      "source": "https://github.com/songconmaisaix31-design/CrewTrace/blob/main/docs/three-workspace-panels.md",
      "website": "https://mon.davidwang.space",
      "websiteLabel": "查看线上版本",
      "livePreview": "https://mon.davidwang.space/",
      "livePreviewLabel": "CrewTrace 完整网站 · 实时动效与交互",
      "asset": "assets/crewtrace-hero-3ef15dd.png",
      "pushedAt": "2026-10-19T09:06:19Z",
      "sourceCommit": "dcb9ae78b0836a6e067d1f2abaa919f8e243d23b",
      "assetAlt": "CrewTrace 仓库归档的首页迭代截图，展示紫色编织圆环、流动文字与加入入口",
      "visualKind": "screenshot",
      "visualLabel": "首页设计迭代 · 仓库截图 · 2026.10.19",
      "assetSource": "https://github.com/songconmaisaix31-design/CrewTrace/blob/dcb9ae78b0836a6e067d1f2abaa919f8e243d23b/design-audit/evidence/home-desktop.png",
      "additionalImages": [
        {
          "asset": "assets/crewtrace-tasks-3ef15dd.png",
          "assetAlt": "CrewTrace 仓库归档的协作任务迭代截图，展示公开任务、状态筛选与模拟悬赏",
          "visualLabel": "任务面板设计迭代 · 仓库截图 · 2026.10.19",
          "assetSource": "https://github.com/songconmaisaix31-design/CrewTrace/blob/dcb9ae78b0836a6e067d1f2abaa919f8e243d23b/design-audit/evidence/tasks-desktop.png"
        }
      ]
    },
    {
      "id": "opendashboard",
      "name": "OpenDashboard · 氢哨",
      "subtitle": "绿氢系统异常诊断与运检助手",
      "category": "industry",
      "status": "黑客松全场前十",
      "tags": [
        "React",
        "TypeScript",
        "FastAPI",
        "ECharts"
      ],
      "summary": "把弱电网绿氢系统的异常转化为可追溯的证据、诊断与运检建议。",
      "question": "如何让复杂能源系统里的异常，更容易被人理解与复核？",
      "details": [
        "基于 OpenDashboard 插件架构，组合氢能领域契约、EMS 插件、分析侧车和六个中文业务页面。",
        "将事件总览、异常诊断、数据分析、运行助手与报告导出串联为可追溯的运检流程。",
        "我选定初赛方向并完成大部分初赛实现，继续推进全量数据导入与部分平台整合；朋友负责复赛算法推进与现场问题处理。",
        "获得浦发中关村新能源黑客松全场前十。"
      ],
      "scope": "比赛版本独立保存在 OpenDashboard-H2。截图来自固定样例演示，运检建议由人工复核。",
      "repo": "https://github.com/songconmaisaix31-design/OpenDashboard-H2",
      "branch": "main",
      "source": "https://github.com/songconmaisaix31-design/OpenDashboard-H2/blob/main/README.md",
      "asset": "assets/opendashboard-h2-fixture-20261019.jpg",
      "assetAlt": "OpenDashboard 氢哨前端真实演示界面截图",
      "pushedAt": "2026-09-29T05:55:03Z",
      "awardId": "spdb",
      "foundationRepo": "https://github.com/songconmaisaix31-design/OpenDashboard",
      "visualKind": "screenshot",
      "visualLabel": "前端实拍 · 示例数据 · 2026.10.19",
      "assetSource": "https://204421.xyz/h2-sentinel/?mode=fixture",
      "website": "https://204421.xyz/h2-sentinel/?mode=fixture"
    },
    {
      "id": "realtag",
      "name": "RealTag",
      "subtitle": "同频 · 真实标签",
      "category": "industry",
      "status": "黑客松全场第二",
      "tags": [
        "Flask",
        "Jinja2",
        "SQLite"
      ],
      "summary": "从行为标签出发，在匿名互动中找到同频的人，再逐步解锁彼此的身份。",
      "question": "如何让人与人的连接，先从真实行为与共同兴趣开始？",
      "details": [
        "将行为信号整理为包含来源、可见性与验证状态的标签，以服务端偏好筛选和匿名匹配连接用户。",
        "实现双向会话、L0–L4 渐进身份解锁、兴趣饭局与管理后台；第三方数据连接使用确定性 Mock。",
        "四人团队共同构思产品。我带入真实标签与个人数据接口方向，承担主体前端、后端、整合、部署、演示视频和部分路演。",
        "获得腾讯 LinkGen 主办的纯爱战神黑客松全场第二名。"
      ],
      "scope": "黑客松原型。第三方数据连接使用 Mock，演示匿名匹配与渐进身份解锁流程。",
      "repo": "https://github.com/songconmaisaix31-design/tongpin-real-tags",
      "branch": "main",
      "source": "https://github.com/songconmaisaix31-design/tongpin-real-tags/blob/main/README.md",
      "website": "https://realtags.davidwang.space",
      "asset": "assets/realtag-desktop.png",
      "assetAlt": "RealTag 仓库真实前端首页截图",
      "pushedAt": "2026-09-29T06:12:45Z",
      "awardId": "linkgen",
      "visualKind": "screenshot",
      "visualLabel": "仓库中的实际运行截图",
      "assetSource": "https://raw.githubusercontent.com/songconmaisaix31-design/tongpin-real-tags/main/docs/qa/hackathon/integration/screenshots/home-desktop-1100x900.png"
    },
    {
      "id": "astrocyte",
      "name": "Astrocyte",
      "subtitle": "注意力、上下文与 Agent 协作",
      "category": "agent",
      "status": "持续研发",
      "tags": [
        "Go",
        "React",
        "TypeScript",
        "SQLite",
        "MCP"
      ],
      "summary": "连接注意力、上下文与 Agent 协作的工具平台，也是我当前的长期主线。",
      "question": "人与 Agent，怎样知道此刻该关注什么？",
      "details": [
        "以 Event / Signal 组织线索，通过 explain_focus 回溯当前关注点的依据。",
        "React 工作台包含资料沉淀、共同工作区与协作网络，连接资料来源、研究线索和项目上下文。",
        "围绕 Agent 接入与动态 DAG 继续开发，让不同工具和协作协议能够组合使用。"
      ],
      "scope": "前端已连接 Go 服务与本地数据。截图展示本地实例的初始界面；Agent 平台与动态拓扑能力持续研发。",
      "repo": "https://github.com/songconmaisaix31-design/Astrocyte",
      "branch": "songconmaisaix31-design/frontend-observatory-20261018",
      "source": "https://github.com/songconmaisaix31-design/Astrocyte/blob/songconmaisaix31-design/frontend-observatory-20261018/README.md",
      "pushedAt": "2026-10-19T03:59:17Z",
      "sourceCommit": "3267249922082cb1808b6529a2f04084d40c1f92",
      "visualKind": "screenshot",
      "asset": "assets/astrocyte-attention-32672499.jpg",
      "assetAlt": "Astrocyte 资料沉淀前端实拍，包含工作空间导航、资料导入与筛选界面",
      "visualLabel": "资料沉淀 · 前端实拍",
      "assetSource": "https://github.com/songconmaisaix31-design/Astrocyte/tree/3267249922082cb1808b6529a2f04084d40c1f92/web",
      "additionalImages": [
        {
          "asset": "assets/astrocyte-import-32672499.jpg",
          "assetAlt": "Astrocyte 添加资料界面实拍，展示论文来源、标题与收藏理由输入项",
          "visualLabel": "添加资料 · 前端实拍",
          "assetSource": "https://github.com/songconmaisaix31-design/Astrocyte/tree/3267249922082cb1808b6529a2f04084d40c1f92/web"
        }
      ]
    },
    {
      "id": "morphogenesis",
      "name": "Morphogenesis",
      "subtitle": "一群 Agent，把任务继续做下去",
      "category": "agent",
      "status": "研究原型",
      "tags": [
        "Agent Swarm",
        "局部选路",
        "失败接续",
        "观测与回放"
      ],
      "summary": "探索多 Agent 如何围绕长任务协作，并在失败、中断和交接之后继续推进。",
      "question": "当一条路线走不通，协作怎样继续？",
      "details": [
        "在同机多进程环境中，让 Worker 共享账本并进行局部选路。",
        "围绕任务状态、失败接续与上下文交接积累可运行的工程实现。",
        "研究工作台呈现任务池、研究分支、事件与回放，让协作过程可以被观察与复核。"
      ],
      "scope": "研究原型运行于同机多进程环境，持续验证协作机制与任务接续。截图使用仓库自带的研究任务示例数据。",
      "repo": "https://github.com/songconmaisaix31-design/Morphogenesis",
      "branch": "codex/morphogenesis-mainline",
      "source": "https://github.com/songconmaisaix31-design/Morphogenesis/blob/codex/morphogenesis-mainline/README.md",
      "asset": "assets/morphogenesis-signals-20261019.jpg",
      "pushedAt": "2026-10-12T15:03:15Z",
      "sourceCommit": "ddd2849afe330bf221d405dc2b91948c2416bd47",
      "assetAlt": "Morphogenesis 主线前端任务池实拍，展示仓库示例中的研究候选任务与分支",
      "visualKind": "screenshot",
      "visualLabel": "研究任务池 · 实拍 · 示例数据",
      "assetSource": "https://github.com/songconmaisaix31-design/Morphogenesis/tree/ddd2849afe330bf221d405dc2b91948c2416bd47/src/env-observatory",
      "additionalImages": [
        {
          "asset": "assets/morphogenesis-workspace-20261019.jpg",
          "assetAlt": "Morphogenesis 科研工作台实拍，展示仓库示例中的研究目标、分支和事件记录",
          "visualLabel": "科研工作台 · 实拍 · 示例数据",
          "assetSource": "https://github.com/songconmaisaix31-design/Morphogenesis/tree/ddd2849afe330bf221d405dc2b91948c2416bd47/src/env-observatory"
        }
      ]
    },
    {
      "id": "finance",
      "name": "Finance Agent Lab",
      "subtitle": "配置化财务流水线",
      "category": "industry",
      "status": "工程实践",
      "tags": [
        "Python",
        "n8n",
        "数据流水线",
        "规则配置"
      ],
      "summary": "面向多城市规则差异的配置化财务流水线，从实际业务的数据处理问题出发。",
      "question": "业务规则不同，怎样让同一套流程继续复用？",
      "details": [
        "以固安为参考城市，组织可配置的数据处理步骤与财务规则。",
        "结合 Python 与 n8n 工作流，把重复处理衔接为可执行流程。",
        "通过自动化测试和批量运行记录检查流程稳定性、执行时间与资源消耗。"
      ],
      "scope": "固安为参考城市；多城市适配按各地规则与审批进度推进。",
      "repo": "https://github.com/songconmaisaix31-design/finance-agent-lab",
      "branch": "main",
      "source": "https://github.com/songconmaisaix31-design/finance-agent-lab/blob/main/README.md",
      "pushedAt": "2026-09-29T05:22:29Z",
      "visualKind": "text"
    },
    {
      "id": "research",
      "name": "投研分析 · 多系统协同",
      "subtitle": "行业场景中的 AI 协作",
      "category": "industry",
      "status": "一等奖作品",
      "tags": [
        "投研分析",
        "多系统协同",
        "科大讯飞"
      ],
      "summary": "围绕投研分析任务，探索多个系统之间的协同。",
      "question": "多个系统，如何一起完成投研分析任务？",
      "details": [
        "作品方向聚焦投研分析领域的多系统协同。",
        "获得 2026 科大讯飞 AI 开发者大会一等奖。"
      ],
      "scope": "投研分析方向的获奖作品。"
    }
  ],
  "values": [
    {
      "word": "复利",
      "en": "Compounding",
      "description": "把项目留下的代码、经验和上下文整理好，让下一次从更高的起点开始。"
    },
    {
      "word": "好奇心",
      "en": "Curiosity",
      "description": "遇到不懂的东西，先追问它为什么有效，再动手试一试。"
    },
    {
      "word": "行动力",
      "en": "Action",
      "description": "给想法一个可以运行的形状，让实际反馈推动下一步。"
    },
    {
      "word": "生命力",
      "en": "Vitality",
      "description": "为探索保留热情，也给运动、交流和生活里的意外发现留出位置。"
    },
    {
      "word": "自律",
      "en": "Discipline",
      "description": "把重要的事放进日常，在没有截止日期的时候，也持续往前走。"
    }
  ],
  "journey": [
    {
      "time": "2026",
      "title": "从业务问题开始",
      "description": "在真实经营数据中开发处理与监控工具，开始把重复工作整理成可复用流程。",
      "type": "practice"
    },
    {
      "time": "2026.09",
      "title": "探索 Agent 群体协作",
      "description": "推进 Morphogenesis，把任务分工、局部选路与失败接续带进可运行原型。",
      "type": "project"
    },
    {
      "time": "2026.10",
      "title": "把注意力连接到行动",
      "description": "持续开发 Astrocyte，围绕注意力、上下文与 Agent 接入推进工具平台。",
      "type": "project"
    },
    {
      "time": "2026.10.17",
      "title": "在 Monad 黑客松开发 CrewTrace",
      "description": "和伙伴探索 Agent 任务对接、协作记录与链上信誉，完成协作原型。",
      "type": "hackathon"
    },
    {
      "time": "2026.10",
      "title": "投研协同作品获一等奖",
      "description": "获得 2026 科大讯飞 AI 开发者大会一等奖，作品方向为投研分析领域多系统协同。",
      "type": "award"
    },
    {
      "time": "2026.10",
      "title": "获得 NVIDIA 初级工程师认证",
      "description": "取得生成式 AI 与大语言模型方向认证，继续学习推理、部署、RAG 与 Agent。",
      "type": "certification"
    }
  ],
  "awards": [
    {
      "id": "iflytek",
      "title": "一等奖",
      "subtitle": "2026 科大讯飞 AI 开发者大会",
      "description": "投研分析领域 · 多系统协同",
      "date": "2026.10",
      "issuer": "科大讯飞",
      "logo": "assets/iflytek-logo.svg",
      "projectId": "research",
      "projectName": "投研分析 · 多系统协同"
    },
    {
      "id": "nvidia",
      "issuer": "NVIDIA",
      "title": "NVIDIA 初级工程师认证",
      "subtitle": "推理 · 部署 · RAG · Agent",
      "credentialName": "NVIDIA 初级工程师",
      "focus": [
        "推理",
        "部署",
        "RAG",
        "Agent"
      ],
      "description": "NVIDIA 初级工程师，学习与实践方向包括模型推理、部署，以及 RAG 与 Agent 应用。",
      "date": "2026.10",
      "logo": "assets/nvidia-logo.svg",
      "displayTitle": "初级工程师认证"
    },
    {
      "id": "linkgen",
      "projectId": "realtag",
      "issuer": "腾讯 LinkGen",
      "title": "全场第二名",
      "subtitle": "纯爱战神黑客松",
      "description": "RealTag · 同频真实标签",
      "sourceType": "user-stated-current",
      "logo": "assets/tencent-logo.png",
      "context": "腾讯 LinkGen 主办",
      "projectName": "RealTag · 真实标签"
    },
    {
      "id": "spdb",
      "projectId": "opendashboard",
      "issuer": "浦发",
      "title": "全场前十",
      "subtitle": "浦发中关村新能源黑客松",
      "description": "OpenDashboard · 氢哨",
      "sourceType": "user-stated-current",
      "logo": "assets/spdb-logo.png",
      "projectName": "OpenDashboard · 氢哨"
    }
  ],
  "brandSources": [
    {
      "name": "科大讯飞",
      "url": "https://www.iflytek.com/en/Public/Uploads/uploadfile/images/20230812/comlogo1.svg"
    },
    {
      "name": "NVIDIA",
      "url": "https://www.nvidia.com/en-us/about-nvidia/legal-info/logo-brand-usage/"
    },
    {
      "name": "腾讯",
      "url": "https://www.tencent.com/wp-content/uploads/2024/05/logo@2x-en.png"
    },
    {
      "name": "浦发银行",
      "url": "https://download.spdb.com.cn/wap/zh_CN/imgs/common/banklogo.gif"
    }
  ]
};
