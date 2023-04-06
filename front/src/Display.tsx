import { useState, useEffect } from 'react';
import './Display.css';
import Nft from './Nft';
import Placeholder from './Placeholder';
import getContract from './utils/contract';

interface DisplayProps {
	mintedCount: number;
	setMintedCount: Function;
}

const Display = ({ mintedCount, setMintedCount }: DisplayProps) => {
	const [nfts, setNfts] = useState<number[]>([]);
	const [viewState, setViewState] = useState('collection');
	const contract = getContract()!;

	// shows all minted nft
	const setCollection = async () => {
		let temp: any = [];
		for (let i = 0; i < mintedCount; i++) {
			temp = [...temp, i + 1];
		}
		setNfts(temp);
	};

	// shows owned nft
	const setProfile = async () => {
		let temp: any = [];
		const tokens = await contract.getTokens();
		tokens.map((str: string) => {
			const nftID = Number(str.substring(str.lastIndexOf('/') + 1, str.lastIndexOf('.json')));
			temp = [...temp, nftID];
		});
		setNfts(temp);
	};

	useEffect(() => {
		// update nfts when new nft is minted
		if (viewState === 'collection') {
			setCollection();
		}
	}, [mintedCount]);

	useEffect(() => {
		const updateNFTs = async () => {
			viewState === 'collection' ? setCollection() : await setProfile();
		};
		updateNFTs();
	}, [viewState]);

	return (
		<>
			<button onClick={() => setViewState('collection')}>show collection</button>
			<button onClick={() => setViewState('profile')}>show profile</button>
			<div className="container">
				{viewState === 'collection' && <Placeholder mintedCount={mintedCount} setMintedCount={setMintedCount} />}
				{nfts.map((i: number) => {
					return <Nft key={i} id={i} />;
				})}
				{/* place holder nft*/}
			</div>
		</>
	);
};

export default Display;
