'use client';

import { Toast } from '@heroui/react';

import { initializeAppKit } from '@/solana/appKit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

initializeAppKit();

const queryClient = new QueryClient();

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast.Provider width={300} placement="bottom end" />

      {children}
    </QueryClientProvider>
  );
};
