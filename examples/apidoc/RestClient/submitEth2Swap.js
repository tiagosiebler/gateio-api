const { RestClient } = require('gateio-api');

  // ENDPOINT: /earn/staking/eth2/swap
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3715

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.submitEth2Swap(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
