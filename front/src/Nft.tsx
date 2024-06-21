import './Nft.css';
import { useEffect, useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

interface NftProps {
	id: number | null;
	metaDataCID: string | null;
	imgCID: string | null;
}

const Nft = ({ id, metaDataCID, imgCID }: NftProps) => {
	const [showOptions, setShowOptions] = useState(false);
	const [metaDataURL, setMetaDataUrl] = useState('../place-holder.png');
	const [imgURL, setImgUrl] = useState('../place-holder.png');

	useEffect(() => {
		if (metaDataCID === null || imgCID === null) return;
		setMetaDataUrl(`https://${metaDataCID}.ipfs.nftstorage.link/${id}.json`);
		setImgUrl(`https://${imgCID}.ipfs.nftstorage.link/${id}.png`);
	}, [metaDataCID, imgCID]);

	return (
		<div className="nft">
			<div className="img-container">
				<img src={imgURL} width="330" height="330" />
				{showOptions && (
					<div className="drop-down-btns">
						<button
							onClick={() => {
								window.open(metaDataURL);
							}}
						>
							show uri
						</button>
						<button
							onClick={() => {
								window.open(imgURL);
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
