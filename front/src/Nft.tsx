import './Nft.css';
import { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

interface NftProps {
	id: number | null;
	metaDataCID: String;
	imgCID: String;
}

const Nft = ({ id, metaDataCID, imgCID }: NftProps) => {
	const [showOptions, setShowOptions] = useState(false);

	return (
		<div className="nft">
			<div className="img-container">
				<img src={`https://ipfs.io/ipfs/${imgCID}/${id}.png`} width="330" height="330" />
				{showOptions && (
					<div className="drop-down-btns">
						<button
							onClick={() => {
								window.open(`https://ipfs.io/ipfs/${metaDataCID}/${id}.json`);
							}}
						>
							show uri
						</button>
						<button
							onClick={() => {
								window.open(`https://ipfs.io/ipfs/${imgCID}/${id}.png`);
							}}
						>
							enhanced image
						</button>
					</div>
				)}
			</div>

			<div className="details-container">
				<p className="title">
					SILLY SMILES <span className="id">{`#${id}`}</span>
				</p>
				<button
					className="options"
					onClick={() => {
						console.log('hi');
						setShowOptions(prev => !prev);
					}}
				>
					<SlOptionsVertical color="white" />
				</button>
			</div>
		</div>
	);
};

export default Nft;
