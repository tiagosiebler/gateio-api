const { RestClient } = require('gateio-api');

  // ENDPOINT: /options/underlyings
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3001

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getOptionsUnderlyings(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
