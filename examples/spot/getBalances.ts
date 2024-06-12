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

async function getSpotBalances() {
  try {
    console.log('Using API keys:', account);

    // Fetch the spot account balances
    const balances = await gateRestClient.getSpotAccounts();
    console.log('Response: ', balances); // Log the response to the console
  } catch (e) {
    console.error(`Error in execution: `, e); // Log any errors that occur
  }
}

// Execute the function to get spot balances
getSpotBalances();
