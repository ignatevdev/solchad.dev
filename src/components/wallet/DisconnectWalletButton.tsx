'use client';

import * as React from 'react';
import { Button, ButtonProps } from '@heroui/react';
import { useDisconnect } from '@reown/appkit/react';

type DisconnectWalletButtonProps = Omit<ButtonProps, 'isPending' | 'onClick'>;

export const DisconnectWalletButton = (props: DisconnectWalletButtonProps) => {
  const [isDisconnecting, setIsDisconnecting] = React.useState(false);
  const { disconnect } = useDisconnect();

  const onDisconnectWalletClick = React.useCallback(async () => {
    try {
      setIsDisconnecting(true);

      await disconnect();
    } catch (e) {
      console.error(e);
    } finally {
      setIsDisconnecting(false);
    }
  }, [disconnect]);

  return (
    <Button
      variant="ghost"
      fullWidth
      {...props}
      isPending={isDisconnecting}
      onClick={onDisconnectWalletClick}
    />
  );
};
