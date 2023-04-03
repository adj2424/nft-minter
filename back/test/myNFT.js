const { ethers } = require('hardhat');

async function main() {
	const nftFactory = await ethers.getContractFactory('myNFT');
	const nftContract = await nftFactory.deploy();
	await nftContract.deployed();
	console.log('NFT deployed to:', nftContract.address);

	// first signer is the owner because initially it is the deployer
	const [owner, signer1, signer2] = await ethers.getSigners();

	const uri1 = 'https://ipfs.io/ipfs/bafybeieourdi7wzsc6g357ekbxe3fhw3mfg4uzgjzidwchxv2e54vi5luq/1.json';

	// signer will mint NFT
	await nftContract.connect(signer1).payMint(uri1, { value: ethers.utils.parseEther('0.1') });

	// check balance
	console.log('---after txn---');
	balance = await ethers.provider.getBalance(signer1.address);
	console.log('signer1 balance:', ethers.utils.formatEther(balance));
	balance = await ethers.provider.getBalance(nftContract.address);
	console.log('contract balance:', ethers.utils.formatEther(balance));

	// check who owns the NFT
	let uris = await nftContract.connect(signer1).getTokens();
	console.log('signer1', uris);
	uris = await nftContract.connect(signer2).getTokens();
	console.log('signer2', uris);

	// withdraw funds
	//await nftContract.connect(signer1).withdraw();
	await nftContract.connect(owner).withdraw();

	// check balance
	console.log('---after withdraw---');
	balance = await ethers.provider.getBalance(owner.address);
	console.log('owner balance:', ethers.utils.formatEther(balance));
	balance = await ethers.provider.getBalance(signer1.address);
	console.log('signer1 balance:', ethers.utils.formatEther(balance));
	balance = await ethers.provider.getBalance(nftContract.address);
	console.log('contract balance:', ethers.utils.formatEther(balance));

	// get minted count
	let count = await nftContract.connect(signer1).getMintedCount();
	console.log('contract minted count:', count);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
