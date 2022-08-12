import fs from 'fs';
require('dotenv').config();
const path = require('path');

async function updateFrontEnd(deployedContractAddress) {
  console.log('updating files');

  console.log('updating contractAddress on FE...');
  const data = `const contractAddress = "${deployedContractAddress}";\nexport default contractAddress; `;
  const contractAddrPath = path.resolve(
    __dirname,
    '../liliansListContractAddress.ts'
  );

  fs.writeFileSync(contractAddrPath, data, (err) => {
    if (err) {
      console.error('ERROR: contract address not updated');
      throw err;
    }
  });
  console.log(
    `Successfully updated contract address to ${deployedContractAddress}`
  );
  return deployedContractAddress;
}

module.exports = { updateFrontEnd };
