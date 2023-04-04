import { ethers } from 'ethers';
import { abi } from './myNFT.json';

const getContract = () => {
	try {
		const { ethereum } = window;
		if (!ethereum) return;
		const provider = new ethers.providers.Web3Provider(ethereum as ethers.providers.ExternalProvider);
		const signer = provider.getSigner();
		const contract = new ethers.Contract('0x6d338693f4F7Dd51118dccFE994F6dcc33EFFE54', abi, signer);
		return contract;
	} catch (e) {
		console.log(e);
	}
};

export default getContract;
