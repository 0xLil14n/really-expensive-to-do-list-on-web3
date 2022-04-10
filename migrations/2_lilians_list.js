const NFT = artifacts.require('LiliansList');

module.exports = async (deployer, network, [defaultAccount]) => {
  await deployer.deploy(NFT, [
    'cry',
    'stop crying',
    'get abacus job',
    'make soju martini',
  ]);
  let nft = await NFT.deployed();
};
