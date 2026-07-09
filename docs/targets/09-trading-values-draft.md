# Trading Values 页面草稿（未发布）

## 状态

不发布。只作为 `/trading-values/` 的准备稿，等 [08 的扩展决策门槛](./08-复盘节奏与决策规则.md#扩展决策)满足后再进入实现。

当前触发信号：

- GSC 已出现 `steal a brainrot trading values`，2026-07-05 至 2026-07-07 合计 4 impressions。
- GSC 已出现 `trading values steal a brainrot`、`steal a brainrot value trading`、`brainrot trader value` 等相邻 query。
- GSC 已出现 calculator / tierlist / values calculator 相关 query。
- 5 个核心页面已收录，但 impressions 尚未连续 7 天出现；当前只增强现有页面承接，不发布本页。
- 2026-07-08 已在首页增加 trading values FAQ 用于低风险承接；本页仍保持草稿状态。

## 2026-07-08 轻量准备项

今天只允许做草稿准备，不进入路由、sitemap 或内链：

- 补充 `official value unavailable` 解释文案，避免用户误以为站点有完整价格表。
- 准备 future calculator enable rules：至少 10 个 verified value 后才开启 trade math。
- 准备 item detail 模板，但不生成真实详情页。
- 等 GA4 custom definitions 回流后，再用 `calculator_disabled`、`Link text`、`Search length` 判断用户真实意图。

## 页面定位

目标 URL：`/trading-values/`

目标词：

- `steal a brainrot trading values`
- `sab trading values`
- `steal a brainrot trade values`

页面承诺：

- 解释当前为什么没有官方 public trade value list。
- 展示已核验 item 的 `TBD` 状态和来源。
- 引导用户去 value list、calculator、rarity list。
- 不提供未验证的 value，不伪装成 official。

## Metadata 草稿

Title:

`Steal a Brainrot Trading Values - Trade Value Status`

Description:

`Check Steal a Brainrot trading value status, verified sources, and which Brainrot trade values are still unpublished or awaiting verification.`

Canonical:

`https://www.stealbrainrotvalues.com/trading-values/`

## 首屏草稿

H1:

`Steal a Brainrot trading values`

Intro:

`Track which Steal a Brainrot trade values are verified, still TBD, or waiting for a reliable public source. Official public sources checked so far do not publish a complete trade value list.`

Primary links:

- Value list：`/`
- Trade calculator：`/calculator/`
- Rarity list：`/rarity-list/`

## 内容模块

### Trading Value Status

表格列：

- Item
- Rarity
- Trade value
- Source status
- Last checked

数据规则：

- `value <= 0` 显示 `TBD`。
- 来源为官方商品页时标记 `Official item source`。
- 来源不足时不进入生产数据。

### Why Values Are TBD

说明：

- Roblox experience 页面确认游戏存在，但不发布公开 trade values。
- Official Steal A Brainrot merch/DLC 站确认部分 emailed DLC item，但不发布 trade prices。
- 社区估值只有在人工确认并明确标注 `Fan-made estimate` 后才能进入。

### Related Trade Tools

内链：

- `/calculator/`
- `/tier-list/`
- `/rarity-list/`
- `/updates/`

### FAQ 草稿

Q: Are Steal a Brainrot trading values official?

A: The public official sources checked so far do not publish a complete trade value list. Values stay TBD until official or manually verified data is available.

Q: Why is the calculator disabled?

A: The calculator only works when at least one verified item value exists. It does not use unverified values for trade math.

Q: Can fan-made estimates be added?

A: Yes, but only if they are clearly labeled as fan-made estimates with source, confidence, and update date.

## 发布前检查

- GSC impressions 连续 7 天出现，或 `trading values` query 连续出现并满足 08 的例外规则。
- 页面不能与首页抢同一套 exact intent；首页继续承接 `steal a brainrot values`，本页只承接 trading intent。
- 数据源至少能支撑当前 2 个 official DLC item，并最好扩展到 10+ 个可信 item。
- GA4 事件覆盖 header、intro links、related tools。
- sitemap 增加 `/trading-values/` 后再发布。
