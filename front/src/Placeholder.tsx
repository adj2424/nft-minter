import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import getContract from './utils/contract';
import './Nft.css';

interface PlaceholderProps {
	mintedCount: number;
	setMintedCount: Function;
}

const Placeholder = ({ mintedCount, setMintedCount }: PlaceholderProps) => {
	const contract = getContract()!;
	const mintNFT = async () => {
		const uri = `ipfs://bafybeihcyihxxmlvwgmc35mmw7iarihtm536lsh7x67rg3glhqkaejqcoa/${mintedCount + 1}.json`;
		console.log(uri);
		await contract.payMint(uri, { value: ethers.utils.parseEther('.001') });
		setMintedCount((prev: number) => prev + 1);
		console.log('minted');
	};

	return (
		<div className="nft">
			{/* place holder */}
			<img src={'../place-holder.png'} width="310" height="310" />
			<div className="content-bar">
				<div className="mint">
					<button onClick={mintNFT}>Mint 0.001 eth</button>
				</div>
			</div>
		</div>
	);
};

export default Placeholder;
