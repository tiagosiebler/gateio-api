const { RestClient } = require('gateio-api');

  // ENDPOINT: /options/positions/{contract}
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3190

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getOptionsPositionContract(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
