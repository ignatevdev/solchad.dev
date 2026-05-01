import { cn, Separator } from '@heroui/react';
import { ConnectWalletButton } from '@/components/wallet';
import { WalletForm } from './WalletForm';

type ConnectFormProps = {
  className?: string;
  onObserveWallet: (walletAddress: string) => void;
};

export const ConnectForm = ({ className, onObserveWallet }: ConnectFormProps) => {
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <ConnectWalletButton className="w-full">Connect wallet</ConnectWalletButton>

      <div className="flex items-center w-full gap-3">
        <Separator className="grow w-auto" />

        <span className="text-gray-500 shrink-0">or</span>

        <Separator className="grow w-auto" />
      </div>

      <WalletForm onSubmit={onObserveWallet} />
    </div>
  );
};
