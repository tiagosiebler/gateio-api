/* eslint-disable @typescript-eslint/no-unused-vars */

import { LogParams, WebsocketClient } from '../src/index.js';
// import { LogParams, WebsocketClient } from 'gateio-api'; // normally you should install this module via npm: `npm install gateio-api`

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
     * To authenticate, send an empty request to "futures.login". The SDK will handle all the parameters.
     *
     * Optional - you can inject rich types to set the response type
     *    const loginResult = await client.sendWSAPIRequest<WSAPIResponse<WSAPILoginResponse>>('perpFuturesUSDTV4', 'futures.login');
     */
    console.log(new Date(), 'try authenticate');
    const loginResult = await client.sendWSAPIRequest(
      'perpFuturesUSDTV4',
      'futures.login',
    );

    client.sendWSAPIRequest('perpFuturesUSDTV4', 'futures.login');
    console.log(new Date(), 'authenticated!', loginResult);

    /**
     * For other channels, the 3rd parameter should have any parameters for the request (the payload).
     *
     * Note that internal parameters such as "signature" etc are all handled automatically by the SDK.
     *
     */

    /**
     * Submit futures order
     */

    console.log(new Date(), 'Sending futures order:');
    const submitOrder = await client.sendWSAPIRequest(
      'perpFuturesUSDTV4',
      'futures.order_place',
      {
        contract: 'BTC_USDT',
        size: 20, // positive for long, negative for short
        price: '0',
        tif: 'ioc',
      },
    );

    console.log(new Date(), 'Result: ', submitOrder);

    /**
     * Submit batch futures order
     */

    console.log(new Date(), 'Sending batch futures order!');
    const submitBatchOrder = await client.sendWSAPIRequest(
      'perpFuturesUSDTV4',
      'futures.order_batch_place',
      [
        {
          contract: 'ETH_USDT',
          size: 10, // positive for long, negative for short
          price: '0',
          tif: 'ioc',
        },
        {
          contract: 'BTC_USDT',
          size: 10, // positive for long, negative for short
          price: '0',
          tif: 'ioc',
        },
      ],
    );

    console.log(new Date(), 'Result: ', submitBatchOrder);

    /**
     * Cancel futures order
     */
    console.log(new Date(), 'Cancelling futures order!');
    const cancelOrder = await client.sendWSAPIRequest(
      'perpFuturesUSDTV4',
      'futures.order_cancel',
      { order_id: 'orderIDHere' },
    );

    console.log(new Date(), 'Result: ', cancelOrder);

    /**
     * Cancel all futures orders
     */
    console.log(new Date(), 'Cancelling all futures orders!');
    const cancelAllOrders = await client.sendWSAPIRequest(
      'perpFuturesUSDTV4',
      'futures.order_cancel_cp',
      { contract: 'BTC_USDT' },
    );

    console.log(new Date(), 'Result: ', cancelAllOrders);

    /**
     * Update/Amend Futures order
     */
    console.log(new Date(), 'Updating futures order!');
    const updateOrder = await client.sendWSAPIRequest(
      'perpFuturesUSDTV4',
      'futures.order_amend',
      {
        order_id: 'orderIdHere',
        price: '31303.180000',
      },
    );

    console.log(new Date(), 'Result: ', updateOrder);

    /**
     * Get orders list
     */

    console.log(new Date(), 'Getting futures orders!');
    const getList = await client.sendWSAPIRequest(
      'perpFuturesUSDTV4',
      'futures.order_list',
      {
        status: 'open',
        contract: 'BTC_USDT',
      },
    );

    console.log(new Date(), 'Result: ', getList);

    /**
     * Get order status
     */

    console.log(new Date(), 'Getting order status!');
    const getStatus = await client.sendWSAPIRequest(
      'perpFuturesUSDTV4',
      'futures.order_status',
      {
        order_id: '74046543',
      },
    );

    console.log(new Date(), 'Result: ', getStatus);
  } catch (e) {
    console.error(`WS API Error: `, e);
  }
}

start();
