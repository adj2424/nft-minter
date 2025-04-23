const { ethers } = require('hardhat');

/**
 *
 * deprecated mumbai testnet
 * deployed 0x35437925f7158B0c2102b87D378326264Ab178c1
 * json - https://ipfs.io/ipfs/bafybeibgrkgbicri7niahu3gsc4lcspwvctcqvrpjc23cccqq3yi7xodza/
 * img - https://ipfs.io/ipfs/bafybeihindw3bp6mimufny6bj7csisbbayz76yb7yd3me7bzli5nl2ybxi/
 *
 * Amoy ---
 * deployed 0x21D3F8ab8421eDAECe415Af16586eb76CB549733
 * json - https://bafybeibgrkgbicri7niahu3gsc4lcspwvctcqvrpjc23cccqq3yi7xodza.ipfs.nftstorage.link/
 * img - https://bafybeihindw3bp6mimufny6bj7csisbbayz76yb7yd3me7bzli5nl2ybxi.ipfs.nftstorage.link/
 */

async function main() {
  const nftFactory = await ethers.getContractFactory('myNFT');
  const metaCID = 'bafybeibgrkgbicri7niahu3gsc4lcspwvctcqvrpjc23cccqq3yi7xodza';
  const imgCID = 'bafybeihindw3bp6mimufny6bj7csisbbayz76yb7yd3me7bzli5nl2ybxi';
  const nftContract = await nftFactory.deploy(metaCID, imgCID);
  await nftContract.deployed();
  console.log('NFT deployed to:', nftContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

