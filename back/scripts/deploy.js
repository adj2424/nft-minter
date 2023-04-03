const { ethers } = require('hardhat');

async function main() {
	const nftFactory = await ethers.getContractFactory('myNFT');
	const nftContract = await nftFactory.deploy();
	await nftContract.deployed();
	console.log('NFT deployed to:', nftContract.address);
}
// deployed 0x6d338693f4F7Dd51118dccFE994F6dcc33EFFE54

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
