import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig } from '@privy-io/wagmi';
import { http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

const queryClient = new QueryClient();

const genlayerTestnet = {
  id: 2026,
  name: 'GenLayer Testnet',
  nativeCurrency: { name: 'GenLayer', symbol: 'GEN', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.genlayer.com'] },
  },
} as const;

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, genlayerTestnet as any],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [2026]: http(),
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID || "cm0b7yv0h0000abc123456789"; // fallback

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#111111',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        } as any,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
