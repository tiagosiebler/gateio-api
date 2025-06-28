const { WebsocketAPIClient } = require('gateio-api');

// This example shows how to call this Gate.io WebSocket API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "gateio-api" for Gate.io exchange
// This Gate.io API SDK is available on npm via "npm install gateio-api"
// WS API ENDPOINT: spot.order_amend
// METHOD: WebSocket API
// PUBLIC: 'YES'

// Create a WebSocket API client instance
const client = new WebsocketAPIClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

// The WebSocket connection is established automatically when needed
// You can use the client to make requests immediately

// Example use of the updateSpotOrder method
client.updateSpotOrder(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

