import { readFileSync } from 'fs';

import { RestClient } from '../../../src/index.js'; // For an easy demonstration, import from the src dir. Normally though, see below to import from the npm installed version instead.
// import { RestClient } from 'gateio-api'; // Import the RestClient from the published version of this SDK, installed via NPM (npm install gateio-api)

const account = {
  key: process.env.API_KEY || 'yourApiHere',
  secret: process.env.API_SECRET || 'yourSecretHere',
};

const gateRestClient = new RestClient({
  apiKey: account.key,
  apiSecret: account.secret,
});

async function createOTCBankExample() {
  try {
    console.log('Using API keys:', account);

    // Path to account-opening proof (jpg/jpeg/png/pdf, max 4MB per Gate docs)
    const proofPath =
      process.env.OTC_PROOF_FILE || './account-opening-proof.pdf';
    const documentation_file = readFileSync(proofPath);

    const result = await gateRestClient.createOTCBank({
      bank_account_name: 'Account Holder Name',
      bank_name: 'Example Bank',
      bank_country: 'US',
      bank_address: '123 Example Street',
      iban: 'DE89370400440532013000',
      swift: 'COBADEFFXXX',
      remittance_line_number: '',
      agent_bank_name: '',
      agent_bank_swift: '',
      documentation_file: {
        filename: 'account-opening-proof.pdf',
        content: documentation_file,
      },
    });

    console.log('Response: ', result);
  } catch (e) {
    console.error('Error in execution: ', e);
  }
}

createOTCBankExample();
