const { RestClient } = require('gateio-api');

  // ENDPOINT: /sub_accounts/{user_id}/keys/{key}
  // METHOD: PUT
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L720

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.updateSubAccountApiKey(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
