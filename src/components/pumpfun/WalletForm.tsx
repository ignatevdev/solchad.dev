import { Button, Input } from '@heroui/react';
import { cn } from '@heroui/styles';
import { PublicKey } from '@solana/web3.js';
import * as React from 'react';

type WalletFormProps = {
  className?: string;

  onSubmit: (walletAddress: string) => void;
};

export const WalletForm = ({ className, onSubmit }: WalletFormProps) => {
  const [inputValue, setInputValue] = React.useState('');

  const isValid = React.useMemo(() => {
    try {
      new PublicKey(inputValue);
      return true;
    } catch {
      return false;
    }
  }, [inputValue]);

  const onFormSubmit: React.SubmitEventHandler = React.useCallback(
    (e) => {
      e.preventDefault();

      if (!isValid) {
        return;
      }

      onSubmit(inputValue);
      setInputValue('');
    },
    [isValid, onSubmit, inputValue]
  );

  return (
    <form className={cn('flex flex-col w-full md:w-100 gap-2', className)} onSubmit={onFormSubmit}>
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className="text-center focus:placeholder:text-transparent"
        placeholder="Wallet address"
      />

      <Button type="submit" isDisabled={!isValid} variant="tertiary" className="w-full">
        Check unclaimed amount
      </Button>
    </form>
  );
};
