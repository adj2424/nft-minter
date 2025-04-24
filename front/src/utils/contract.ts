import { JsonRpcProvider, Contract, BrowserProvider } from 'ethers';
import { abi } from './myNFT.json';

// get contract without signer
// signer not needed for read-only calls
export const getContract = () => {
  const provider = new JsonRpcProvider('https://polygon-amoy.g.alchemy.com/v2/ZdlfTbt8u-YXZl9XS48vSU0zjmHUMiE7');

  const contract = new Contract('0x21D3F8ab8421eDAECe415Af16586eb76CB549733', abi, provider);
  return contract;
};

// get contract with metamask signer
// singer needed for transactions
export const getContractSigner = async () => {
  const { ethereum } = window;
  const provider = new BrowserProvider(ethereum);
  // ask metamask to connect
  const signer = await provider.getSigner();
  const contract = new Contract('0x21D3F8ab8421eDAECe415Af16586eb76CB549733', abi, signer);
  return contract;
};
