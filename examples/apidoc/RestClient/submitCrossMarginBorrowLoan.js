const { RestClient } = require('gateio-api');

  // ENDPOINT: /margin/cross/loans
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1557

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.submitCrossMarginBorrowLoan(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
