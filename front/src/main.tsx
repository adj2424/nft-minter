import './polyfills';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, polygon, polygonMumbai],
	[publicProvider()]
);
const { connectors } = getDefaultWallets({
	appName: 'nft-minter',
	projectId: 'caaca4439d1b1c065e96ad12b4328020',
	chains
});
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
	webSocketPublicClient
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<WagmiConfig config={wagmiConfig}>
		<RainbowKitProvider chains={chains}>
			<App />
		</RainbowKitProvider>
	</WagmiConfig>
);
