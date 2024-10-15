const { RestClient } = require('gateio-api');

  // ENDPOINT: /unified/unified_mode
  // METHOD: PUT
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L909

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.setUnifiedAccountMode(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
