# Morphogenesis

> 探索多 Agent 如何围绕长任务协作，并在失败、中断和交接之后继续推进。

一群 Agent，把任务继续做下去

- ID：morphogenesis
- 分类：agent
- 状态：研究原型
- 技术与方向：Agent Swarm、局部选路、失败接续、观测与回放

## 起点

当一条路线走不通，协作怎样继续？

## 项目与贡献

- 在同机多进程环境中，让 Worker 共享账本并进行局部选路。
- 围绕任务状态、失败接续与上下文交接积累可运行的工程实现。
- 研究工作台呈现任务池、研究分支、事件与回放，让协作过程可以被观察与复核。

## 实现范围与限制

研究原型运行于同机多进程环境，持续验证协作机制与任务接续。截图使用仓库自带的研究任务示例数据。

## 链接与来源

- [本站项目资料](https://davidwang.space/projects/morphogenesis.md)
- [代码仓库](https://github.com/songconmaisaix31-design/Morphogenesis)
- [项目文档](https://github.com/songconmaisaix31-design/Morphogenesis/blob/codex/morphogenesis-mainline/README.md)
- 记录分支：codex/morphogenesis-mainline
- 资料对应提交：ddd2849afe330bf221d405dc2b91948c2416bd47
- 已记录的仓库推送时间：2026-10-12T15:03:15Z
- 内容快照日期：2026-10-19

## 图片与出处

- [研究任务池 · 实拍 · 示例数据](https://davidwang.space/assets/morphogenesis-signals-20261019.jpg)
  - 画面：Morphogenesis 主线前端任务池实拍，展示仓库示例中的研究候选任务与分支
  - [原始出处](https://github.com/songconmaisaix31-design/Morphogenesis/tree/ddd2849afe330bf221d405dc2b91948c2416bd47/src/env-observatory)
- [科研工作台 · 实拍 · 示例数据](https://davidwang.space/assets/morphogenesis-workspace-20261019.jpg)
  - 画面：Morphogenesis 科研工作台实拍，展示仓库示例中的研究目标、分支和事件记录
  - [原始出处](https://github.com/songconmaisaix31-design/Morphogenesis/tree/ddd2849afe330bf221d405dc2b91948c2416bd47/src/env-observatory)
