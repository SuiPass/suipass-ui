import { ScaleLoader } from 'react-spinners';

export function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ScaleLoader color="#36d7b7" />
    </div>
  );
}
