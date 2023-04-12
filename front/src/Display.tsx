import { useState, useEffect } from 'react';
import './Display.css';
import Nft from './Nft';
import Placeholder from './Placeholder';
import { getContract } from './utils/contract';

interface DisplayProps {
	mintedCount: number;
	setMintedCount: Function;
	viewState: string;
}

const Display = ({ mintedCount, setMintedCount, viewState }: DisplayProps) => {
	const [nfts, setNfts] = useState<number[]>([]);
	const [metaDataCID, setMetaDataCID] = useState<string | null>(null);
	const [imgCID, setImgCID] = useState<string | null>(null);
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

	useEffect(() => {
		const getCID = async () => {
			const newMetaDataCID: string = await contract.getMetaData();
			const newImgCID: string = await contract.getImgData();
			setMetaDataCID(newMetaDataCID);
			setImgCID(newImgCID);
		};
		getCID();
	}, [contract]);

	return (
		<div className="container">
			{/* place holder nft*/}
			{viewState === 'collection' && (
				<Placeholder metaDataCID={metaDataCID} mintedCount={mintedCount} setMintedCount={setMintedCount} />
			)}
			{nfts.map((i: number) => {
				return <Nft key={i} id={i} metaDataCID={metaDataCID} imgCID={imgCID} />;
			})}
		</div>
	);
};

export default Display;
