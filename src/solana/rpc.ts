import { Connection } from '@solana/web3.js';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;

export const connection = new Connection(RPC_URL, {
  commitment: 'confirmed',
});
