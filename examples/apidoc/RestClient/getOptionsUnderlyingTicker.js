const { RestClient } = require('gateio-api');

  // This example shows how to call this Gate.io API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "gateio-api" for Gate.io exchange
  // This Gate.io API SDK is available on npm via "npm install gateio-api"
  // ENDPOINT: /options/underlying/tickers/{underlying}
  // METHOD: GET
  // PUBLIC: YES

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getOptionsUnderlyingTicker(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
