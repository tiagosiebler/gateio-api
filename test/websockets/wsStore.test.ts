import { isDeepObjectMatch } from '../../src/lib/websocket/WsStore';

describe('WsStore', () => {
  describe('isDeepObjectMatch()', () => {
    it('should match two equal strings', () => {
      expect(
        isDeepObjectMatch('spot.balances', 'spot.balances'),
      ).toBeTruthy();
      expect(
        isDeepObjectMatch('spot.balances', 'spot.orders'),
      ).toBeFalsy();
    });

    it('should match simple topic objects', () => {
      const topic1 = {
        topic: 'spot.balances',
      };
      const topic2 = {
        topic: 'spot.balances',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should match topic objects with payload array, even if keys are differently ordered', () => {
      const topic1 = {
        topic: 'spot.tickers',
        payload: ['BTC_USDT', 'ETH_USDT'],
      };
      const topic2 = {
        payload: ['BTC_USDT', 'ETH_USDT'],
        topic: 'spot.tickers',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should match nested payload objects', () => {
      const topic1 = {
        topic: 'spot.orders',
        payload: {
          symbols: ['BTC_USDT', 'ETH_USDT'],
        },
      };
      const topic2 = {
        topic: 'spot.orders',
        payload: {
          symbols: ['BTC_USDT', 'ETH_USDT'],
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should NOT match topics with different payload array values', () => {
      const topic1 = {
        topic: 'spot.tickers',
        payload: ['BTC_USDT', 'ETH_USDT'],
      };
      const topic2 = {
        topic: 'spot.tickers',
        payload: ['XRP_USDT'],
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match topics with nested payload differences', () => {
      const topic1 = {
        topic: 'spot.orders',
        payload: {
          symbols: ['BTC_USDT', 'ETH_USDT'],
        },
      };
      const topic2 = {
        topic: 'spot.orders',
        payload: {
          symbols: ['BTC_USDT'],
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match asymmetric objects (missing payload property)', () => {
      const topic1 = {
        topic: 'spot.tickers',
        payload: ['BTC_USDT', 'ETH_USDT'],
      };
      const topic2 = {
        topic: 'spot.tickers',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match asymmetric objects (missing nested property)', () => {
      const topic1 = {
        topic: 'spot.orders',
        payload: {
          symbols: ['BTC_USDT', 'ETH_USDT'],
        },
      };
      const topic2 = {
        topic: 'spot.orders',
        payload: {},
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match string to object', () => {
      expect(
        isDeepObjectMatch('spot.balances', { topic: 'spot.balances' }),
      ).toBeFalsy();
    });
  });
});
