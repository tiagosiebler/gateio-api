const { RestClient } = require('gateio-api');

  // ENDPOINT: /margin/funding_accounts
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1451

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getFundingAccounts(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
