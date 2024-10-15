const { RestClient } = require('gateio-api');

  // ENDPOINT: /wallet/small_balance
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L625

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.convertSmallBalance(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
