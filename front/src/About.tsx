import './About.css';
import { useEffect, useState } from 'react';

const About = () => {
  const [card1, setCard1] = useState(false);
  const [card2, setCard2] = useState(false);
  const [card3, setCard3] = useState(false);
  const [card4, setCard4] = useState(false);
  const [card5, setCard5] = useState(false);

  const isHovering = (hovering: boolean) => {
    return hovering ? '#4a4e69' : '#22223b';
  };
  return (
    <>
      <div
        className="card"
        onMouseEnter={() => {
          setCard1(true);
        }}
        onMouseLeave={() => setCard1(false)}
      >
        <div className="card-desc">
          <p>
            A NFT Minter for the Silly Smiles Collection. The minting process using the ERC721 standard on the Polygon
            blockchain from smart contracts. The NFT layers were designed with Figma and compiled with HashLips Art
            Engine.
          </p>
        </div>
        <div className="card-title" style={{ background: isHovering(card1) }}>
          Overview
        </div>
      </div>
      <div
        className="card"
        onMouseEnter={() => {
          setCard2(true);
        }}
        onMouseLeave={() => setCard2(false)}
      >
        <div className="card-desc">
          <p>
            The idea of a NFT minter first started from the large popularity of NFTs. I became curious about how dApps
            were created so I decided to make my own and learn new web3 frameworks and libraries.
          </p>
        </div>
        <div className="card-title" style={{ background: isHovering(card2) }}>
          Why I Created This
        </div>
      </div>
      <div
        className="card"
        onMouseEnter={() => {
          setCard3(true);
        }}
        onMouseLeave={() => setCard3(false)}
      >
        <div className="card-desc">
          <ul>
            <li>Polygon -- Layer 2 Ethereum blockchain</li>
            <li>Solidity -- Smart contract programming language </li>
            <li>Hardhat -- Ethereum development environment for smart contracts </li>
            <li>OpenZeppelin -- Smart contract library for ERC standards</li>
          </ul>
        </div>
        <div className="card-title" style={{ background: isHovering(card3) }}>
          Technologies Used
        </div>
      </div>
      <div
        className="card"
        onMouseEnter={() => {
          setCard4(true);
        }}
        onMouseLeave={() => setCard4(false)}
      >
        <div className="card-desc">
          <ul>
            <li>IPFS/NFT.Storage -- Decentralized storage for NFTs and metadata </li>
            <li>Alchemy -- Node Provider for Polygon </li>
            <li>MetaMask -- Crypto wallet for web3 and dApp transactions </li>
            <li>Frontend -- Ethers.js and React for user interface</li>
          </ul>
        </div>
        <div className="card-title" style={{ background: isHovering(card4) }}>
          Technologies Used Continued
        </div>
      </div>
      <div
        className="card"
        onMouseEnter={() => {
          setCard5(true);
        }}
        onMouseLeave={() => setCard5(false)}
      >
        <div className="card-desc">
          <div className="card-links">
            <button
              className="card-btn"
              onClick={() => {
                window.open('https://github.com/adj2424/nft-minter', '_blank');
              }}
            >
              Source Code
            </button>
            <button
              className="card-btn"
              onClick={() => {
                window.open('https://www.linkedin.com/in/alanjiang24/', '_blank');
              }}
            >
              LinkedIn
            </button>
            <button
              className="card-btn"
              onClick={() => {
                window.open('https://www.alanjiang.xyz/', '_blank');
              }}
            >
              Portfolio
            </button>
            <button
              className="card-btn"
              onClick={() => {
                window.open(
                  'https://amoy.polygonscan.com/address/0x21D3F8ab8421eDAECe415Af16586eb76CB549733',
                  '_blank'
                );
              }}
            >
              Contract Deployment
            </button>
          </div>
        </div>
        <div className="card-title" style={{ background: isHovering(card5) }}>
          Links
        </div>
      </div>
    </>
  );
};

export default About;
