'use client';

import * as React from 'react';
import { useAppKitAccount } from '@reown/appkit/react';

import { ConnectForm } from './ConnectForm';
import { ClaimForm } from './ClaimForm';
import { PublicKey } from '@solana/web3.js';

export const CashbackClaim = () => {
  const [observedAddress, setObservedAddress] = React.useState<string | null>(null);
  const { isConnected, address: connectedAddress } = useAppKitAccount();

  const walletAddress = React.useMemo(() => {
    const address = connectedAddress || observedAddress;

    if (!address) {
      return null;
    }

    return new PublicKey(address);
  }, [connectedAddress, observedAddress]);

  // Reset observed wallet if wallet was connected
  React.useEffect(() => {
    if (isConnected) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setObservedAddress(null);
    }
  }, [isConnected]);

  const onObserveWallet = React.useCallback((walletAddress: string) => {
    setObservedAddress(walletAddress);
  }, []);

  const onResetWallet = React.useCallback(() => {
    setObservedAddress(null);
  }, []);

  if (!walletAddress) {
    return <ConnectForm onObserveWallet={onObserveWallet} />;
  }

  return (
    <ClaimForm walletAddress={walletAddress} isConnected={isConnected} onReset={onResetWallet} />
  );
};
