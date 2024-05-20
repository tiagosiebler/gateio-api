import { RestClient } from '../src';

async function start() {
  try {
    const account = {
      key: process.env.API_KEY || '8b8eff02d6b6105d195e81684017a43d',
      secret:
        process.env.API_SECRET ||
        '545055d0b75c9c2f9234369990bac79e3df4d2c9cda852a8531be65d901f5719',
    };

    console.log('using creds: ', account);
    const rest = new RestClient({
      apiKey: account.key,
      apiSecret: account.secret,
    });

    /*  const res1 = await rest.submitSpotOrder({
      currency_pair: 'BTC_USDT',
      side: 'buy',
      type: 'limit',
      amount: '10',
      time_in_force: 'gtc',
      price: '1',
    }); */

    const res1 = await rest.updateAutoRepaymentSetting({
      status: 'on',
    });

    /* const res2 = await rest.getIndexConstituents({
      settle: 'usdt',
      index: 'BTC_USDT',
    }); */

    /* const res3 = await rest.portfolioMarginCalculator({
      spot_balances: [
        {
          currency: 'BTC',
          equity: '-1',
        },
      ],
      spot_orders: [
        {
          currency_pairs: 'BTC_USDT',
          order_price: '344',
          left: '100',
          type: 'sell',
        },
      ],
      futures_positions: [
        {
          contract: 'BTC_USDT',
          size: '100',
        },
      ],
      futures_orders: [
        {
          contract: 'BTC_USDT',
          size: '10',
          left: '8',
        },
      ],
      options_positions: [
        {
          options_name: 'BTC_USDT-20240329-32000-C',
          size: '10',
        },
      ],
      options_orders: [
        {
          options_name: 'BTC_USDT-20240329-32000-C',
          size: '100',
          left: '80',
        },
      ],
      spot_hedge: false,
    }); */

    /* const res4 = await rest.getDeliveryContract({
      settle: 'usdt',
      contract: 'BTC_USDT',
    }); */
    // const res1 = await rest.getSystemMaintenanceStatus();
    console.log('res: ', JSON.stringify(res1, null, 2));
  } catch (e) {
    console.error(`Error in execution: `, e);
  }
}

start();
