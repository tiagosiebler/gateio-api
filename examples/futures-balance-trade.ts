/**
 * This example demonstrates a simple commented workflow of:
 * - initialising the RestClient and WebsocketClient for Gate.io exchange
 * - connecting to an account’s private websockets (to receive updates asynchronously)
 * - checking if connection is successful
 * - fetching available futures balance
 * - placing an order using 50% of the available balance
 **/

// Import the RestClient and WebsocketClient from the published version of this SDK, installed via NPM (npm install gateio-api)
import { RestClient, WebsocketClient } from 'gateio-api';

// Define the account object with API key and secret
const account = {
  // Replace 'yourApiHere' with your actual API key or use environment variables
  key: process.env.API_KEY || 'yourApiHere',
  // Replace 'yourSecretHere' with your actual API secret or use environment variables
  secret: process.env.API_SECRET || 'yourSecretHere',
};

// Initialize the RestClient with the API credentials
const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

// initialise websocket client - if you want only public data, you can initialise the client without the apiKey and apiSecret, just WebsocketClient()
const gateWSClient = new WebsocketClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

// Data received
gateWSClient.on('update', (data) => {
  console.info('data received: ', JSON.stringify(data));
});

async function subscribePrivateWs() {
  try {
    // Enter your user ID here
    const myUserID = '20011';

    //sub to balances updates
    const userBalances = {
      topic: 'futures.balances',
      payload: [myUserID],
    };

    //sub to trades updates
    const userTrades = {
      topic: 'futures.usertrades',
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
    gateWSClient.subscribe([userBalances, userTrades], 'perpFuturesUSDTV4');

    return true;
  } catch (e) {
    console.error(`Req error: `, e);
    throw e;
  }
}

async function main() {
  try {
    await subscribePrivateWs();
    console.log('Subscribed to privateWs topics!');

    // Get futures account balance via REST
    const balances = await gateRestClient.getFuturesAccount({ settle: 'usdt' });

    // total usdt balance
    const usdtBalance = Number(balances.total);

    // available usdt balance
    const availableBalance = Number(balances.available);

    // submit market order with 50% of the balance
    const orderAmount = availableBalance * 0.5;

    // Submit a market order with 50% of the balance
    const marketOrder = await gateRestClient.submitFuturesOrder({
      settle: 'usdt', // Specify the settlement currency
      contract: 'BTC_USDT', // Specify the contract
      size: orderAmount, // Order size: positive for long, negative for short, in USDT
      price: '0', // Market order, so price is set to '0'
      tif: 'ioc', // Time in force: 'ioc' (Immediate Or Cancel)
    });

    console.log('Order submitted:', marketOrder);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

main();

// for more detailed ws connection, you can use a lot more listeners like below:

gateWSClient.on('open', (data) => {
  console.log('connected ', data?.wsKey);
});

// Something happened, attempting to reconnect
gateWSClient.on('reconnect', (data) => {
  console.log('reconnect: ', data);
});

// Reconnect successful
gateWSClient.on('reconnected', (data) => {
  console.log('reconnected: ', data);
});

// Connection closed. If unexpected, expect reconnect -> reconnected.
gateWSClient.on('close', (data) => {
  console.error('close: ', data);
});

// Reply to a request, e.g. "subscribe"/"unsubscribe"/"authenticate"
gateWSClient.on('response', (data) => {
  console.info('server reply: ', JSON.stringify(data), '\n');
});

gateWSClient.on('exception', (data) => {
  console.error('exception: ', data);
});

gateWSClient.on('authenticated', (data) => {
  console.error('authenticated: ', data);
});
