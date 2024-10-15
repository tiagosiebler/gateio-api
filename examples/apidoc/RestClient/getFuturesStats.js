const { RestClient } = require('gateio-api');

  // ENDPOINT: /futures/{settle}/contract_stats
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1995

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getFuturesStats(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
