import { useState, useEffect } from 'react';
import './Display.css';
import Nft from './Nft';
import Placeholder from './Placeholder';

interface DisplayProps {
	mintedCount: number;
	setMintedCount: Function;
}

const Display = ({ mintedCount, setMintedCount }: DisplayProps) => {
	const [nfts, setNfts] = useState<any>([]);

	useEffect(() => {
		//creates an array of nft id from 1 to mintedCount
		let temp: any = [];
		for (let i = 0; i < mintedCount; i++) {
			temp = [...temp, i + 1];
		}
		setNfts(temp);
		//console.log(`https://ipfs.io/ipfs/bafybeiez5abohaxwpnzgdfub5keayojbfpx7wwr7nsaqef7aqe6pilf63y/1.png`);
	}, [mintedCount]);

	return (
		<>
			<div className="container">
				{nfts.map((i: number) => {
					return <Nft key={i} id={i} />;
				})}
				{/* place holder nft*/}
				<Placeholder mintedCount={mintedCount} setMintedCount={setMintedCount} />
			</div>
		</>
	);
};

export default Display;
