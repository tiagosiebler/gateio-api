import { RestClient } from '../../src'; // Import the RestClient from the src directory

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

async function submitFuturesOrder() {
  try {
    console.log('Using API keys:', account);

    // Submit a market order for futures trading
    const result = await gateRestClient.submitFuturesOrder({
      settle: 'usdt', // Specify the settlement currency
      contract: 'BTC_USDT', // Specify the contract
      size: 20, // Order size: positive for long, negative for short
      price: '0', // Market order, so price is set to '0'
      tif: 'ioc', // Time in force: 'ioc' (Immediate Or Cancel)
    });

    console.log('Response: ', result); // Log the response to the console
  } catch (e) {
    console.error(`Error in execution: `, e); // Log any errors that occur
  }
}

// Execute the function to submit a futures order
submitFuturesOrder();
