import { RestClient } from '../../src';

const account = {
  key: process.env.API_KEY || 'yourApiHere',
  secret: process.env.API_SECRET || 'yourSecretHere',
};

const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

async function getFuturesOrders() {
  try {
    console.log('Using API keys:', account);

    // get open orders
    const orders = await gateRestClient.getFuturesOrders({
      settle: 'usdt',
      status: 'open',
    });
    console.log('Response: ', orders);

    // get finished orders
    const orders1 = await gateRestClient.getFuturesOrders({
      settle: 'usdt',
      status: 'finished',
    });
    console.log('Response: ', orders1);
  } catch (e) {
    console.error(`Error in execution: `, e);
  }
}

getFuturesOrders();
