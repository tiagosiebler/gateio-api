import { RestClient } from '../../../src/index.js';
// import { RestClient } from 'gateio-api';

const account = {
  key: process.env.API_KEY || 'yourApiHere',
  secret: process.env.API_SECRET || 'yourSecretHere',
};

const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

async function getOTCBankListExample() {
  try {
    console.log('Using API keys:', account);

    const result = await gateRestClient.getOTCBankList();

    console.log('Response: ', result);

    const defaultCard = result.data?.lists?.find((c) => c.is_default === 1);
    if (defaultCard) {
      console.log(
        'Default bank id for orders:',
        defaultCard.id ?? defaultCard.bank_id,
      );
    }
  } catch (e) {
    console.error('Error in execution: ', e);
  }
}

getOTCBankListExample();
