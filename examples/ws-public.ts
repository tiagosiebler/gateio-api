// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LogParams, WebsocketClient } from '../src';
import { WsTopicRequest } from '../src/lib/websocket/websocket-util';

// const customLogger = {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   trace: (...params: LogParams): void => {
//     console.log('trace', ...params);
//   },
//   info: (...params: LogParams): void => {
//     console.log('info', ...params);
//   },
//   error: (...params: LogParams): void => {
//     console.error('error', ...params);
//   },
// };

async function start() {
  const client = new WebsocketClient();

  // Optional, inject a custom logger
  // const client = new WebsocketClient({}, customLogger);

  client.on('open', (data) => {
    console.log('connected ', data?.wsKey);
  });

  // Data received
  client.on('update', (data) => {
    console.info('data received: ', JSON.stringify(data));
  });

  // Something happened, attempting to reconenct
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
    const tickersRequestWithParams: WsTopicRequest = {
      topic: 'spot.tickers',
      params: ['BTC_USDT', 'ETH_USDT', 'MATIC_USDT'],
    };

    const rawTradesRequestWithParams: WsTopicRequest = {
      topic: 'spot.trades',
      params: ['BTC_USDT', 'ETH_USDT', 'MATIC_USDT'],
    };

    // const topicWithoutParamsAsString = 'spot.balances';

    // This has the same effect as above, it's just a different way of messaging which topic this is for
    // const topicWithoutParamsAsObject: WsTopicRequest = {
    //   topic: 'spot.balances',
    // };

    /**
     * Either send one topic (with optional params) at a time
     */
    // client.subscribe(tickersRequestWithParams, 'spotV4');

    /**
     * Or send multiple topics in a batch (grouped by ws connection (WsKey))
     */
    client.subscribe(
      [tickersRequestWithParams, rawTradesRequestWithParams],
      'spotV4',
    );

    // /**
    //  * You can also use strings for topics that don't have any parameters, even if you mix multiple requests into one function call:
    //  */
    // client.subscribe(
    //   [tickersRequestWithParams, rawTradesRequestWithParams, topicWithoutParamsAsString],
    //   'spotV4',
    // );
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
