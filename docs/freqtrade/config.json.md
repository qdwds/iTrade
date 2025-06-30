---
title: config.json
permalink: /freqtrade/config.json
categories:
  - freqtrade
tags:
  - freqtrade
---




## 新建config.json
```
freqtrade new-config --config user_data/config.json
```
---

## 交易货币和特定金额配置
+ stake_currency： 指定交易使用的基础货币。
+ stake_amount： 
  - 固定金额时，代表每笔交易使用的资金数量。
  - 设为 "unlimited" 时，表示自动使用账户余额。
+ tradable_balance_ratio： 当 stake_amount 是 "unlimited" 时，限制最多使用账户余额的比例，防止资金用尽。
```json
// 使用的基础货币，通常是 USDT
"stake_currency": "USDT"

// 固定金额，每笔交易使用 100 USDT
"stake_amount": 100

// 动态分配资金，自动使用账户余额
"stake_amount": "unlimited"

// 当动态分配时，最多使用账户余额的 95%
"tradable_balance_ratio": 0.95
```

## 交易所配置

Freqtrade 通过 `exchange` 配置项连接交易所，主要包括交易所名称和API密钥等。

### 参数说明

```json
"exchange": {
    "name": "htx",      // 交易所名称，例如 "binance"、"htx"（火币全球站）、"ftx" 等
    "key": "your_api_key",          // API Key，用于认证交易所账户权限
    "secret": "your_api_secret",        // API Secret，用于签名请求，保护账户安全
    "password": "you_api_password"
}
```

### 白名单 | 黑名单列表说明

在交易所连接配置中，可以通过 `pair_whitelist` 和 `pair_blacklist` 来控制交易对的筛选，避免交易不想要的币对。

#### 作用

- **pair_whitelist（白名单）**  
  只允许列表中的交易对参与交易，其他交易对会被忽略。  
  用于精准指定你希望交易的币对，避免频繁扫描无关币对，提升策略效率。

- **pair_blacklist（黑名单）**  
  从可交易的所有币对中排除列表内的交易对。  
  用于屏蔽某些币对，例如风险较大或流动性不足的币种。

---

#### 现货交易对示例

```json
"pair_whitelist": [
    "BTC/USDT",
    "ETH/USDT",
    "UNI/USDT",
    "PEPE/USDT"
],
"pair_blacklist": [
    "*/BNB"
]
```


### CCXT特定参数
- **enableRateLimit**  
  是否启用请求频率限制。开启后，Freqtrade 会自动控制请求频率，避免触发交易所限流规则，减少请求失败或封禁风险。建议保持为 `true`。

- **options.defaultType**  
  交易类型，常用值：  
  - `"spot"`：现货交易市场  
  - `"future"`：期货合约市场  
  该设置决定连接的交易市场类型，影响可交易的币对和订单类型。

- **enable_ws**  
  是否启用 WebSocket 连接。开启后可实时接收市场数据和订单状态，提升数据更新速度和交易响应效率。交易所支持时建议开启。

- **markets_refresh_interval**  
  交易对列表刷新间隔，单位为秒。Freqtrade 会定时更新交易所市场列表，保证币对信息最新。默认一般为 60 秒，避免频繁请求导致限流。
你可以复制粘贴到你的 Markdown 文档里。需要更简短或更详细版本，告诉我！

```json
{
  "ccxt_config": {
    "enableRateLimit": true,// 是否启用请求频率限制，避免触发交易所限流规则，通常应开启
    "options": {
      "defaultType": "spot" // 交易类型，常用的有 "spot"（现货），"future"（合约）等
    },
    "enable_ws": true,  // 是否启用 WebSocket 连接，提升数据实时性
    "markets_refresh_interval": 60  // 交易对列表刷新间隔，单位秒，定时更新市场数据，保持最新状态
  }
}
```


## 超时配置（unfilledtimeout）

- 如果买入订单（限价单）在 **10 分钟**内未成交，将自动取消。
- 如果卖出订单（限价单）在 **5 分钟**内未成交，将自动取消。
- 时间单位可设置为 `seconds`、`minutes`（默认）、`hours`。
- 市价单不会触发 `unfilledtimeout`，因为市价单通常会瞬间成交。
- 如果你用的是 `"entry": "market"`，这个配置无效。
- 推荐结合 `order_types` 设置为 `"limit"` 时使用。

### 示例配置

```json
"unfilledtimeout": {
  "entry": 10,
  "exit": 5,
  "exit_timeout_count": 0,
  "unit": "minutes"
}
```