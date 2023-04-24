import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains([mainnet, polygon, polygonMumbai], [publicProvider()]);
const { connectors } = getDefaultWallets({
	appName: 'nft-minter',
	chains
});
const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<WagmiConfig client={wagmiClient}>
		<RainbowKitProvider chains={chains}>
			<App />
		</RainbowKitProvider>
	</WagmiConfig>
);
