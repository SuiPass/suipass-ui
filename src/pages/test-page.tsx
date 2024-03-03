import { Header, SpotLightBg } from '@/components';
import { ConnectButton, useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import { SuiObjectResponse } from '@mysten/sui.js/client';

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
  const { data, isPending, isError, error } = useSuiClientQuery('getOwnedObjects', {
    owner: address,
    options: {
      showType: true,
      showOwner: true,
      showPreviousTransaction: true,
      showDisplay: false,
      showContent: false,
      showBcs: false,
      showStorageRebate: false
    }
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="">Owned objects:</div>
      <ul role="list" className="marker:text-sky-400 list-disc pl-5 space-y-2 text-slate-400">
        {data.data.map((object) => (
          <li key={object.data?.objectId}>
            <ObjectPreview data={object} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ObjectPreview({ data }: { data: SuiObjectResponse }) {
  if (data.error) {
    return (
      <div>
        <div>Error:</div>
        <pre>{JSON.stringify(data.error, null, 2)}</pre>
      </div>
    );
  }
  if (!data.data) {
    return <div>Hong biet show gi</div>;
  }

  return (
    <div>
      <div>Id: {data.data.objectId}</div>
      <div>Type: {data.data.type}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
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
            <div className="col-span-5 md:col-span-3 text-white">
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
          </main>
        </div>
      </div>
    </>
  );
}
