# gateio-api

[![E2E Tests](https://github.com/tiagosiebler/gateio-api/actions/workflows/e2etest.yml/badge.svg?branch=master)](https://github.com/tiagosiebler/gateio-api/actions/workflows/e2etest.yml)
[![npm version](https://img.shields.io/npm/v/gateio-api)][1]
[![npm size](https://img.shields.io/bundlephobia/min/gateio-api/latest)][1]
[![npm downloads](https://img.shields.io/npm/dt/gateio-api)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/gateio-api)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/tiagosiebler/gateio-api/badge)](https://www.codefactor.io/repository/github/tiagosiebler/gateio-api)

[1]: https://www.npmjs.com/package/gateio-api

Node.js & TypeScript SDK for Gate.io REST APIs and WebSockets.

## Installation

`npm install --save gateio-api`

## Issues & Discussion

- Issues? Check the [issues tab](https://github.com/tiagosiebler/gateio-api/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.

## Related projects

Check out my related JavaScript/TypeScript/Node.js projects:

- Try my API & WebSocket SDKs:
  - [Bybit-api Node.js SDK](https://www.npmjs.com/package/bybit-api)
  - [Binance Node.js SDK](https://www.npmjs.com/package/binance)
  - [Okx-api Node.js SDK](https://www.npmjs.com/package/okx-api)
  - [Gateio-api Nodejs SDK](https://www.npmjs.com/package/gateio-api)
  - [Bitget-api Node.js SDK](https://www.npmjs.com/package/bitget-api)
  - [Bitmart-api Nodejs SDK](https://www.npmjs.com/package/bitmart-api)
- Try my misc utilities:
  - [orderbooks node.js](https://www.npmjs.com/package/orderbooks)
  - [accountstate](https://www.npmjs.com/package/accountstate)
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

All available WebSockets can be used via a shared `WebsocketClient`. The WebSocket client will automatically open/track/manage connections as needed. Each unique connection (one per server URL) is tracked using a WsKey (each WsKey is a string - [WS_KEY_MAP](src/lib/websocket/websocket-util.ts).

Any subscribe/unsubscribe events will need to include a WsKey, so the WebSocket client understands which connection the event should be routed to. See examples below or in the [examples](./examples/) folder on GitHub.

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

const tickersRequestWithParams = {
  topic: 'spot.tickers',
  params: ['BTC_USDT', 'ETH_USDT', 'MATIC_USDT'],
};

const rawTradesRequestWithParams = {
  topic: 'spot.trades',
  params: ['BTC_USDT', 'ETH_USDT', 'MATIC_USDT'],
};

// subscribe to multiple topics at once
ws.subscribe([tickersRequestWithParams, rawTradesRequestWithParams], 'spotV4');

// and/or subscribe to individual topics on demand
ws.subscribe(
  {
    topic: 'spot.trades',
    params: ['BTC_USDT', 'ETH_USDT', 'MATIC_USDT'],
  },
  'spotV4',
);

// Listen to events coming from websockets. This is the primary data source
ws.on('update', (data) => {
  console.log('data', data);
});

// Optional: Listen to websocket connection open event (automatic after subscribing to one or more topics)
ws.on('open', ({ wsKey, event }) => {
  console.log('connection open for websocket with ID: ' + wsKey);
});

// Optional: Listen to responses to websocket queries (e.g. the response after subscribing to a topic)
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
// Note: responses to invalid topics are currently only sent in the "response" event.
ws.on('error', (err) => {
  console.error('ERR', err);
});
```

See [websocket-client.ts](./src/websocket-client.ts) for further information.

---

## Customise Logging

Pass a custom logger which supports the log methods `silly`, `debug`, `notice`, `info`, `warning` and `error`, or override methods from the default logger as desired.

```javascript
const { WebsocketClient, DefaultLogger } = require('gateio-api');

// Disable all logging on the silly level
DefaultLogger.silly = () => {};

const ws = new WebsocketClient({ key: 'xxx', secret: 'yyy' }, DefaultLogger);
```

## Browser Usage

Build a bundle using webpack:

- `npm install`
- `npm build`
- `npm pack`

The bundle can be found in `dist/`. Altough usage should be largely consistent, smaller differences will exist. Documentation is still TODO.

---

## Contributions & Thanks

Have my projects helped you? Share the love, there are many ways you can show your thanks:

- Star & share my projects.
- Are my projects useful? Sponsor me on Github and support my effort to maintain & improve them: https://github.com/sponsors/tiagosiebler
- Have an interesting project? Get in touch & invite me to it.
- Or buy me all the coffee:
  - ETH(ERC20): `0xA3Bda8BecaB4DCdA539Dc16F9C54a592553Be06C` <!-- metamask -->

### Contributions & Pull Requests

Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.
