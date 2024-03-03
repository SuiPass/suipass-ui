import { Header, SpotLightBg } from '@/components';
import { ConnectButton, useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';

function ConnectedAccount() {
  const account = useCurrentAccount();

  if (!account) {
    return null;
  }

  return (
    <div className="container mx-auto py-10 bg-slate-800 rounded-xl mt-10">
      <div>Address: {account.address}</div>
      <div>Chain: {account.chains}</div>
      <OwnedObjects address={account.address} />
    </div>
  );
}

function OwnedObjects({ address }: { address: string }) {
  const { data } = useSuiClientQuery('getOwnedObjects', {
    owner: address
  });
  if (!data) {
    return null;
  }

  return (
    <div>
      <div className="">Owned objects:</div>
      <ul role="list" className="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-400">
        {data.data.map((object) => (
          <li key={object.data?.objectId}>
            <a href={`https://suiexplorer.com/object/${object.data?.objectId}?network=devnet`}>
              {object.data?.objectId}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Test() {
  return (
    <>
      <div className="min-h-[800px] min-w-[375px] relative">
        <SpotLightBg />
        <div className="relative">
          <Header />
          <main className="container mx-auto relative">
            <section className="grid grid-cols-5 gap-16 py-32 text-white">
              <div className="col-span-5 md:col-span-3">
                <ConnectButton
                  style={{
                    padding: '10px 20px',
                    background: '#f00',
                    marginLeft: '20px',
                    borderRadius: '10px'
                  }}
                />
                <ConnectedAccount />
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
