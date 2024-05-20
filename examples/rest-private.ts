import { RestClient } from '../src';

async function start() {
  try {
    const account = {
      key: process.env.API_KEY || 'apiKeyHere',
      secret: process.env.API_SECRET || 'apiSecretHere',
    };

    console.log('using creds: ', account);
    const rest = new RestClient({
      apiKey: account.key,
      apiSecret: account.secret,
    });

    //const res1 = await rest.getBalances();
    /* const res2 = await rest.getIndexConstituents({
      settle: 'usdt',
      index: 'BTC_USDT',
    }); */

    const res3 = await rest.portfolioMarginCalculator({
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
    });

    /* const res4 = await rest.getDeliveryContract({
      settle: 'usdt',
      contract: 'BTC_USDT',
    }); */
    // const res1 = await rest.getSystemMaintenanceStatus();
    console.log('res: ', JSON.stringify(res3, null, 2));
  } catch (e) {
    console.error(`Error in execution: `, e);
  }
}

start();
