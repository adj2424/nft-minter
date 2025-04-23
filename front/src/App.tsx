import './App.css';
import { useState, useEffect } from 'react';
import Display from './Display';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { getContract, getContractSigner } from './utils/contract';

function App() {
  const [mintedCount, setMintedCount] = useState(10);
  const [viewState, setViewState] = useState('collection');
  const contract = getContract()!;

  const updateMintedCount = async () => {
    let count = await contract.getMintedCount();
    count = ethers.BigNumber.from(count).toNumber();
    setMintedCount(count);
  };

  const withdraw = async () => {
    try {
      const signer = await getContractSigner()!;
      await signer!.withdraw();
    } catch (e: any) {
      if (e.code === 4001) {
        return;
      }
      if (e.message.includes('missing provider')) {
        return alert('Please install MetaMask plugin');
      }
      return alert(JSON.stringify(e));
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
        <div className="row1">
          <div className="collection-name"> Collection: Silly Smiles</div>
          <div className="btn-rainbow">
            <ConnectButton />
          </div>
        </div>
        <div className="row2">
          <div className="collection-details">
            <div>
              Minted
              <span className="value">{`${mintedCount}/100 `}</span>
            </div>
            <div>
              Mint Price<span className="value">0.01 MATIC</span>
            </div>
            <div>
              Blockchain<span className="value">Polygon Amoy</span>
            </div>
          </div>
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
              onClick={async () => {
                try {
                  await getContractSigner()!;
                  setViewState('profile');
                } catch (e: any) {
                  if (e.code === 4001) {
                    return;
                  }
                  if (e.message.includes('missing provider')) {
                    return alert('Please install MetaMask plugin');
                  }
                  return alert(JSON.stringify(e));
                }
              }}
            >
              Profile
            </button>
            <button
              style={{ backgroundColor: btnBackground('about') }}
              className="btn-about"
              onClick={() => {
                setViewState('about');
              }}
            >
              About
            </button>
            <button className="btn-withdraw" onClick={withdraw}>
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <Display viewState={viewState} mintedCount={mintedCount} setMintedCount={setMintedCount} />
    </div>
  );
}

export default App;
