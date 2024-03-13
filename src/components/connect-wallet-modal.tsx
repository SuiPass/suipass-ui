import { EventNames, rootEventHandler } from '@/events';
import { ConnectModal } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';

export function ConnectWalletModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mapListeners = [
      rootEventHandler.on(EventNames.OPEN_CONNECT_WALLET_MODAL, () => {
        setOpen(true);
      }),
    ];

    return () => {
      rootEventHandler.removeListeners(mapListeners);
    };
  }, []);
  return <ConnectModal trigger={<></>} open={open} onOpenChange={(isOpen) => setOpen(isOpen)} />;
}
