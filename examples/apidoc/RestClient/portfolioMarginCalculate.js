const { RestClient } = require('gateio-api');

  // ENDPOINT: /unified/portfolio_calculator
  // METHOD: POST
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L970

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.portfolioMarginCalculate(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
