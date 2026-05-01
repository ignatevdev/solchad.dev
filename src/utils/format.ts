import Decimal from 'decimal.js';

export const formatAddress = (address: string) => {
  const firstPart = address.slice(0, 4);
  const lastPart = address.slice(-4);
  return `${firstPart}...${lastPart}`;
};

export function formatTokenAmount(
  rawAmount: bigint,
  decimals: number,
  fractionDigits = decimals
): string {
  return new Decimal(rawAmount)
    .div(new Decimal(10).pow(decimals))
    .toFixed(fractionDigits)
    .replace(/\.?0+$/, ''); // trim trailing zeros
}
