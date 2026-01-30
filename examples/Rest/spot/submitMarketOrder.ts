import { RestClient } from '../../../src/index.js'; // For an easy demonstration, import from the src dir. Normally though, see below to import from the npm installed version instead.
// import { RestClient } from 'gateio-api'; // Import the RestClient from the published version of this SDK, installed via NPM (npm install gateio-api)

// Define the account object with API key and secret
const account = {
  key: process.env.API_KEY || 'yourApiHere', // Replace 'yourApiHere' with your actual API key
  secret: process.env.API_SECRET || 'yourSecretHere', // Replace 'yourSecretHere' with your actual API secret
};

// Initialize the RestClient with the API credentials
const gateRestClient = new RestClient({
  apiKey: 'yourkeyhere',
  apiSecret: 'yoursecrethere',
});

async function submitSpotOrder() {
  try {
    console.log('Using API keys:', account);

    // Submit a market order for spot trading
    const result = await gateRestClient.submitSpotOrder({
      currency_pair: 'BTC_USDT', // Specify the currency pair
      side: 'buy', // Specify the order side: 'buy' or 'sell'
      type: 'market', // Specify the order type: 'market'
      amount: '10', // Specify the amount to buy
      time_in_force: 'ioc', // Time in force: 'ioc' (Immediate Or Cancel)
    });

    console.log('Response: ', result); // Log the response to the console
  } catch (e) {
    console.error('Error in execution: ', e); // Log any errors that occur
  }
}

// Execute the function to submit a spot order
submitSpotOrder();
