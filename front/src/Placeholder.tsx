import { ethers } from 'ethers';
import getContract from './utils/contract';
import './Nft.css';

interface PlaceholderProps {
	metaDataCID: string | null;
	mintedCount: number;
	setMintedCount: Function;
}

const Placeholder = ({ metaDataCID, mintedCount, setMintedCount }: PlaceholderProps) => {
	const contract = getContract()!;
	const mintNFT = async () => {
		try {
			const uri = `ipfs://${metaDataCID}/${mintedCount + 1}.json`;
			await contract.payMint(uri, { value: ethers.utils.parseEther('.01') });
			setMintedCount((prev: number) => prev + 1);
			console.log('minted');
		} catch (e: any) {
			if (e.message.includes('unknown account #0')) {
				alert('Please connect your wallet to polygon mumbai');
			} else {
				alert(e);
			}
		}
	};

	return (
		<div className="nft">
			{/* place holder */}
			<img src={'../place-holder.png'} width="330" height="330" />
			<div className=".details-container ">
				<button className="place-holder-mint-btn" onClick={mintNFT}>
					<p className="place-holder-title">MINT 0.01 MATIC</p>
				</button>
			</div>
		</div>
	);
};

export default Placeholder;
