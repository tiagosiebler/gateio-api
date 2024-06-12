import { RestClient } from '../../src';

// Define the account object with API key and secret
const account = {
  key: process.env.API_KEY || 'yourApiHere', // Replace 'yourApiHere' with your actual API key or use environment variables
  secret: process.env.API_SECRET || 'yourSecretHere', // Replace 'yourSecretHere' with your actual API secret or use environment variables
};

// Initialize the RestClient with the API credentials
const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

async function getFuturesOrders() {
  try {
    console.log('Using API keys:', account);

    // Fetch open futures orders with USDT settlement
    const orders = await gateRestClient.getFuturesOrders({
      settle: 'usdt', // Specify the settlement currency
      status: 'open', // Specify the status of the orders to fetch
    });
    console.log('Response: ', orders); // Log the response to the console

    // Fetch finished futures orders with USDT settlement
    const orders1 = await gateRestClient.getFuturesOrders({
      settle: 'usdt', // Specify the settlement currency
      status: 'finished', // Specify the status of the orders to fetch
    });
    console.log('Response: ', orders1); // Log the response to the console
  } catch (e) {
    console.error(`Error in execution: `, e); // Log any errors that occur
  }
}

// Execute the function to get futures orders
getFuturesOrders();
