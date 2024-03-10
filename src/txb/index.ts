import { GITHUB_PROVIDER_ID, PACKAGE_ADDR, SUIPASS_ADDR } from '@/cfg';
import { TransactionBlock } from '@mysten/sui.js/transactions';

export function newUserTxb(info: string): TransactionBlock {
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [txb.pure.string(info)],
    target: `${PACKAGE_ADDR}::user::new`
  });
  return txb;
}

export function submitReqTxb(code: string): TransactionBlock {
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [
      txb.object(SUIPASS_ADDR),
      txb.pure.address(GITHUB_PROVIDER_ID),
      // Proof
      txb.pure.string(code),
      // Coin Id, id of the Sui token
      txb.object('0x71c4e219562b513015765d584a945a8d887c44ce863d15ad670c25e642ce71b3')
    ],
    target: `${PACKAGE_ADDR}::suipass::submit_request`
  });
  return txb;
}

export function mergeTxb(): TransactionBlock {
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [
      // Id of User Object
      txb.object('0x719b9f551eadbcb92c911e631eba2f0a565d00a2f3bcd14067c70d2f63b11008'),
      // Id of Approval
      txb.object('0xf1f266fc298b3a819ebfbcd3cc91c6a3372ea926a351eec5791fedc3c4cff48d')
    ],
    target: `${PACKAGE_ADDR}::user::merge`
  });
  return txb;
}

export function mintPassportTxb(): TransactionBlock {
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [
      txb.object(SUIPASS_ADDR),
      // Id of User Object
      txb.object('0x719b9f551eadbcb92c911e631eba2f0a565d00a2f3bcd14067c70d2f63b11008')
    ],
    target: `${PACKAGE_ADDR}::suipass::mint_passport`
  });
  return txb;
}

export function getScoreTxb(): TransactionBlock {
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [
      txb.object(SUIPASS_ADDR),
      // Id of User Object
      txb.object('0x719b9f551eadbcb92c911e631eba2f0a565d00a2f3bcd14067c70d2f63b11008')
    ],
    target: `${PACKAGE_ADDR}::suipass::calculate_user_score`
  });
  return txb;
}
