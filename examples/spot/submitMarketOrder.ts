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
      type: 'market',
      amount: '10',
      time_in_force: 'ioc',
    });

    console.log('Response: ', result);
  } catch (e) {
    console.error(`Error in execution: `, e);
  }
}

submitSpotOrder();
