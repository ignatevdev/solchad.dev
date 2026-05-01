'use client';

import * as React from 'react';
import { useCashbackAmountQuery } from '@/solana/query';
import { formatAddress, formatTokenAmount } from '@/utils/format';
import { Button, Card, Chip, cn, Skeleton } from '@heroui/react';
import { PublicKey } from '@solana/web3.js';
import { ClaimButton } from './ClaimButton';
import { ConnectWalletButton, DisconnectWalletButton } from '@/components/wallet';

type ClaimFormProps = {
  walletAddress: PublicKey;
  isConnected?: boolean;
  className?: string;
  onReset: () => void;
};

export const ClaimForm = ({ walletAddress, isConnected, className, onReset }: ClaimFormProps) => {
  const { data: cashbackAmount, isFetched: isCashbackFetched } =
    useCashbackAmountQuery(walletAddress);

  const formattedAddress = formatAddress(walletAddress.toBase58());
  const formattedAmount = cashbackAmount
    ? formatTokenAmount(cashbackAmount.amount, cashbackAmount.decimals)
    : null;
  const isClaimDisabled = !isConnected || !cashbackAmount || cashbackAmount.amount === 0n;

  return (
    <Card className={cn('w-70', className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-md text-foreground/70">Unclaimed amount</h2>

        <Chip>{formattedAddress}</Chip>
      </div>

      <div className="text-xl font-bold flex justify-between items-center">
        <div className="text-foreground/50 flex items-center gap-1">
          {isCashbackFetched ? (
            <span>{formattedAmount}</span>
          ) : (
            <Skeleton className="h-4 w-30 rounded" />
          )}
        </div>

        <span className="flex items-center">
          SOL
          <img className="w-10 h-10" src="/assets/solana-logo.svg" alt="Solana" />
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {isConnected ? (
          <React.Fragment>
            <ClaimButton wallet={walletAddress} isDisabled={isClaimDisabled}>
              Claim
            </ClaimButton>

            <DisconnectWalletButton>Disconnect</DisconnectWalletButton>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ConnectWalletButton>Connect wallet</ConnectWalletButton>

            <Button variant="ghost" fullWidth onClick={onReset}>
              Back
            </Button>
          </React.Fragment>
        )}
      </div>
    </Card>
  );
};
