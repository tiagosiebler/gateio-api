const { RestClient } = require('gateio-api');

  // ENDPOINT: /delivery/{settle}/positions/{contract}/risk_limit
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2775

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.updateDeliveryRiskLimit(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
