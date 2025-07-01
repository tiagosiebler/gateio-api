/* eslint-disable @typescript-eslint/no-unused-vars */

import { LogParams, WebsocketClient } from '../src/index.js';
// import { LogParams, WebsocketClient } from 'gateio-api'; // normally you should install this module via npm: `npm install gateio-api`

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
      reauthWSAPIOnReconnect: true,
    },
    customLogger,
  );

  client.sendWSAPIRequest('perpFuturesUSDTV4', 'futures.login');

  client.on('open', (data) => {
    console.log(new Date(), 'ws connected ', data?.wsKey);
  });

  // See comments below about event-driven vs promise-driven. Not needed if using the promise-driven approach
  // client.on('update', (data) => {
  //   // console.info(new Date(), 'ws data received: ', JSON.stringify(data));
  //   console.info(new Date(), 'ws data received: ', JSON.stringify(data, null, 2));
  // });

  // Something happened, attempting to reconnect
  client.on('reconnect', (data) => {
    console.log(new Date(), 'ws reconnect: ', data);
  });

  // Reconnect successful
  client.on('reconnected', (data) => {
    console.log(new Date(), 'ws reconnected: ', data);
  });

  // Connection closed. If unexpected, expect reconnect -> reconnected.
  client.on('close', (data) => {
    console.error(new Date(), 'ws close: ', data);
  });

  // Reply to a request, e.g. "subscribe"/"unsubscribe"/"authenticate"
  // See comments below about event-driven vs promise-driven. Not needed if using the promise-driven approach
  // client.on('response', (data) => {
  //   console.info(
  //     new Date(),
  //     'ws server reply ',
  //     JSON.stringify(data, null, 2),
  //     '\n',
  //   );
  // });

  client.on('exception', (data) => {
    console.error(new Date(), 'ws exception: ', data);
  });

  // Optional, listen to this event if you prefer the event-driven approach.
  // See below comments on event-driven vs promise-driven.
  // client.on('authenticated', (data) => {
  //   console.error(new Date(), 'ws authenticated: ', data);
  // });

  try {
    /**
     * All WebSocket API (WS API) messaging should be done via the sendWSAPIRequest method.
     *
     * You have two ways to handle responses on the WS API. You can either:
     * - event-driven: process async `response` and `update` events from the websocket client, OR
     * - promise-driven: await every call to `client.sendWSAPIRequest`, this can behave similar to using a REST API (successful responses resolve, exceptions reject).
     */

    /**
     * To authenticate, send an empty request to "spot.login". The SDK will handle all the parameters.
     *
     * Optional - you can inject rich types to set the response type
     *    const loginResult = await client.sendWSAPIRequest<WSAPIResponse<WSAPILoginResponse>>('spotV4', 'spot.login');
     */
    console.log(new Date(), 'try authenticate');
    const loginResult = await client.sendWSAPIRequest('spotV4', 'spot.login');
    console.log(new Date(), 'authenticated!', loginResult);

    /**
     * For other channels, the 3rd parameter should have any parameters for the request (the payload that goes in req_param in the docs).
     *
     * See WsAPIRequestsTopicMap for a topic->parameter map.
     *
     * Note that internal parameters such as "signature" etc are all handled automatically by the SDK.
     */

    /**
     * Submit spot order
     */

    console.log(new Date(), 'Submitting spot order!');
    const newOrder = await client.sendWSAPIRequest(
      'spotV4',
      'spot.order_place',
      {
        text: 't-my-custom-id',
        currency_pair: 'BTC_USDT',
        type: 'limit',
        account: 'spot',
        side: 'buy',
        amount: '0.001',
        price: '45000',
      },
    );

    console.log(new Date(), 'Result:', newOrder);

    /**
     * Cancel spot order
     */

    console.log(new Date(), 'Cancelling spot order!');
    const cancelOrder = await client.sendWSAPIRequest(
      'spotV4',
      'spot.order_cancel',
      {
        order_id: 'yourOrderIdHere1',
        currency_pair: 'BTC_USDT',
      },
    );

    console.log(new Date(), 'Result:', cancelOrder);

    /**
     * Batch cancel spot order
     */

    console.log(new Date(), 'Cancelling spot orders!');
    const cancelOrders = await client.sendWSAPIRequest(
      'spotV4',
      'spot.order_cancel_ids',
      [
        {
          id: 'yourOrderIdHere1',
          currency_pair: 'BTC_USDT',
        },
        {
          id: 'yourOrderIdHere2',
          currency_pair: 'ETH_USDT',
        },
      ],
    );

    console.log(new Date(), 'Result:', cancelOrders);

    /**
     * Amend/Update spot order
     */

    console.log(new Date(), 'Updating spot order!');
    const updateOrder = await client.sendWSAPIRequest(
      'spotV4',
      'spot.order_amend',
      {
        order_id: 'yourIdHere',
        currency_pair: 'BTC_USDT',
        price: '50000',
      },
    );

    console.log(new Date(), 'Result:', updateOrder);

    /**
     * Get spot order status
     */

    console.log(new Date(), 'Getting order status');
    const orderStatus = await client.sendWSAPIRequest(
      'spotV4',
      'spot.order_status',
      {
        order_id: '600995435390',
        currency_pair: 'BTC_USDT',
      },
    );

    console.log(new Date(), 'orderStatus result!', orderStatus);
  } catch (e) {
    console.error(`WS API Error: `, e);
  }
}

start();
