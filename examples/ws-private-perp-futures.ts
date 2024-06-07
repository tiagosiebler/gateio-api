/* eslint-disable @typescript-eslint/no-unused-vars */
import { LogParams, WebsocketClient } from '../src';
import { WsTopicRequest } from '../src/lib/websocket/websocket-util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const account = {
  key: process.env.API_KEY || 'apiKeyHere',
  secret: process.env.API_SECRET || 'apiSecretHere',
};

const customLogger = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trace: (...params: LogParams): void => {
    // console.log(new Date(), 'trace', ...params);
  },
  info: (...params: LogParams): void => {
    console.log(new Date(), 'info', ...params);
  },
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
    // TODO: many private topics use your user ID
    const myUserID = '20011';

    /**
     * Either send one topic (with params) at a time
     */
    // client.subscribe({
    //   topic: 'futures.usertrades',
    //   payload: [myUserID, '!all'],
    // }, 'spotV4');

    /**
     * Or send multiple topics in a batch (grouped by ws connection (WsKey))
     * You can also use strings for topics that don't have any parameters, even if you mix multiple requests into one function call:
     */

    const userBalances: WsTopicRequest = {
      topic: 'futures.balances',
      payload: [myUserID],
    };

    const userTrades: WsTopicRequest = {
      topic: 'futures.usertrades',
      payload: [myUserID, '!all'],
    };

    const userLiquidates: WsTopicRequest = {
      topic: 'futures.liquidates',
      payload: [myUserID, '!all'],
    };

    client.subscribe(
      [userBalances, userTrades, userLiquidates],
      'perpFuturesUSDTV4',
    );
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
