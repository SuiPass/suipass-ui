import { BeatLoader } from 'react-spinners';

export function CredVerifying() {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-opacity-70 bg-stone-950 z-50">
      <BeatLoader color="#36d7b7" />
    </div>
  );
}
