import './Nft.css';
import { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

interface NftProps {
	id: number | null;
}

const Nft = ({ id }: NftProps) => {
	const [showOptions, setShowOptions] = useState(false);

	return (
		<div className="nft">
			<div className="img-container">
				<img
					src={`https://ipfs.io/ipfs/bafybeiez5abohaxwpnzgdfub5keayojbfpx7wwr7nsaqef7aqe6pilf63y/${id}.png`}
					width="330"
					height="330"
				/>
				{showOptions && (
					<div className="drop-down-btns">
						<button
							onClick={() => {
								window.open(
									`https://ipfs.io/ipfs/bafybeihcyihxxmlvwgmc35mmw7iarihtm536lsh7x67rg3glhqkaejqcoa/${id}.json`
								);
							}}
						>
							show uri
						</button>
						<button
							onClick={() => {
								window.open(
									`https://ipfs.io/ipfs/bafybeiez5abohaxwpnzgdfub5keayojbfpx7wwr7nsaqef7aqe6pilf63y/${id}.png`
								);
							}}
						>
							enhanced image
						</button>
					</div>
				)}
			</div>

			<div className="details-container">
				<p className="title">{`SMILEY FACE # ${id}`}</p>
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
