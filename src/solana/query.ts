import { PUMP_AMM_PROGRAM_ID, PUMP_PROGRAM_ID } from '@pump-fun/pump-sdk';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { getUserAccumulatorCashbackPda } from './pda';
import { connection } from './rpc';

export const WSOL_DECIMALS = 9;

export const CASHBACK_AMOUNT_QUERY_KEY = 'cashbackAmount';

export type CashbackAmount = {
  amount: bigint;
  decimals: number;
};

export const useCashbackAmountQuery = (address: PublicKey) => {
  return useQuery({
    queryKey: [CASHBACK_AMOUNT_QUERY_KEY],
    queryFn: async (): Promise<CashbackAmount> => {
      try {
        const mainCashbackAta = getUserAccumulatorCashbackPda(address, PUMP_PROGRAM_ID);
        const ammCashbackAta = getUserAccumulatorCashbackPda(address, PUMP_AMM_PROGRAM_ID);

        const [mainCashbackAmount, ammCashbackAmount] = await Promise.all([
          connection
            .getTokenAccountBalance(mainCashbackAta)
            .then((result) => BigInt(result.value.amount))
            .catch(() => 0n),
          connection
            .getTokenAccountBalance(ammCashbackAta)
            .then((result) => BigInt(result.value.amount))
            .catch(() => 0n),
        ]);

        const amount = mainCashbackAmount + ammCashbackAmount;
        const decimals = WSOL_DECIMALS;

        return {
          amount,
          decimals,
        };
      } catch (e) {
        console.error(e);

        throw e;
      }
    },
    staleTime: 60 * 1000,
  });
};
