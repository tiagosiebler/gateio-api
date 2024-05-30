import { RestClient } from '../../src';

const account = {
  key: process.env.API_KEY || 'yourApiHere',
  secret: process.env.API_SECRET || 'yourSecretHere',
};

const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

async function getSpotTicker() {
  try {
    console.log('Using API keys:', account);

    // GET specific ticker
    const ticker = await gateRestClient.getSpotTicker({
      currency_pair: 'BTC_USDT',
    });
    console.log('Response: ', ticker);

    /* GET all tickers */
    const allTickers = await gateRestClient.getSpotTicker();
    console.log('Response: ', allTickers);
  } catch (e) {
    console.error(`Error in execution: `, e);
  }
}

getSpotTicker();
