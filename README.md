# gateio-api
[![Tests](https://circleci.com/gh/tiagosiebler/gateio-api.svg?style=shield)](https://circleci.com/gh/tiagosiebler/gateio-api)
[![npm version](https://img.shields.io/npm/v/gateio-api)][1] [![npm size](https://img.shields.io/bundlephobia/min/gateio-api/latest)][1] [![npm downloads](https://img.shields.io/npm/dt/gateio-api)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/gateio-api)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/tiagosiebler/gateio-api/badge)](https://www.codefactor.io/repository/github/tiagosiebler/gateio-api)

[1]: https://www.npmjs.com/package/gateio-api

WARNING: This package is still early beta, following the designs of my other connectors. If you want to stay informed when this may be ready for testing, please get in touch via telegram.

Node.js connector for the gateio APIs and WebSockets, with TypeScript & browser support.

## Installation
`npm install --save gateio-api`

## Issues & Discussion
- Issues? Check the [issues tab](https://github.com/tiagosiebler/gateio-api/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.

## Related projects
Check out my related projects:
- Try my connectors:
  - [binance](https://www.npmjs.com/package/binance)
  - [bybit-api](https://www.npmjs.com/package/bybit-api)
  - [okx-api](https://www.npmjs.com/package/okx-api)
  - [bitget-api](https://www.npmjs.com/package/bitget-api)
  - [ftx-api](https://www.npmjs.com/package/ftx-api)
- Try my misc utilities:
  - [orderbooks](https://www.npmjs.com/package/orderbooks)
- Check out my examples:
  - [awesome-crypto-examples](https://github.com/tiagosiebler/awesome-crypto-examples)

## Documentation
Most methods accept JS objects. These can be populated using parameters specified by gateio's API documentation.
- [Gate.io API Documentation](https://www.gate.io/docs/developers/apiv4/en/).

## Structure
This project uses typescript. Resources are stored in 3 key structures:
- [src](./src) - the whole connector written in typescript
- [lib](./lib) - the javascript version of the project (compiled from typescript). This should not be edited directly, as it will be overwritten with each release.
- [dist](./dist) - the packed bundle of the project for use in browser environments.
- [examples](./examples) - some implementation examples & demonstrations. Contributions are welcome!

---

# Usage
<!-- Create API credentials at okx
- [OKX my-api](https://www.okx.com/account/my-api) -->

<!--
### REST Inverse
To use the inverse REST APIs, import the `InverseClient`:

```javascript
const { InverseClient } = require('gateio-api');

const restClientOptions = {
  // override the max size of the request window (in ms)
  recv_window?: number;

  // how often to sync time drift with gateio servers
  sync_interval_ms?: number | string;

  // Default: false. Disable above sync mechanism if true.
  disable_time_sync?: boolean;

  // Default: false. If true, we'll throw errors if any params are undefined
  strict_param_validation?: boolean;

  // Optionally override API protocol + domain
  // e.g 'https://api.bytick.com'
  baseUrl?: string;

  // Default: true. whether to try and post-process request exceptions.
  parse_exceptions?: boolean;
};

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';
const useLivenet = false;

const client = new InverseClient(
  API_KEY,
  PRIVATE_KEY,

  // optional, uses testnet by default. Set to 'true' to use livenet.
  useLivenet,

  // restClientOptions,
  // requestLibraryOptions
);

client.getApiKeyInfo()
  .then(result => {
    console.log("apiKey result: ", result);
  })
  .catch(err => {
    console.error("apiKey error: ", err);
  });

client.getOrderBook({ symbol: 'BTCUSD' })
  .then(result => {
    console.log("getOrderBook inverse result: ", result);
  })
  .catch(err => {
    console.error("getOrderBook inverse error: ", err);
  });
```


See [inverse-client.ts](./src/inverse-client.ts) for further information. -->

## WebSockets
Inverse, linear & spot WebSockets can be used via a shared `WebsocketClient`. However, make sure to make one instance of WebsocketClient per market type (spot vs inverse vs linear vs linearfutures):

```javascript
const { WebsocketClient } = require('gateio-api');

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';

const wsConfig = {
  key: API_KEY,
  secret: PRIVATE_KEY,

  /*
    The following parameters are optional:
  */

  // defaults to false == testnet. Set to true for livenet.
  // livenet: true

  // NOTE: to listen to multiple markets (spot vs inverse vs linear vs linearfutures) at once, make one WebsocketClient instance per market

  // defaults to inverse:
  // market: 'inverse'
  // market: 'linear'
  // market: 'spot'

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

  // override which URL to use for websocket connections
  // wsUrl: 'wss://stream.bytick.com/realtime'
};

const ws = new WebsocketClient(wsConfig);

// subscribe to multiple topics at once
ws.subscribe(['position', 'execution', 'trade']);

// and/or subscribe to individual topics on demand
ws.subscribe('kline.BTCUSD.1m');

// Listen to events coming from websockets. This is the primary data source
ws.on('update', data => {
  console.log('update', data);
});

// Optional: Listen to websocket connection open event (automatic after subscribing to one or more topics)
ws.on('open', ({ wsKey, event }) => {
  console.log('connection open for websocket with ID: ' + wsKey);
});

// Optional: Listen to responses to websocket queries (e.g. the response after subscribing to a topic)
ws.on('response', response => {
  console.log('response', response);
});

// Optional: Listen to connection close event. Unexpected connection closes are automatically reconnected.
ws.on('close', () => {
  console.log('connection closed');
});

// Optional: Listen to raw error events.
// Note: responses to invalid topics are currently only sent in the "response" event.
ws.on('error', err => {
  console.error('ERR', err);
});
```


See [websocket-client.ts](./src/websocket-client.ts) for further information.

Note: for linear websockets, pass `linear: true` in the constructor options when instancing the `WebsocketClient`. To connect to both linear and inverse websockets, make two instances of the WebsocketClient.

---

## Customise Logging
Pass a custom logger which supports the log methods `silly`, `debug`, `notice`, `info`, `warning` and `error`, or override methods from the default logger as desired.

```javascript
const { WebsocketClient, DefaultLogger } = require('gateio-api');

// Disable all logging on the silly level
DefaultLogger.silly = () => {};

const ws = new WebsocketClient(
  { key: 'xxx', secret: 'yyy' },
  DefaultLogger
);
```

## Browser Usage
Build a bundle using webpack:
- `npm install`
- `npm build`
- `npm pack`

The bundle can be found in `dist/`. Altough usage should be largely consistent, smaller differences will exist. Documentation is still TODO.

---

## Contributions & Thanks
### Donations
#### tiagosiebler
Support my efforts to make algo trading accessible to all - register with my referral links:
- [Bybit](https://www.bybit.com/en-US/register?affiliate_id=9410&language=en-US&group_id=0&group_type=1)
- [Binance](https://www.binance.com/en/register?ref=20983262)
- [OKX](https://www.okx.com/join/18504944)
- [FTX](https://ftx.com/referrals#a=ftxapigithub)

Or buy me a coffee using any of these:
- BTC: `1C6GWZL1XW3jrjpPTS863XtZiXL1aTK7Jk`
- ETH (ERC20): `0xd773d8e6a50758e1ada699bb6c4f98bb4abf82da`

### Contributions & Pull Requests
Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.
