import { TransactionBlock } from '@mysten/sui.js/transactions';

const PACKAGE_ADDR = '0xedc73afdf0eae447167519c6484f1067f6f11e036c1642657c4c378010bc2902';

export function newUserTxb(info: string): TransactionBlock {
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [txb.pure.string(info)],
    target: `${PACKAGE_ADDR}::user::new`
  });
  return txb;
}

export function submitReqTxb(): TransactionBlock {
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [
      txb.object('0x3cd19f30b46f5b97cb2da41a3531f68744f2b01dc4735416cd5e703214f66442'),
      txb.object('0x07dde60f0d3b11c852b061f6d1197757e6e1c98cb15a22a7a955922085f177c2'),
      txb.pure.address('0x0ae16ee5f5a9fe9e01163f726b6369abbcd03dd65bf11acc34842e1674949129'),
      txb.pure.address('0xe3ea11c64666cab98eb233433e2c2332bba0d3e21473c539ebc247613c8d281f'),
      txb.pure.string('some proof'),
      txb.object('0xe832bb441ebdd8c8a389af7df11faf5a337ea19073e6efde66726f72d75dddfd')
    ],
    target: `${PACKAGE_ADDR}::suipass::submit_request`
  });
  return txb;
}

export function mergeTxb(): TransactionBlock {
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [
      txb.object('0x3cd19f30b46f5b97cb2da41a3531f68744f2b01dc4735416cd5e703214f66442'),
      txb.object('0xcc3511e45bdb99d4ba60ad127f873c93ddeff0f37ff87d33deebc7a24b3c6ef5')
    ],
    target: `${PACKAGE_ADDR}::user::merge`
  });
  return txb;
}

export function mintPassportTxb(): TransactionBlock {
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [
      txb.object('0x07dde60f0d3b11c852b061f6d1197757e6e1c98cb15a22a7a955922085f177c2'),
      txb.object('0x3cd19f30b46f5b97cb2da41a3531f68744f2b01dc4735416cd5e703214f66442')
    ],
    target: `${PACKAGE_ADDR}::suipass::mint_passport`
  });
  return txb;
}

export function getScoreTxb(): TransactionBlock {
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [
      txb.object('0x07dde60f0d3b11c852b061f6d1197757e6e1c98cb15a22a7a955922085f177c2'),
      txb.object('0x3cd19f30b46f5b97cb2da41a3531f68744f2b01dc4735416cd5e703214f66442')
    ],
    target: `${PACKAGE_ADDR}::suipass::calculate_user_score`
  });
  return txb;
}
