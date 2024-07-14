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

async function getSpotCandles() {
  try {
    console.log('Using API keys:', account);

    // Fetch the spot account balances
    const balances = await gateRestClient.getSpotCandles({
      currency_pair: 'BTC_USDT',
      interval: '1m',
      limit: 1000,
    });
    console.log('Response: ', balances); // Log the response to the console
  } catch (e) {
    console.error(`Error in execution: `, e); // Log any errors that occur
  }
}

// Execute the function to get spot balances
getSpotCandles();
