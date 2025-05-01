import { RestClient } from '../../src/index.js';

describe('REST PUBLIC', () => {
  const rest = new RestClient();

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getSpotTicker();
      expect(res).toMatchObject(expect.any(Array));
    });

    it('should return orderbook data', async () => {
      const res = await rest.getSpotOrderBook({
        currency_pair: 'BTC_USDT',
      });

      // console.log(JSON.stringify(res, null, 2));
      expect(res.asks).toMatchObject(expect.any(Array));
      expect(res.bids).toMatchObject(expect.any(Array));
      expect(res.current).toEqual(expect.any(Number));
      expect(res.update).toEqual(expect.any(Number));
    });
  });
});
