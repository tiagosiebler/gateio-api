import { RestClient } from '../../src/index.js';

describe('REST PRIVATE', () => {
  const account = {
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
  };

  const rest = new RestClient({
    apiKey: account.key,
    apiSecret: account.secret,
  });

  it('should have credentials to test with', () => {
    expect(account.key).toBeDefined();
    expect(account.secret).toBeDefined();
  });

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getSpotTicker();
      // console.log('res', res);
      expect(res).toMatchObject(expect.any(Array));
    });
  });

  describe('private endpoints', () => {
    describe('GET requests', () => {
      test('without params', async () => {
        const res = await rest.getBalances();
        // console.log('res without', res);
        expect(res).toMatchObject({
          details: expect.any(Object),
          total: expect.any(Object),
        });
      });

      test('with params', async () => {
        const res = await rest.getBalances({ currency: 'USDT' });
        // console.log('res with', res);
        expect(res).toMatchObject({
          details: expect.any(Object),
          total: expect.any(Object),
        });
      });

      test('with comma', async () => {
        try {
          const res = await rest.getUnifiedBatchMaxBorrowable({
            currencies: ['BTC', 'GT'],
          });

          // console.log('res with', res);
          expect(res).toMatchObject({
            details: expect.any(Object),
            total: expect.any(Object),
          });
        } catch (e) {
          console.error(
            `Request failed for test: "${expect.getState().currentTestName}"`,
            e,
          );
          throw e;
        }
      });
    });

    describe('POST requests', () => {
      test('with params as query strings', async () => {
        const res = await rest.updateAutoRepaymentSetting({ status: 'on' });
        // console.log('res "${expect.getState().currentTestName}"', res);
        expect(res).toMatchObject({
          status: 'on',
        });
      });

      test('with params as request body', async () => {
        try {
          const res = await rest.submitSubToSubTransfer({
            currency: 'BTC',
            sub_account_from: 'notReal1',
            sub_account_from_type: 'spot',
            sub_account_to: 'notReal2',
            sub_account_to_type: 'spot',
            amount: '10000',
          });
          console.log('res "${expect.getState().currentTestName}"', res);
          expect(res).toMatchObject({
            whatever: true,
          });
        } catch (e: any) {
          const authSuccessMatchError = 'Invalid sub_account_from';
          if (e.body.message !== authSuccessMatchError) {
            console.error(
              `Request failed for test: "${expect.getState().currentTestName}"`,
              e,
            );
          }
          expect(e.body?.message).toStrictEqual(authSuccessMatchError);
        }
      });

      test('with params as query string AND request body', async () => {
        try {
          const res = await rest.updateFuturesLeverage({
            settle: 'usdt',
            contract: 'BTC_USDT',
            leverage: '1',
          });
          // console.log(`res "${expect.getState().currentTestName}"`, res);
          expect(res).toMatchObject({
            value: '0',
          });
        } catch (e: any) {
          const authSuccessMatchError =
            'please transfer funds first to create futures account';
          if (e.body?.message !== authSuccessMatchError) {
            console.error(
              `Request failed for test: "${expect.getState().currentTestName}"`,
              e,
            );
          }
          expect(e.body.message).toStrictEqual(authSuccessMatchError);
        }
      });
    });
  });
});
