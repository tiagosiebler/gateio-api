import { readFileSync } from 'fs';

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

async function submitOTCBankPersonalSupplementExample() {
  try {
    console.log('Using API keys:', account);

    const bank_id =
      process.env.OTC_BANK_ID || 'your_bank_id_from_getOTCBankList';

    const result = await gateRestClient.submitOTCBankPersonalSupplement({
      bank_id,
      id_document_front: {
        filename: 'id_front.jpg',
        content: readFileSync(
          process.env.OTC_ID_FRONT_FILE || './id_front.jpg',
        ),
      },
      id_document_back: {
        filename: 'id_back.jpg',
        content: readFileSync(process.env.OTC_ID_BACK_FILE || './id_back.jpg'),
      },
      address_proof: {
        filename: 'address_proof.pdf',
        content: readFileSync(
          process.env.OTC_ADDRESS_PROOF_FILE || './address_proof.pdf',
        ),
      },
    });

    console.log('Response: ', result);
  } catch (e) {
    console.error('Error in execution: ', e);
  }
}

submitOTCBankPersonalSupplementExample();
