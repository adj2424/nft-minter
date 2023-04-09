import { ethers } from 'ethers';
import { abi } from './myNFT.json';

const getContract = () => {
	try {
		const { ethereum } = window;
		if (!ethereum) return;
		const provider = new ethers.providers.Web3Provider(ethereum as ethers.providers.ExternalProvider);
		const signer = provider.getSigner();
		const contract = new ethers.Contract('0x35437925f7158B0c2102b87D378326264Ab178c1', abi, signer);
		return contract;
	} catch (e) {
		console.log(e);
	}
};

export default getContract;
