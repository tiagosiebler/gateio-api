const { RestClient } = require('gateio-api');

  // ENDPOINT: /loan/multi_collateral/repay
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3624

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.repayMultiLoan(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
