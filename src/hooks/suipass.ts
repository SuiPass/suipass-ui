import { PACKAGE_ADDR, SUIPASS_ADDR } from '@/cfg';
import { useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

export function useSubmitRequest() {
  const curAcct = useCurrentAccount();
  const { mutate } = useSignAndExecuteTransactionBlock();
  if (curAcct === null)
    return {
      available: false,
      mutate: null
    };

  return {
    available: curAcct !== null,
    mutate: (providerId: string, proof: string): Promise<any> => {
      const p = new Promise((resolve, reject) => {
        const txb = new TransactionBlock();
        txb.moveCall({
          arguments: [
            // Id of Suipass (shared object), TODO: this is static you can set it in env or fetch from backend?
            txb.object(SUIPASS_ADDR),
            // Provider Id, can get from fetching the SuiPass object and take a look at the providers field.
            txb.pure.address(providerId),
            // Proof
            txb.pure.string(proof),
            // Coin Id, id of the Sui token
            txb.object('0x4eb18852e2d3f40fa328123d321c48f4c8476f92790c5eaf29da8cda67bc53e4')
          ],
          target: `${PACKAGE_ADDR}::suipass::submit_request_v1`
        });

        mutate(
          {
            transactionBlock: txb,
            options: {
              showEffects: true
            }
          },
          {
            onSuccess: (tx) => {
              console.log('[S] suipass::submit_request', JSON.stringify(tx));
              resolve(tx);
            },
            onError: (e) => {
              console.log('[E] suipass::submit_request', JSON.stringify(e));
              reject(e);
            }
          }
        );
      });

      return p;
    }
  };
}
