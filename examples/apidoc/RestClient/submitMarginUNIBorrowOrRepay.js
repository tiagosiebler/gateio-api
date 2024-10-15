const { RestClient } = require('gateio-api');

  // ENDPOINT: /margin/uni/loans
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1719

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.submitMarginUNIBorrowOrRepay(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
