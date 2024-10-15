const { RestClient } = require('gateio-api');

  // ENDPOINT: /futures/{settle}/my_trades_timerange
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2391

const client = new RestClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getFuturesTradingHistoryByTimeRange(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
