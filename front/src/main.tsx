import './polyfills';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import { mainnet, polygon, polygonMumbai, polygonAmoy } from 'wagmi/chains';

const wagmiConfig = getDefaultConfig({
	appName: 'nft-minter',
	projectId: 'caaca4439d1b1c065e96ad12b4328020',
	chains: [mainnet, polygon, polygonMumbai, polygonAmoy],
	transports: {
		[mainnet.id]: http(),
		[polygon.id]: http(),
		[polygonMumbai.id]: http(),
		[polygonAmoy.id]: http()
	}
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<WagmiProvider config={wagmiConfig}>
		<QueryClientProvider client={queryClient}>
			<RainbowKitProvider>
				<App />
			</RainbowKitProvider>
		</QueryClientProvider>
	</WagmiProvider>
);
