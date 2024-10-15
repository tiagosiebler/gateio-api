const { RestClient } = require('gateio-api');

  // ENDPOINT: /account/stp_groups/{stp_id}/users
  // METHOD: DELETE
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3860

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.deleteUserFromStpGroup(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
