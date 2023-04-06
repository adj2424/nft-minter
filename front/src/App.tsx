import './App.css';
import { useState, useEffect } from 'react';
import Display from './Display';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import getContract from './utils/contract';

function App() {
	const [mintedCount, setMintedCount] = useState(0);
	const contract = getContract()!;

	const count = async () => {
		let count = await contract.getMintedCount();
		count = ethers.BigNumber.from(count).toNumber();
		setMintedCount(count);
	};

	const withdraw = async () => {
		await contract.withdraw();
	};

	useEffect(() => {
		count();
	}, []);

	return (
		<div className="App">
			<div className="header-container">
				<div className="collection-name">
					<p>Collection: Smiley Faces</p>
				</div>
				<ConnectButton />
			</div>
			<div className="collection-details">
				<p>{` ${mintedCount}/100 minted`}</p>
				<p>0.001 Mint Price</p>
				<p>Chain Polygon</p>
				<button onClick={withdraw}>withdraw</button>
			</div>
			<Display mintedCount={mintedCount} setMintedCount={setMintedCount} />
		</div>
	);
}

export default App;
