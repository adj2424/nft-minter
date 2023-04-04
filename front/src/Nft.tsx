import './Nft.css';

interface NftProps {
	id: number | null;
}

const Nft = ({ id }: NftProps) => {
	return (
		<div className="nft">
			<img
				src={`https://ipfs.io/ipfs/bafybeiez5abohaxwpnzgdfub5keayojbfpx7wwr7nsaqef7aqe6pilf63y/${id}.png`}
				width="310"
				height="310"
			/>
			<div className="content-bar">
				<div className="id">{`Smiley Face # ${id}`}</div>
				<div className="details">
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
							window.open(`https://ipfs.io/ipfs/bafybeiez5abohaxwpnzgdfub5keayojbfpx7wwr7nsaqef7aqe6pilf63y/${id}.png`);
						}}
					>
						enhanced image
					</button>
				</div>
			</div>
		</div>
	);
};

export default Nft;
