import { EventNames, rootEventHandler } from '@/events';
import { ConnectModal } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';

export function ConnectWalletModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    rootEventHandler.on(EventNames.OPEN_CONNECT_WALLET_MODAL, () => {
      setOpen(true);
    });

    return () => {
      rootEventHandler.remove(EventNames.OPEN_CONNECT_WALLET_MODAL);
    };
  }, []);
  return <ConnectModal trigger={<></>} open={open} onOpenChange={(isOpen) => setOpen(isOpen)} />;
}
