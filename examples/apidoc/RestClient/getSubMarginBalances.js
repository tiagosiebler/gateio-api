const { RestClient } = require('gateio-api');

  // ENDPOINT: /wallet/sub_account_margin_balances
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L538

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getSubMarginBalances(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
