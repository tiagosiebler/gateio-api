const { RestClient } = require('gateio-api');

  // ENDPOINT: /account/stp_groups/{stp_id}/users
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3834

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getStpGroupUsers(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
