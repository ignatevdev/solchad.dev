import * as React from 'react';
import { Button, ButtonProps, DangerIcon, SuccessIcon, toast } from '@heroui/react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { connection } from '@/solana/rpc';
import {
  getClaimAmmCashbackIx,
  getClaimMainCashbackIx,
  getCloseAtaIx,
  getCreateAtaIx,
} from '@/solana/instructions';
import type { Provider } from '@reown/appkit-adapter-solana/react';
import { useAppKitProvider } from '@reown/appkit/react';
import { useQueryClient } from '@tanstack/react-query';
import { CASHBACK_AMOUNT_QUERY_KEY, CashbackAmount } from '@/solana/query';

type ClaimButtonProps = Omit<ButtonProps, 'isPending' | 'onClick'> & {
  wallet: PublicKey;
};

export const ClaimButton = ({ wallet, ...rest }: ClaimButtonProps) => {
  const [isSending, setIsSending] = React.useState(false);
  const queryClient = useQueryClient();
  const { walletProvider } = useAppKitProvider<Provider>('solana');

  const onClaimClick = React.useCallback(async () => {
    const toastId = toast('Transaction pending...', {
      isLoading: true,
      timeout: 0,
    });

    try {
      setIsSending(true);

      const latestBlockhash = await connection.getLatestBlockhash();

      const transaction = new Transaction({
        feePayer: wallet,
        recentBlockhash: latestBlockhash?.blockhash,
      }).add(
        getCreateAtaIx(wallet),
        await getClaimMainCashbackIx(wallet),
        await getClaimAmmCashbackIx(wallet),
        await getCloseAtaIx(wallet)
      );

      const signature = await walletProvider.sendTransaction(transaction, connection);
      const link = `https://solscan.io/tx/${signature}`;

      // Manually refresh unclaimed amount in query cache
      queryClient.setQueryData([CASHBACK_AMOUNT_QUERY_KEY], (cache: CashbackAmount) => {
        return {
          ...cache,
          amount: 0n,
        };
      });

      toast('Transaction confirmed', {
        description: (
          <a href={link} target="_blank" rel="noopener noreferrer" className="link">
            View on solscan
          </a>
        ),
        indicator: <SuccessIcon className="text-accent" />,
        timeout: 6000,
      });
    } catch (e) {
      console.error(e);

      const description = e instanceof Error ? e.message : 'Unknown error';

      toast('Transaction failed', {
        description,
        indicator: <DangerIcon className="text-danger" />,
        timeout: 6000,
      });
    } finally {
      setIsSending(false);

      toast.close(toastId);
    }
  }, [queryClient, wallet, walletProvider]);

  return <Button fullWidth {...rest} isPending={isSending} onClick={onClaimClick} />;
};
