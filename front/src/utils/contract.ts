import { ethers } from 'ethers';
import { abi } from './myNFT.json';

// get contract without signer
// signer not needed for read-only calls
export const getContract = () => {
	const provider = new ethers.providers.JsonRpcProvider(
		'https://polygon-mumbai.g.alchemy.com/v2/ZdlfTbt8u-YXZl9XS48vSU0zjmHUMiE7'
	);

	const contract = new ethers.Contract('0x35437925f7158B0c2102b87D378326264Ab178c1', abi, provider);
	return contract;
};

// get contract with metamask signer
// singer needed for transactions
export const getContractSigner = async () => {
	const { ethereum } = window;
	const provider = new ethers.providers.Web3Provider(ethereum as ethers.providers.ExternalProvider);
	// ask metamask to connect
	await provider.send('eth_requestAccounts', []);
	const signer = provider.getSigner();
	const contract = new ethers.Contract('0x35437925f7158B0c2102b87D378326264Ab178c1', abi, signer);
	return contract;
};
