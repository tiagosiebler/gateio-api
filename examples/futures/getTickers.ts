import { RestClient } from '../../src';

const account = {
  key: process.env.API_KEY || 'yourApiHere',
  secret: process.env.API_SECRET || 'yourSecretHere',
};

const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

async function getFuturesTicker() {
  try {
    console.log('Using API keys:', account);

    // GET specific ticker
    const ticker = await gateRestClient.getFuturesTickers({
      settle: 'usdt',
    });
    console.log('Response: ', ticker);

    /* GET all tickers */
    const allTickers = await gateRestClient.getFuturesTickers({
      settle: 'usdt',
      contract: 'BTC_USDT',
    });
    console.log('Response: ', allTickers);
  } catch (e) {
    console.error(`Error in execution: `, e);
  }
}

getFuturesTicker();
