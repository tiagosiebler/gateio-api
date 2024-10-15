const { RestClient } = require('gateio-api');

  // ENDPOINT: /unified/currency_discount_tiers
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L941

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getUnifiedCurrencyDiscountTiers(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
