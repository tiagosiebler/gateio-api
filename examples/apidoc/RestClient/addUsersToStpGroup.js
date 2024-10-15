const { RestClient } = require('gateio-api');

  // ENDPOINT: /account/stp_groups/{stp_id}/users
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3844

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.addUsersToStpGroup(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
