import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { rootStore } from '@/stores';
import CloseIcon from '@/assets/icons/close.svg';
import { useSelectWalletDialog } from '@/hooks';
import { Button } from './ui';

export function SelectWalletDialog() {
  const open = rootStore.dialog.use.selectWalletDialogOpen();
  const { listWallets } = useSelectWalletDialog();

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        rootStore.dialog.set.selectWalletDialogOpen(open);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row justify-between items-center">
          <AlertDialogTitle className="block">Select Your Wallet</AlertDialogTitle>
          <img
            src={CloseIcon}
            className="w-8 h-8 cursor-pointer"
            style={{ margin: 0 }}
            onClick={() => {
              rootStore.dialog.set.selectWalletDialogOpen(false);
            }}
          />
        </AlertDialogHeader>
        <div className="flex flex-col gap-8">
          {listWallets.map((wallet) => (
            <div className="flex justify-between" key={wallet.name}>
              <div className="flex gap-4 items-center">
                <img src={wallet.icon} className="w-8 h-8" />
                <div className="font-semibold">{wallet.name}</div>
              </div>
              <Button
                size="default"
                className="min-w-32"
                onClick={() => {
                  wallet.connect();
                }}
              >
                {wallet.available ? 'Connect' : 'Get'}
              </Button>
            </div>
          ))}
        </div>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
