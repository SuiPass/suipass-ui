import { Button, Header, OwnedObj, SpotLightBg } from '@/components';
import { getScoreTxb, mergeTxb, mintPassportTxb, newUserTxb, submitReqTxb } from '@/txb';
import {
  ConnectButton,
  useAutoConnectWallet,
  useCurrentAccount,
  useSignAndExecuteTransactionBlock
} from '@mysten/dapp-kit';

function ConnectedAccount() {
  const account = useCurrentAccount();
  if (!account) {
    return null;
  }

  return (
    <div className="col-span-5 md:col-span-3 text-white">
      <div className="container mx-auto py-10 bg-slate-800 rounded-xl mt-10">
        <div>Address: {account.address}</div>
        <div>Chain: {account.chains}</div>
        <OwnedObj address={account.address} />
      </div>
      <div className="container mx-auto py-10 bg-slate-800 rounded-xl mt-10">
        <Actions />
      </div>
    </div>
  );
}

function Actions() {
  const { mutate: signAndExec } = useSignAndExecuteTransactionBlock();
  function newUser() {
    const txb = newUserTxb('name: tinguyen');
    signAndExec(
      {
        transactionBlock: txb,
        options: {
          showEffects: true
        }
      },
      {
        onSuccess: (tx) => {
          console.log('[S] user::new', JSON.stringify(tx));
        },
        onError: (e) => {
          console.log('[E] user::new', JSON.stringify(e));
        }
      }
    );
  }

  function submitReq() {
    const txb = submitReqTxb();
    signAndExec(
      {
        transactionBlock: txb,
        options: {
          showEffects: true
        }
      },
      {
        onSuccess: (tx) => {
          console.log('[S] suipass::submit_request', JSON.stringify(tx));
        },
        onError: (e) => {
          console.log('[E] suipass::submit_request', JSON.stringify(e));
        }
      }
    );
  }

  function merge() {
    const txb = mergeTxb();
    signAndExec(
      {
        transactionBlock: txb,
        options: {
          showEffects: true
        }
      },
      {
        onSuccess: (tx) => {
          console.log('[S] user::merge', JSON.stringify(tx));
        },
        onError: (e) => {
          console.log('[E] user::merge', JSON.stringify(e));
        }
      }
    );
  }

  function mintPassport() {
    const txb = mintPassportTxb();
    signAndExec(
      {
        transactionBlock: txb,
        options: {
          showEffects: true
        }
      },
      {
        onSuccess: (tx) => {
          console.log('[S] suipass::mint_passport', JSON.stringify(tx));
        },
        onError: (e) => {
          console.log('[E] suipass::mint_passport', JSON.stringify(e));
        }
      }
    );
  }

  function getScore() {
    const txb = getScoreTxb();
    signAndExec(
      {
        transactionBlock: txb,
        options: {
          showEffects: true
        }
      },
      {
        onSuccess: (tx) => {
          console.log('[S] suipass::calculate_user_score', JSON.stringify(tx));
        },
        onError: (e) => {
          console.log('[E] suipass::calculate_user_score', JSON.stringify(e));
        }
      }
    );
  }

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
      <Button
        size="lg"
        onClick={() => {
          newUser();
        }}
      >
        <div className="flex items-center">
          <div className="ml-4">user::new</div>
        </div>
      </Button>
      <Button
        className="mt-5"
        size="lg"
        onClick={() => {
          submitReq();
        }}
      >
        <div className="flex items-center">
          <div className="ml-4">suipass::submit_request</div>
        </div>
      </Button>
      <Button
        className="mt-5"
        size="lg"
        onClick={() => {
          merge();
        }}
      >
        <div className="flex items-center">
          <div className="ml-4">user::merge</div>
        </div>
      </Button>
      <Button
        className="mt-5"
        size="lg"
        onClick={() => {
          getScore();
        }}
      >
        <div className="flex items-center">
          <div className="ml-4">suipass::calculate_user_score</div>
        </div>
      </Button>
      <Button
        className="mt-5"
        size="lg"
        onClick={() => {
          mintPassport();
        }}
      >
        <div className="flex items-center">
          <div className="ml-4">suipass::mint_passport</div>
        </div>
      </Button>
    </div>
  );
}

export function Test() {
  const autoConnectionStatus = useAutoConnectWallet();

  return (
    <div className="min-h-[800px] min-w-[375px] relative">
      <SpotLightBg />
      <div className="relative">
        <Header />
        <main className="container mx-auto relative">
          <div className="text-white">
            <div className="container mx-auto py-10 bg-slate-800 rounded-xl mt-10">
              <ConnectButton
                style={{
                  padding: '10px 20px',
                  background: '#f00',
                  marginLeft: '20px',
                  borderRadius: '10px'
                }}
              />
              <div>Auto-connection: {autoConnectionStatus}</div>
            </div>
            <ConnectedAccount />
          </div>
        </main>
      </div>
    </div>
  );
}
