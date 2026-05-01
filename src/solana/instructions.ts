import { PUMP_AMM_PROGRAM_ID, PUMP_SDK } from '@pump-fun/pump-sdk';
import { OFFLINE_PUMP_AMM_PROGRAM } from '@pump-fun/pump-swap-sdk';
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createCloseAccountInstruction,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { getUserAccumulatorPda, getUserWsolAta } from './pda';

export const getCreateAtaIx = (owner: PublicKey) => {
  const userWsolTokenAccount = getUserWsolAta(owner);

  return createAssociatedTokenAccountIdempotentInstruction(
    owner,
    userWsolTokenAccount,
    owner,
    NATIVE_MINT,
    TOKEN_PROGRAM_ID
  );
};

export const getCloseAtaIx = (owner: PublicKey) => {
  const userWsolTokenAccount = getUserWsolAta(owner);

  return createCloseAccountInstruction(userWsolTokenAccount, owner, owner);
};

export const getClaimMainCashbackIx = (owner: PublicKey) => {
  return PUMP_SDK.claimCashbackInstruction({ user: owner });
};

export const getClaimAmmCashbackIx = (owner: PublicKey) => {
  const userVolumeAccumulator = getUserAccumulatorPda(owner, PUMP_AMM_PROGRAM_ID);
  const userWsolTokenAccount = getUserWsolAta(owner);
  const quoteMint = NATIVE_MINT;
  const quoteTokenProgram = TOKEN_PROGRAM_ID;

  // Public SDK doesn't expose a wrapper for claim_cashback,
  // so we use anchor's methods instead
  return (
    OFFLINE_PUMP_AMM_PROGRAM.methods
      .claimCashback()
      // For some reason if we don't provide all accounts, the PDA generation fails
      // with ciruclar error
      .accountsPartial({
        user: owner,
        userVolumeAccumulator,
        userWsolTokenAccount,
        quoteMint,
        quoteTokenProgram,
      })
      .instruction()
  );
};
