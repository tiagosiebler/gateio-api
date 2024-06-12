/* eslint-disable @typescript-eslint/no-unused-vars */
import { LogParams, WebsocketClient } from '../src';
import { WsTopicRequest } from '../src/lib/websocket/websocket-util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const account = {
  key: process.env.API_KEY || 'apiKeyHere',
  secret: process.env.API_SECRET || 'apiSecretHere',
};

// Define a custom logger object to handle logging at different levels
const customLogger = {
  // Trace level logging: used for detailed debugging information
  trace: (...params: LogParams): void => {
    // Uncomment the line below to enable trace logging
    // console.log(new Date(), 'trace', ...params);
  },
  // Info level logging: used for general informational messages
  info: (...params: LogParams): void => {
    console.log(new Date(), 'info', ...params);
  },
  // Error level logging: used for error messages
  error: (...params: LogParams): void => {
    console.error(new Date(), 'error', ...params);
  },
};

async function start() {
  const client = new WebsocketClient(
    {
      apiKey: account.key,
      apiSecret: account.secret,
    },
    customLogger,
  );

  // console.log('auth with: ', account);
  client.on('open', (data) => {
    console.log('connected ', data?.wsKey);
  });

  // Data received
  client.on('update', (data) => {
    console.info('data received: ', JSON.stringify(data));
  });

  // Something happened, attempting to reconnect
  client.on('reconnect', (data) => {
    console.log('reconnect: ', data);
  });

  // Reconnect successful
  client.on('reconnected', (data) => {
    console.log('reconnected: ', data);
  });

  // Connection closed. If unexpected, expect reconnect -> reconnected.
  client.on('close', (data) => {
    console.error('close: ', data);
  });

  // Reply to a request, e.g. "subscribe"/"unsubscribe"/"authenticate"
  client.on('response', (data) => {
    console.info('server reply: ', JSON.stringify(data), '\n');
  });

  client.on('exception', (data) => {
    console.error('exception: ', data);
  });

  client.on('authenticated', (data) => {
    console.error('authenticated: ', data);
  });

  try {
    // client.subscribe(topics, 'spotV4');

    const topicWithoutParamsAsString = 'spot.balances';

    // This has the same effect as above, it's just a different way of messaging which topic this is for
    // const topicWithoutParamsAsObject: WsTopicRequest = {
    //   topic: 'spot.balances',
    // };

    const userOrders: WsTopicRequest = {
      topic: 'spot.orders',
      payload: ['BTC_USDT', 'ETH_USDT', 'MATIC_USDT'],
    };

    const userTrades: WsTopicRequest = {
      topic: 'spot.usertrades',
      payload: ['BTC_USDT', 'ETH_USDT', 'MATIC_USDT'],
    };

    const userPriceOrders: WsTopicRequest = {
      topic: 'spot.priceorders',
      payload: ['!all'],
    };

    /**
     * Either send one topic (with optional params) at a time
     */
    // client.subscribe(topicWithoutParamsAsObject, 'spotV4');

    /**
     * Or send multiple topics in a batch (grouped by ws connection (WsKey))
     * You can also use strings for topics that don't have any parameters, even if you mix multiple requests into one function call:
     */
    client.subscribe(
      [topicWithoutParamsAsString, userOrders, userTrades, userPriceOrders],
      'spotV4',
    );

    /**
     * You can also subscribe in separate function calls as you wish.
     *
     * Any duplicate requests should get filtered out (e.g. here we subscribed to "spot.balances" twice, but the WS client will filter this out)
     */
    client.subscribe(
      [
        'spot.balances',
        'spot.margin_balances',
        'spot.funding_balances',
        'spot.cross_balances',
      ],
      'spotV4',
    );
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
