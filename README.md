# Node.js & JavaScript SDK for Gate.com (Gate.io) REST APIs, WebSockets & WebSocket API

<p align="center">
  <a href="https://www.npmjs.com/package/gateio-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/gateio-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/gateio-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

[![npm version](https://img.shields.io/npm/v/gateio-api)][1]
[![npm size](https://img.shields.io/bundlephobia/min/gateio-api/latest)][1]
[![npm downloads](https://img.shields.io/npm/dt/gateio-api)][1]
[![Build & Test](https://github.com/tiagosiebler/gateio-api/actions/workflows/e2etest.yml/badge.svg?branch=master)](https://github.com/tiagosiebler/gateio-api/actions/workflows/e2etest.yml)
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/gateio-api)][1]
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/nodetraders)

[1]: https://www.npmjs.com/package/gateio-api

> [!TIP]
> Upcoming change: As part of the [Siebly.io](https://siebly.io/?ref=ghgate) brand, this SDK will soon be hosted under the [Siebly.io GitHub organisation](https://github.com/sieblyio). The migration is seamless and requires no user changes.

Updated & performant JavaScript & Node.js SDK for the Gate.com (gate.io) REST APIs and WebSockets:

- Professional, robust & performant Gate.com SDK with extensive production use in live trading environments.
- Extensive integration with Gate.com (Gate.io) REST APIs and WebSockets.
- Complete TypeScript support (with type declarations for most API requests & responses).
  - Strongly typed requests and responses.
  - Automated end-to-end tests ensuring reliability.
- Actively maintained with a modern, promise-driven interface.
- Gate.com REST APIs for Gate.com Spot, Margin, Perpetual Futures, Delivery Futures, Options, CrossEx, Alpha & OTC Trading APIs.
  - Unified RestClient for all Gate.com trading products.
  - Strongly typed on most requests and responses.
  - Support for Cross-Exchange (CrossEx) trading across multiple exchanges
  - Support for Alpha account trading (meme tokens and new listings)
  - Support for OTC (fiat and stablecoin) trading
- Support for seamless API authentication for private Gate.com REST API and WebSocket calls.
- Robust WebSocket integration with configurable connection heartbeats & automatic reconnect then resubscribe workflows.
  - Event driven messaging.
  - Smart websocket persistence with automatic reconnection handling.
    - Automatically handle silent websocket disconnections through timed heartbeats, including the scheduled 24hr disconnect.
    - Automatically handle listenKey persistence and expiration/refresh.
    - Emit `reconnected` event when dropped connection is restored.
  - Support for Gate.com Spot, Margin, Perpetual Futures, Delivery Futures, Options, CrossEx, Alpha & OTC.
- WebSocket API for Gate.com Spot, Margin, Perpetual Futures, Delivery Futures & CrossEx.
  - Automatic connectivity via existing WebsocketClient, just call sendWSAPIRequest to trigger a request.
  - Automatic authentication, just call sendWSAPIRequest with channel & parameters.
  - Choose between two interfaces for WS API communication:
    - Event-driven interface, fire & forget via sendWSAPIRequest and receive async replies via wsClient's event emitter.
    - Promise-driven interface, simply use the WebsocketAPIClient for a REST-like experience. Use the WebSocket API like a REST API! See [examples/ws-api-client.ts](./examples/ws-api-client.ts) for a demonstration.
- Heavy automated end-to-end testing with real API calls.
- Proxy support via axios integration.
- Active community support & collaboration in telegram: [Node.js Algo Traders](https://t.me/nodetraders).

## Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Issues & Discussion](#issues--discussion)
- [Related Projects](#related-projects)
- [Documentation](#documentation)
- [Structure](#structure)
- [Usage](#usage)
  - [REST API Client](#rest-api)
  - [WebSocket Client](#websockets)
    - [WebSocket Data Streams](#websocket-data-streams)
    - [WebSocket API](#websocket-api)
      - [Event Driven API](#event-driven-api)
      - [REST-like API](#rest-like-api)
- [Customise Logging](#customise-logging)
- [Browser/Frontend Usage](#browserfrontend-usage)
  - [Webpack](#webpack)
- [LLMs & AI](#use-with-llms--ai)
- [Used By](#used-by)
- [Contributions & Thanks](#contributions--thanks)

## Installation

`npm install --save gateio-api`

## Examples

Refer to the [examples](./examples) folder for implementation demos, including:

- **REST API Examples**: spot trading, futures trading, account management
- **WebSocket Examples**: public market data streams, private account data, WebSocket API usage
- **Spot Trading**: comprehensive spot market examples
- **Futures Trading**: perpetual and delivery futures examples
- **WebSocket API**: both event-driven and promise-driven approaches

## Issues & Discussion

- Issues? Check the [issues tab](https://github.com/tiagosiebler/gateio-api/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.
- Follow our announcement channel for real-time updates on [X/Twitter](https://x.com/sieblyio)

<!-- template_related_projects -->

## Related Projects

Check out our JavaScript/TypeScript/Node.js SDKs & Projects:

- Visit our website: [https://Siebly.io](https://siebly.io/?ref=gh)
- Try our REST API & WebSocket SDKs published on npmjs:
  - [Bybit Node.js SDK: bybit-api](https://www.npmjs.com/package/bybit-api)
  - [Kraken Node.js SDK: @siebly/kraken-api](https://www.npmjs.com/package/@siebly/kraken-api)
  - [OKX Node.js SDK: okx-api](https://www.npmjs.com/package/okx-api)
  - [Binance Node.js SDK: binance](https://www.npmjs.com/package/binance)
  - [Gate (gate.com) Node.js SDK: gateio-api](https://www.npmjs.com/package/gateio-api)
  - [Bitget Node.js SDK: bitget-api](https://www.npmjs.com/package/bitget-api)
  - [Kucoin Node.js SDK: kucoin-api](https://www.npmjs.com/package/kucoin-api)
  - [Coinbase Node.js SDK: coinbase-api](https://www.npmjs.com/package/coinbase-api)
  - [Bitmart Node.js SDK: bitmart-api](https://www.npmjs.com/package/bitmart-api)
- Try my misc utilities:
  - [OrderBooks Node.js: orderbooks](https://www.npmjs.com/package/orderbooks)
  - [Crypto Exchange Account State Cache: accountstate](https://www.npmjs.com/package/accountstate)
- Check out my examples:
  - [awesome-crypto-examples Node.js](https://github.com/tiagosiebler/awesome-crypto-examples)
  <!-- template_related_projects_end -->

## Documentation

Most methods accept JS objects. These can be populated using parameters specified by Gate.com's API documentation, or check the type definition in each class within this repository.

### API Documentation Links

- [Gate.com/gate.io API Documentation](https://www.gate.com/docs/developers/apiv4/en/)
  - [Spot Trading API](https://www.gate.com/docs/developers/apiv4/en/#spot-new)
  - [Margin Trading API](https://www.gate.com/docs/developers/apiv4/en/#margin-new)
  - [Futures Trading API](https://www.gate.com/docs/developers/apiv4/en/#futures-new)
  - [Options Trading API](https://www.gate.com/docs/developers/apiv4/en/#options-new)
  - [CrossEx Trading API](https://www.gate.com/docs/developers/apiv4/en/#crossex)
  - [Alpha Trading API](https://www.gate.com/docs/developers/apiv4/en/#alpha)
  - [OTC Trading API](https://www.gate.com/docs/developers/apiv4/en/#otc)
  - [WebSocket API](https://www.gate.com/docs/developers/apiv4/en/#websocket-api)
- [REST Endpoint Function List](./docs/endpointFunctionList.md)
- [TSDoc Documentation (autogenerated using typedoc)](https://tsdocs.dev/docs/gateio-api)

## Structure

This project uses typescript. Resources are stored in 2 key structures:

- [src](./src) - the whole connector written in typescript
- [examples](./examples) - some implementation examples & demonstrations. Contributions are welcome!

---

# Usage

Create API credentials on Gate.com's website:

- [Gate.com API Key Management](https://www.gate.com/myaccount/api_key_manage)

## REST API

The SDK provides a unified `RestClient` for all Gate.com trading products including Spot, Margin, Perpetual Futures, Delivery Futures, Options, CrossEx, Alpha, and OTC Trading. This single client handles all REST API operations across all trading markets.

To use any of Gate.com's REST APIs in JavaScript/TypeScript/Node.js, import (or require) the `RestClient`:

```javascript
const { RestClient } = require('gateio-api');

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';

const client = new RestClient({
  apiKey: API_KEY,
  apiSecret: PRIVATE_KEY,
});

// Spot Trading Example
client
  .getSpotTicker()
  .then((result) => {
    console.log('all spot tickers result: ', result);
  })
  .catch((err) => {
    console.error('spot ticker error: ', err);
  });

client
  .getSpotOrders({
    currency_pair: 'BTC_USDT',
    status: 'open',
  })
  .then((result) => {
    console.log('getSpotOrders result: ', result);
  })
  .catch((err) => {
    console.error('getSpotOrders error: ', err);
  });

// CrossEx Trading Example - Trade across multiple exchanges
client
  .getCrossExSymbols()
  .then((result) => {
    console.log('CrossEx symbols: ', result);
  })
  .catch((err) => {
    console.error('CrossEx error: ', err);
  });

// Alpha Trading Example - Trade meme tokens and new listings
client
  .getAlphaCurrencies()
  .then((result) => {
    console.log('Alpha currencies: ', result);
  })
  .catch((err) => {
    console.error('Alpha error: ', err);
  });

// OTC Trading Example - Fiat and stablecoin trading
client
  .createOTCQuote({
    side: 'BUY',
    pay_coin: 'USDT',
    get_coin: 'USD',
    pay_amount: '1000',
    create_quote_token: '1',
  })
  .then((result) => {
    console.log('OTC quote: ', result);
  })
  .catch((err) => {
    console.error('OTC error: ', err);
  });
```

See [RestClient](./src/RestClient.ts) for further information, or the [examples](./examples/) for lots of usage examples.

## WebSockets

All WebSocket functionality is supported via the unified `WebsocketClient`. This client handles all Gate.com WebSocket streams with automatic connection management and reconnection.

Key WebSocket features:

- Event driven messaging
- Smart WebSocket persistence with automatic reconnection
- Heartbeat mechanisms to detect disconnections
- Automatic resubscription after reconnection
- Support for all Gate.com trading products (Spot, Margin, Futures, Options)
- WebSocket API support for real-time trading operations

### WebSocket Data Streams

All available WebSockets can be used via a shared `WebsocketClient`. The WebSocket client will automatically open/track/manage connections as needed. Each unique connection (one per server URL) is tracked using a WsKey (each WsKey is a string - see [WS_KEY_MAP](src/lib/websocket/websocket-util.ts) for a list of supported values).

Any subscribe/unsubscribe events will need to include a WsKey, so the WebSocket client understands which connection the event should be routed to. See examples below or in the [examples](./examples/) folder on GitHub.

Data events are emitted from the WebsocketClient via the `update` event, see example below:

```javascript
const { WebsocketClient } = require('gateio-api');

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';

const wsConfig = {
  apiKey: API_KEY,
  apiSecret: PRIVATE_KEY,

  /*
    The following parameters are optional:
  */

  // Livenet is used by default, use this to enable testnet:
  // useTestnet: true

  // how long to wait (in ms) before deciding the connection should be terminated & reconnected
  // pongTimeout: 1000,

  // how often to check (in ms) that WS connection is still alive
  // pingInterval: 10000,

  // how long to wait before attempting to reconnect (in ms) after connection is closed
  // reconnectTimeout: 500,

  // config options sent to RestClient (used for time sync). See RestClient docs.
  // restOptions: { },

  // config for axios used for HTTP requests. E.g for proxy support
  // requestOptions: { }
};

const ws = new WebsocketClient(wsConfig);

/**
 * Subscribing to data:
 **/

const userOrders = {
  topic: 'spot.orders',
  payload: ['BTC_USDT', 'ETH_USDT', 'MATIC_USDT'],
};

const userTrades = {
  topic: 'spot.usertrades',
  payload: ['BTC_USDT', 'ETH_USDT', 'MATIC_USDT'],
};

const userPriceOrders = {
  topic: 'spot.priceorders',
  payload: ['!all'],
};

// subscribe to multiple topics at once
ws.subscribe([userOrders, userTrades, userPriceOrders], 'spotV4');

// and/or subscribe to individual topics on demand
ws.subscribe(
  {
    topic: 'spot.priceorders',
    payload: ['!all'],
  },
  'spotV4',
);

// Some topics don't need params, for those you can just subscribe with a string (or use a topic + payload object as above)
ws.subscribe('spot.balances', 'spotV4');

/**
 * Handling events:
 **/

// Listen to events coming from websockets. This is the primary data source
ws.on('update', (data) => {
  console.log('data', data);
});

// Optional: Listen to websocket connection open event (automatic after subscribing to one or more topics)
ws.on('open', ({ wsKey, event }) => {
  console.log('connection open for websocket with ID: ' + wsKey);
});

// Optional: Listen to responses to websocket queries (e.g. the reply after subscribing to a topic)
ws.on('response', (response) => {
  console.log('response', response);
});

// Optional: Listen to connection close event. Unexpected connection closes are automatically reconnected.
ws.on('close', () => {
  console.log('connection closed');
});

// Optional: listen to internal exceptions. Useful for debugging if something weird happens
ws.on('exception', (data) => {
  console.error('exception: ', data);
});

// Optional: Listen to raw error events.
ws.on('error', (err) => {
  console.error('ERR', err);
});
```

See [WebsocketClient](./src/WebsocketClient.ts) for further information and make sure to check the [examples](./examples/) folder for much more detail.

### Websocket API

Gate.com supports sending requests (commands) over an active WebSocket connection. This is called the WebSocket API.

The WebSocket API is available through two approaches, depending on individual preference:

#### Event Driven API

The WebSocket API is available in the [WebsocketClient](./src/WebsocketClient.ts) via the `sendWSAPIRequest(wsKey, channel, params)` method.

Each call to this method is wrapped in a promise, which you can async await for a response, or handle it in a raw event-driven design.

- event-driven:
  - send requests via `client.sendWSAPIRequest(wsKey, channel, params).catch(e => console.error('WS API exception for channel', channel, e))`, fire and forget, don't use await
  - handle async replies via event handlers on `client.on('exception', cb)` and `client.on('response', cb)`
- promise-driven:
  - send requests via `const result = await client.sendWSAPIRequest(wsKey, channel, params)`, which returns a promise
  - await each call
  - use try/catch blocks to handle promise rejections

#### REST-like API

The WebSocket API is also available in a promise-wrapped REST-like format. Either, as above, await any calls to `sendWSAPIRequest(...)`, or directly use the convenient WebsocketAPIClient. This class is very similar to existing REST API classes (such as the RestClient).

It provides one function per endpoint, feels like a REST API and will automatically route your request via an automatically persisted, authenticated and health-checked WebSocket API connection.

Below is an example showing how easy it is to use the WebSocket API without any concern for the complexity of managing WebSockets.

```javascript
const { WebsocketAPIClient } = require('gateio-api');

const API_KEY = 'xxx';
const API_SECRET = 'yyy';

async function start() {
  // Make an instance of the WS API Client
  const wsClient = new WebsocketAPIClient({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    // Automatically re-auth WS API, if we were auth'd before and get reconnected
    reauthWSAPIOnReconnect: true,
  });

  try {
    // Connection will authenticate automatically before first request
    // Make WebSocket API calls, very similar to a REST API:

    /* ============ SPOT TRADING EXAMPLES ============ */

    // Submit a new spot order
    const newOrder = await wsClient.submitNewSpotOrder({
      text: 't-my-custom-id',
      currency_pair: 'BTC_USDT',
      type: 'limit',
      account: 'spot',
      side: 'buy',
      amount: '1',
      price: '10000',
    });
    console.log('Order result:', newOrder.data);

    // Cancel a spot order
    const cancelOrder = await wsClient.cancelSpotOrder({
      order_id: '1700664330',
      currency_pair: 'BTC_USDT',
      account: 'spot',
    });
    console.log('Cancel result:', cancelOrder.data);

    // Get spot order status
    const orderStatus = await wsClient.getSpotOrderStatus({
      order_id: '1700664330',
      currency_pair: 'BTC_USDT',
      account: 'spot',
    });
    console.log('Order status:', orderStatus.data);

    /* ============ FUTURES TRADING EXAMPLES ============ */

    // Submit a new futures order
    const newFuturesOrder = await wsClient.submitNewFuturesOrder({
      contract: 'BTC_USDT',
      size: 10,
      price: '31503.28',
      tif: 'gtc',
      text: 't-my-custom-id',
    });
    console.log('Futures order result:', newFuturesOrder.data);

    // Cancel a futures order
    const cancelFuturesOrder = await wsClient.cancelFuturesOrder({
      order_id: '74046514',
    });
    console.log('Cancel futures order result:', cancelFuturesOrder.data);

    // Get futures order status
    const futuresOrderStatus = await wsClient.getFuturesOrderStatus({
      order_id: '74046543',
    });
    console.log('Futures order status:', futuresOrderStatus.data);
  } catch (e) {
    console.error('WS API Error:', e);
  }
}

start();
```

For more detailed examples using any approach, refer to the [examples](./examples/) folder (e.g. [ws-api-client.ts](./examples/ws-api-client.ts)).

---

## Customise Logging

Pass a custom logger which supports the log methods `silly`, `debug`, `notice`, `info`, `warning` and `error`, or override methods from the default logger as desired.

```javascript
const { WebsocketClient, DefaultLogger } = require('gateio-api');

// Disable all logging on the silly level
DefaultLogger.silly = () => {};

const ws = new WebsocketClient({ key: 'xxx', secret: 'yyy' }, DefaultLogger);
```

## Browser/Frontend Usage

### Webpack

Build a bundle using webpack:

- `npm install`
- `npm run build`
- `npm run pack`

The bundle can be found in `dist/`. Altough usage should be largely consistent, smaller differences will exist. Documentation is still TODO.

## Use with LLMs & AI

This SDK includes a bundled `llms.txt` file in the root of the repository. If you're developing with LLMs, use the included `llms.txt` with your LLM - it will significantly improve the LLMs understanding of how to correctly use this SDK.

This file contains AI optimised structure of all the functions in this package, and their parameters for easier use with any learning models or artificial intelligence.

---

## Used By

[![Repository Users Preview Image](https://dependents.info/tiagosiebler/gateio-api/image)](https://github.com/tiagosiebler/gateio-api/network/dependents)

---

<!-- template_contributions -->

### Contributions & Thanks

Have my projects helped you? Share the love, there are many ways you can show your thanks:

- Star & share my projects.
- Are my projects useful? Sponsor me on Github and support my effort to maintain & improve them: https://github.com/sponsors/tiagosiebler
- Have an interesting project? Get in touch & invite me to it.
- Or buy me all the coffee:
  - ETH(ERC20): `0xA3Bda8BecaB4DCdA539Dc16F9C54a592553Be06C` <!-- metamask -->
- Sign up with my referral links:
  - OKX (receive a 20% fee discount!): https://www.okx.com/join/42013004
  - Binance (receive a 20% fee discount!): https://accounts.binance.com/register?ref=OKFFGIJJ
  - HyperLiquid (receive a 4% fee discount!): https://app.hyperliquid.xyz/join/SDK
  - Gate: https://www.gate.io/signup/NODESDKS?ref_type=103

<!---
old ones:
  - BTC: `1C6GWZL1XW3jrjpPTS863XtZiXL1aTK7Jk`
  - BTC(SegWit): `bc1ql64wr9z3khp2gy7dqlmqw7cp6h0lcusz0zjtls`
  - ETH(ERC20): `0xe0bbbc805e0e83341fadc210d6202f4022e50992`
  - USDT(TRC20): `TA18VUywcNEM9ahh3TTWF3sFpt9rkLnnQa
  - gate: https://www.gate.io/signup/AVNNU1WK?ref_type=103

-->
<!-- template_contributions_end -->

### Contributions & Pull Requests

Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.

<!-- template_star_history -->

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tiagosiebler/bybit-api,tiagosiebler/okx-api,tiagosiebler/binance,tiagosiebler/bitget-api,tiagosiebler/bitmart-api,tiagosiebler/gateio-api,tiagosiebler/kucoin-api,tiagosiebler/coinbase-api,tiagosiebler/orderbooks,tiagosiebler/accountstate,tiagosiebler/awesome-crypto-examples&type=Date)](https://star-history.com/#tiagosiebler/bybit-api&tiagosiebler/okx-api&tiagosiebler/binance&tiagosiebler/bitget-api&tiagosiebler/bitmart-api&tiagosiebler/gateio-api&tiagosiebler/kucoin-api&tiagosiebler/coinbase-api&tiagosiebler/orderbooks&tiagosiebler/accountstate&tiagosiebler/awesome-crypto-examples&Date)

<!-- template_star_history_end -->
