import './App.css';
import { useState, useEffect } from 'react';
import Display from './Display';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import getContract from './utils/contract';

function App() {
	const [mintedCount, setMintedCount] = useState(0);
	const [viewState, setViewState] = useState('collection');
	const contract = getContract()!;

	const getMintedCount = async () => {
		let count = await contract.getMintedCount();
		count = ethers.BigNumber.from(count).toNumber();
		setMintedCount(count);
	};

	const withdraw = async () => {
		try {
			await contract.withdraw();
		} catch (e) {
			alert(e);
		}
	};

	useEffect(() => {
		getMintedCount();
	}, []);

	return (
		<div className="App">
			<div className="header-container">
				<div className="collection-name">
					<h1>Collection: Smiley Faces</h1>
				</div>
				<button onClick={withdraw}>withdraw</button>
				<ConnectButton />
			</div>
			<div className="collection-details">
				<p>
					Minted
					<span className="value">{`${mintedCount}/100 `}</span>
				</p>
				<p>
					Mint Price<span className="value">0.001 MATIC</span>
				</p>
				<p>
					Chain<span className="value">Polygon</span>
				</p>
				<div className="button-group">
					<button
						onClick={() => {
							setViewState('collection');
							getMintedCount();
						}}
					>
						show collection
					</button>
					<button onClick={() => setViewState('profile')}>show profile</button>
				</div>
			</div>
			<Display viewState={viewState} mintedCount={mintedCount} setMintedCount={setMintedCount} />
		</div>
	);
}

export default App;
