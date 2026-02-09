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
  /**
   * To use a different base URL, use the baseUrl key. The SDK uses the live environment by default:
   * baseUrlKey: 'live',
   *'https://api.gateio.ws/api/v4'
   * But you can force it to use any of the available environments. Examples below.
   */

  /*
   * Futures TestNet trading:
   * 'https://fx-api-testnet.gateio.ws/api/v4'
   */
  baseUrlKey: 'futuresTestnet',

  /**
   * Futures live trading alternative (futures only):
   * 'https://fx-api.gateio.ws/api/v4'
   */
  // baseUrlKey: 'futuresLiveAlternative'
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
    console.error('Error in execution: ', e); // Log any errors that occur
  }
}

// Execute the function to submit a futures order
submitFuturesOrder();
