import { APPKIT_PROJECT_ID } from '@/config';
import { createAppKit } from '@reown/appkit/react';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import { solana } from '@reown/appkit/networks';

const solanaWeb3JsAdapter = new SolanaAdapter();

const metadata = {
  name: 'Pump.Fun Cashback Claim',
  description: '',
  url: 'https://pumpfun-claim.com',
  icons: [],
};

export const initializeAppKit = () => {
  createAppKit({
    projectId: APPKIT_PROJECT_ID,
    metadata,
    themeMode: 'dark',
    networks: [solana],
    adapters: [solanaWeb3JsAdapter],
    features: {
      analytics: true,
    },
    themeVariables: {
      '--w3m-accent': '#000000',
    },
  });
};
