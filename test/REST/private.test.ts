import { RestClient } from '../../src/RestClient';

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

  describe('GET without auth', async () => {
    //

    const res = await rest.getSpotTicker();
    console.log('res');
    expect(res).toMatchObject({
      true: true,
    });
  });
});
