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

	const updateMintedCount = async () => {
		let count = await contract.getMintedCount();
		count = ethers.BigNumber.from(count).toNumber();
		setMintedCount(count);
	};

	const withdraw = async () => {
		try {
			await contract.withdraw();
		} catch (e: any) {
			if (e.message.includes('unknown account #0')) {
				alert('Please connect your wallet to polygon mumbai');
			} else {
				alert(e);
			}
		}
	};

	const btnBackground = (state: String) => {
		return viewState === state ? '#545492' : '#22223b';
	};

	useEffect(() => {
		updateMintedCount();
	}, []);

	return (
		<div className="App">
			<div className="header-container">
				<h1 className="collection-name"> Collection: Silly Smiles</h1>
				<div className="btn-rainbow">
					<ConnectButton />
				</div>
			</div>
			<div className="collection-details">
				<p>
					Minted
					<span className="value">{`${mintedCount}/100 `}</span>
				</p>
				<p>
					Mint Price<span className="value">0.01 MATIC</span>
				</p>
				<p>
					Blockchain<span className="value">Polygon Mumbai</span>
				</p>
				<div className="button-group">
					<button
						style={{ backgroundColor: btnBackground('collection') }}
						className="btn-collection"
						onClick={() => {
							setViewState('collection');
							updateMintedCount();
						}}
					>
						Collection
					</button>
					<button
						style={{ backgroundColor: btnBackground('profile') }}
						className="btn-profile"
						onClick={() => setViewState('profile')}
					>
						Profile
					</button>
					<button className="btn-withdraw" onClick={withdraw}>
						Withdraw
					</button>
				</div>
			</div>
			<Display viewState={viewState} mintedCount={mintedCount} setMintedCount={setMintedCount} />
		</div>
	);
}

export default App;
