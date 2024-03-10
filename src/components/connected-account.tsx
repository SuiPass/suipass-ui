import { useCurrentAccount } from '@mysten/dapp-kit';

export function ConnectedAccount() {
  const account = useCurrentAccount();

  if (!account) {
    return null;
  }

  return <div>Connected to {account.address}</div>;
}
