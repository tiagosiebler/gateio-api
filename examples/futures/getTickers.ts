import { RestClient } from '../../src'; // For an easy demonstration, import from the src dir. Normally though, see below to import from the npm installed version instead.
// import { RestClient } from 'gateio-api'; // Import the RestClient from the published version of this SDK, installed via NPM (npm install gateio-api)

// Define the account object with API key and secret
const account = {
  key: process.env.API_KEY || 'yourApiHere', // Replace 'yourApiHere' with your actual API key
  secret: process.env.API_SECRET || 'yourSecretHere', // Replace 'yourSecretHere' with your actual API secret
};

// Initialize the RestClient with the API credentials
const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

async function getFuturesTicker() {
  try {
    console.log('Using API keys:', account);

    // Fetch all futures tickers with USDT settlement
    const allTickers = await gateRestClient.getFuturesTickers({
      settle: 'usdt', // Specify the settlement currency
    });
    console.log('Response: ', allTickers); // Log the response to the console

    // Fetch a specific futures ticker with USDT settlement
    const ticker = await gateRestClient.getFuturesTickers({
      settle: 'usdt', // Specify the settlement currency
      contract: 'BTC_USDT', // Specify the contract
    });
    console.log('Response: ', ticker); // Log the response to the console
  } catch (e) {
    console.error(`Error in execution: `, e); // Log any errors that occur
  }
}

// Execute the function to get futures tickers
getFuturesTicker();
