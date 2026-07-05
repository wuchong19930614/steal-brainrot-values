# Targets 文档索引

这个目录管理 `Steal a Brainrot Values` 的 SEO 实验、数据策略、页面扩展、监控复盘和商业化节奏。

当前文档已经按 MCP 可观测数据重整。后续不要只按感觉扩页面，优先使用 Search Console、GA4、Google Trends、Semrush 和线上抓取结果更新判断。

## 当前 MCP 快照

检查日期：`2026-07-05`

| 来源 | 当前信号 | 决策含义 |
| --- | --- | --- |
| GSC | Domain property `sc-domain:stealbrainrotvalues.com` 可访问 | 可以用真实索引和查询数据决策 |
| GSC Sitemap | `https://www.stealbrainrotvalues.com/sitemap.xml` 已提交，0 warnings，0 errors，提交 5 个 URL | sitemap 基础正常，继续观察 indexed 数更新 |
| GSC URL Inspection | 首页 `Submitted and indexed`，4 个工具页仍是 `URL is unknown to Google` | P0 是让核心工具页被发现和索引 |
| GA4 | property `544159633` 可访问，近 7 天 15 users / 15 sessions / 15 views | 当前主要是启动和自测流量，不能急着广告化 |
| Trends | 词簇最近 3 个月刚抬头，`best brainrot in steal a brainrot` 强于 values 词 | 第二批页面优先围绕 best / rarest / trading 意图 |
| Semrush | 主词 `steal a brainrot values` US volume 2,900，KD 16；`steal a brainrot trading values` volume 4,400，KD 19；`sab values` volume 3,600，KD 19 | 词簇可做，但必须靠矩阵扩展，不靠单页收入 |
| 线上抓取 | 非 www 跳转到 www；当前 canonical、robots、sitemap 均为 www | 等 GSC 重新抓取后确认 user canonical 与 live canonical 一致 |

## 阅读顺序

先读：

- [目标.md](./目标.md)

然后按顺序执行：

1. [01-上线与基础配置](./01-上线与基础配置.md)
2. [02-数据策略与可信度](./02-数据策略与可信度.md)
3. [03-核心页面与工具簇](./03-核心页面与工具簇.md)
4. [04-收录监控与数据看板](./04-收录监控与数据看板.md)
5. [05-关键词矩阵扩展](./05-关键词矩阵扩展.md)
6. [06-内容模板与内链规则](./06-内容模板与内链规则.md)
7. [07-广告变现计划](./07-广告变现计划.md)
8. [08-复盘节奏与决策规则](./08-复盘节奏与决策规则.md)

## 维护规则

- 改商业目标：先改 `目标.md`。
- 改上线、域名、GSC、GA4、Clarity 配置：改 `01-上线与基础配置.md`。
- 改数据来源、value 展示规则、可信度规则：改 `02-数据策略与可信度.md`。
- 改页面模块或工具状态：改 `03-核心页面与工具簇.md`。
- 新增真实监控数据或周报：改 `04-收录监控与数据看板.md` 和 `08-复盘节奏与决策规则.md`。
- 新增页面类型或关键词批次：同时改 `05-关键词矩阵扩展.md` 和 `06-内容模板与内链规则.md`。
- 准备广告：先确认 `07-广告变现计划.md` 的流量门槛。

## 当前最高优先级

1. 等待或触发 Google 重新抓取 4 个工具页。
2. 确认 GSC 首页 user canonical 更新为 `https://www.stealbrainrotvalues.com/`。
3. 在有 Search Console 查询数据前，不批量生成 item detail 页面。
4. 根据 Trends 和 Semrush，准备但暂不发布 `best / rarest / trading values` 第二批页面。
