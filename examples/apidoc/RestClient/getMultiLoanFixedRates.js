const { RestClient } = require('gateio-api');

  // ENDPOINT: /loan/multi_collateral/fixed_rate
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3700

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getMultiLoanFixedRates(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
