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

    const res1 = await rest.getBalances();

    // const res1 = await rest.getSystemMaintenanceStatus();
    console.log('res: ', JSON.stringify(res1, null, 2));
  } catch (e) {
    console.error(`Error in execution: `, e);
  }
}

start();
