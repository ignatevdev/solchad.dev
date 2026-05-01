import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddressSync, NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token';

const USER_ACCUMULATOR_SEED = Buffer.from('user_volume_accumulator', 'utf-8');

/**
  Derives UserVolumeAccumulator account PDA

  https://github.com/pump-fun/pump-public-docs/blob/main/docs/PUMP_CASHBACK_README.md
*/
export const getUserAccumulatorPda = (
  walletAddress: PublicKey,
  programAddress: PublicKey
): PublicKey => {
  const [pda] = PublicKey.findProgramAddressSync(
    [USER_ACCUMULATOR_SEED, walletAddress.toBuffer()],
    programAddress
  );
  return pda;
};

/**
  Derives Cashback account PDA

  https://github.com/pump-fun/pump-public-docs/blob/main/docs/PUMP_CASHBACK_README.md
*/
export const getUserAccumulatorCashbackPda = (
  walletAddress: PublicKey,
  programAddress: PublicKey
): PublicKey => {
  const userAccumulatorPda = getUserAccumulatorPda(walletAddress, programAddress);
  return getAssociatedTokenAddressSync(NATIVE_MINT, userAccumulatorPda, true, TOKEN_PROGRAM_ID);
};

export const getUserWsolAta = (walletAddress: PublicKey): PublicKey => {
  return getAssociatedTokenAddressSync(NATIVE_MINT, walletAddress);
};
