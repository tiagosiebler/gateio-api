import { RestClient } from '../../src';

const account = {
  key: process.env.API_KEY || 'yourApiHere',
  secret: process.env.API_SECRET || 'yourSecretHere',
};

const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

async function submitFuturesOrder() {
  try {
    console.log('Using API keys:', account);

    const result = await gateRestClient.submitFuturesOrder({
      settle: 'usdt',
      contract: 'BTC_USDT',
      size: 20, // positive for long, negative for short
      price: '0',
      tif: 'ioc',
    });

    console.log('Response: ', result);
  } catch (e) {
    console.error(`Error in execution: `, e);
  }
}

submitFuturesOrder();
