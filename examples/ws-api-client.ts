import { WebsocketAPIClient, WS_KEY_MAP } from '../src/index.js';
// import { LogParams, WebsocketClient } from 'gateio-api'; // normally you should install this module via npm: `npm install gateio-api`

const account = {
  key: process.env.API_KEY || 'insert_key_here',
  secret: process.env.API_SECRET || 'insert_secret_here',
};

async function start() {
  const client = new WebsocketAPIClient({
    apiKey: account.key,
    apiSecret: account.secret,
    reauthWSAPIOnReconnect: true,
  });

  try {
    /**
     * Optional: authenticate in advance. This will prepare and authenticate a connection.
     * Useful to save time for the first request but completely optional. It will also happen automatically when you make your first request.
     */
    // console.log(new Date(), 'Authenticating in advance...');
    // await client.getWSClient().connectWSAPI('spotV4');
    // console.log(new Date(), 'Authenticating in advance...OK!');

    /* ============ SPOT TRADING EXAMPLES ============ */

    // SPOT ORDER PLACE - Submit a new spot order
    const newOrder = await client.submitNewSpotOrder({
      text: 't-my-custom-id',
      currency_pair: 'BTC_USDT',
      type: 'limit',
      account: 'spot',
      side: 'buy',
      amount: '1',
      price: '10000',
    });
    console.log(new Date(), 'Result of the order:', newOrder.data);

    // SPOT ORDER CANCEL - Cancel a specific spot order
    const cancelOrder = await client.cancelSpotOrder({
      order_id: '1700664330',
      currency_pair: 'BTC_USDT',
      account: 'spot',
    });
    console.log(new Date(), 'Cancel order result:', cancelOrder.data);

    // SPOT ORDER CANCEL BY IDS - Cancel orders by ID list
    const cancelOrdersByIds = await client.cancelSpotOrderById([
      {
        currency_pair: 'BTC_USDT',
        id: '1700664343',
        account: 'spot',
      },
    ]);
    console.log(
      new Date(),
      'Cancel orders by IDs result:',
      cancelOrdersByIds.data,
    );

    // SPOT ORDER CANCEL BY CURRENCY PAIR - Cancel all orders for a currency pair
    const cancelOrdersByCurrencyPair = await client.cancelSpotOrderForSymbol({
      currency_pair: 'BTC_USDT',
      side: 'buy',
      account: 'spot',
    });
    console.log(
      new Date(),
      'Cancel orders by currency pair result:',
      cancelOrdersByCurrencyPair.data,
    );

    // SPOT ORDER AMEND - Update an existing spot order
    const amendOrder = await client.updateSpotOrder({
      order_id: '1700664330',
      currency_pair: 'BTC_USDT',
      price: '12000',
      amount: '0.002',
      amend_text: 'price-update',
    });
    console.log(new Date(), 'Amend order result:', amendOrder.data);

    // SPOT ORDER STATUS - Get status of a specific spot order
    const orderStatus = await client.getSpotOrderStatus({
      order_id: '1700664330',
      currency_pair: 'BTC_USDT',
      account: 'spot',
    });
    console.log(new Date(), 'Order status result:', orderStatus.data);

    // SPOT ORDER LIST - Get list of spot orders
    const getOrders = await client.getSpotOrders({
      currency_pair: 'BTC_USDT',
      status: 'open',
      page: 1,
      limit: 10,
      account: 'spot',
      side: 'buy',
    });
    console.log(new Date(), 'Result of the orders:', getOrders.data);

    /* ============ FUTURES TRADING EXAMPLES ============ */

    /**
     * Gate has different websocket groups depending on the futures product.
     *
     * This affects which connection your command is sent to, so make sure to pass one matching your request. Look at WS_KEY_MAP (or the examples below) for details on the available product groups.
     */
    const FUTURES_CONNECTION_GROUP_WS_KEY = WS_KEY_MAP.perpFuturesUSDTV4;

    /**
     * Also optional, as for spot. Keep in mind the first parameter (wsKey) might vary depending on which WS URL is needed.
     */

    // console.log(new Date(), 'Authenticating in advance...');
    // await client.getWSClient().connectWSAPI(futuresConnectionGroup);
    // await client.getWSClient().connectWSAPI('perpFuturesUSDTV4');
    // await client.getWSClient().connectWSAPI('perpFuturesBTCV4');
    // await client.getWSClient().connectWSAPI('deliveryFuturesUSDTV4');
    // await client.getWSClient().connectWSAPI('perpFuturesBTCV4');
    // console.log(new Date(), 'Authenticating in advance...OK!');

    // FUTURES ORDER PLACE - Submit a new futures order
    const newFuturesOrder = await client.submitNewFuturesOrder(
      {
        contract: 'BTC_USDT',
        size: 10,
        price: '31503.28',
        tif: 'gtc',
        text: 't-my-custom-id',
        iceberg: 0,
        close: false,
        reduce_only: false,
        auto_size: undefined,
        stp_act: 'cn',
      },
      FUTURES_CONNECTION_GROUP_WS_KEY,
    );
    console.log(new Date(), 'New futures order result:', newFuturesOrder.data);

    // FUTURES ORDER BATCH PLACE - Submit multiple futures orders
    const batchFuturesOrders = await client.submitNewFuturesBatchOrder(
      [
        {
          contract: 'BTC_USDT',
          size: 10,
          price: '31403.18',
          tif: 'gtc',
          text: 't-my-custom-id-1',
        },
        {
          contract: 'ETH_USDT',
          size: 20,
          price: '2500.50',
          tif: 'gtc',
          text: 't-my-custom-id-2',
        },
      ],
      FUTURES_CONNECTION_GROUP_WS_KEY,
    );
    console.log(
      new Date(),
      'Batch futures orders result:',
      batchFuturesOrders.data,
    );

    // FUTURES ORDER CANCEL - Cancel a specific futures order
    const cancelFuturesOrder = await client.cancelFuturesOrder(
      {
        order_id: '74046514',
      },
      FUTURES_CONNECTION_GROUP_WS_KEY,
    );
    console.log(
      new Date(),
      'Cancel futures order result:',
      cancelFuturesOrder.data,
    );

    // FUTURES ORDER CANCEL BY IDS - Cancel futures orders by ID list
    const cancelFuturesOrdersByIds = await client.cancelFuturesOrderById(
      ['1694883366', '123'],
      FUTURES_CONNECTION_GROUP_WS_KEY,
    );
    console.log(
      new Date(),
      'Cancel futures orders by IDs result:',
      cancelFuturesOrdersByIds.data,
    );

    // FUTURES ORDER CANCEL ALL - Cancel all open futures orders
    const cancelAllFuturesOrders = await client.cancelFuturesAllOpenOrders(
      {
        contract: 'BTC_USDT',
        side: 'bid',
      },
      FUTURES_CONNECTION_GROUP_WS_KEY,
    );
    console.log(
      new Date(),
      'Cancel all futures orders result:',
      cancelAllFuturesOrders.data,
    );

    // FUTURES ORDER AMEND - Update an existing futures order
    const amendFuturesOrder = await client.updateFuturesOrder(
      {
        order_id: '74046543',
        price: '31303.18',
        size: 15,
        amend_text: 'price-and-size-update',
      },
      FUTURES_CONNECTION_GROUP_WS_KEY,
    );
    console.log(
      new Date(),
      'Amend futures order result:',
      amendFuturesOrder.data,
    );

    // FUTURES ORDER LIST - Get list of futures orders
    const getFuturesOrders = await client.getFuturesOrders(
      {
        contract: 'BTC_USDT',
        status: 'open',
        limit: 10,
        offset: 0,
        last_id: undefined,
        count_total: 0,
      },
      FUTURES_CONNECTION_GROUP_WS_KEY,
    );
    console.log(
      new Date(),
      'Futures orders list result:',
      getFuturesOrders.data,
    );

    // FUTURES ORDER STATUS - Get status of a specific futures order
    const futuresOrderStatus = await client.getFuturesOrderStatus(
      {
        order_id: '74046543',
      },
      FUTURES_CONNECTION_GROUP_WS_KEY,
    );
    console.log(
      new Date(),
      'Futures order status result:',
      futuresOrderStatus.data,
    );
  } catch (e) {
    console.error(new Date(), 'Error:', e);
  }
}

start();
