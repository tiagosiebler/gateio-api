import { RestClient } from '../../../src/index.js'; // For an easy demonstration, import from the src dir. Normally though, see below to import from the npm installed version instead.
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

async function getSpotOrders() {
  try {
    console.log('Using API keys:', account);

    // Fetch open spot orders for the BTC_USDT currency pair
    const openOrders = await gateRestClient.getSpotOrders({
      currency_pair: 'BTC_USDT', // Specify the currency pair
      status: 'open', // Specify the status of the orders to fetch
    });
    console.log('openOrders: ', openOrders); // Log the response to the console

    // Fetch finished spot orders for the BTC_USDT currency pair
    const finishedOrders = await gateRestClient.getSpotOrders({
      currency_pair: 'BTC_USDT', // Specify the currency pair
      status: 'finished', // Specify the status of the orders to fetch
    });
    console.log('finishedOrders: ', finishedOrders); // Log the response to the console
  } catch (e) {
    console.error('Error in execution: ', e); // Log any errors that occur
  }
}

// Execute the function to get spot orders
getSpotOrders();
