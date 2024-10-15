const { RestClient } = require('gateio-api');

  // ENDPOINT: /earn/uni/currencies/{currency}
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3339

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getLendingCurrency(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
