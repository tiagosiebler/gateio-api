/* eslint-disable @typescript-eslint/no-unused-vars */

import { LogParams, WebsocketClient } from '../src';
import {
  WSAPILoginResponse,
  WSAPIResponse,
} from '../src/types/websockets/wsAPI';

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

  // Something happened, attempting to reconenct
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
    console.log(new Date(), 'try get order status');
    const orderStatus = await client.sendWSAPIRequest(
      'perpFuturesUSDTV4',
      'futures.order_list',
      {
        status: 'finished',
      },
    );

    console.log(new Date(), 'orderStatus result!', orderStatus);
  } catch (e) {
    console.error(`WS API Error: `, e);
  }
}

start();
