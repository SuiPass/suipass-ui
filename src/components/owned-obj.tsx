import { useSuiClientQuery } from '@mysten/dapp-kit';
import { SuiObjectResponse } from '@mysten/sui.js/client';

interface IOwnedObj {
  address: string;
}
export function OwnedObj({ address }: IOwnedObj) {
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
