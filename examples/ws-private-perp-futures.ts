/* eslint-disable @typescript-eslint/no-unused-vars */
import { LogParams, WebsocketClient, WsTopicRequest } from '../src/index.js';
// import { LogParams, WebsocketClient, WsTopicRequest } from 'gateio-api'; // normally you should install this module via npm: `npm install gateio-api`

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
    // TODO: many private topics use your user ID
    const myUserID = '20011';

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

    /**
     * Either send one topic (with params) at a time
     */
    // client.subscribe({
    //   topic: 'futures.usertrades',
    //   payload: [myUserID, '!all'],
    // }, 'perpFuturesUSDTV4');

    /**
     * Or send multiple topics in a batch (grouped by ws connection (WsKey))
     * You can also use strings for topics that don't have any parameters, even if you mix multiple requests into one function call:
     */
    client.subscribe(
      [userBalances, userTrades, userLiquidates],
      'perpFuturesUSDTV4',
    );
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
