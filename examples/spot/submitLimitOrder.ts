import { RestClient } from '../../src';

const account = {
  key: process.env.API_KEY || 'yourApiHere',
  secret: process.env.API_SECRET || 'yourSecretHere',
};

const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

async function submitSpotOrder() {
  try {
    console.log('Using API keys:', account);

    const result = await gateRestClient.submitSpotOrder({
      currency_pair: 'BTC_USDT',
      side: 'buy',
      type: 'limit',
      amount: '0.001',
      price: '45000',
      time_in_force: 'gtc',
    });

    console.log('Response: ', result);
  } catch (e) {
    console.error(`Error in execution: `, e);
  }
}

submitSpotOrder();
