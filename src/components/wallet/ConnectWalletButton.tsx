'use client';

import * as React from 'react';
import { Button, ButtonProps } from '@heroui/react';
import { useAppKit } from '@reown/appkit/react';

type ConnectWalletButtonProps = Omit<ButtonProps, 'isPending' | 'onClick'>;

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const [isConnecting, setIsConnecting] = React.useState(false);
  const { open } = useAppKit();

  const onConnectWalletClick = React.useCallback(async () => {
    try {
      setIsConnecting(true);

      await open();
    } catch (e) {
      console.error(e);
    } finally {
      setIsConnecting(false);
    }
  }, [open]);

  return (
    <Button fullWidth {...props} isPending={isConnecting} onClick={onConnectWalletClick}></Button>
  );
};
