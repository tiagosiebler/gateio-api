const { RestClient } = require('gateio-api');

  // ENDPOINT: /margin/cross/estimate_rate
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1653

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getEstimatedInterestRates(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
