import EmptyImg from '@/assets/empty.svg';

export function Empty() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src={EmptyImg} />
    </div>
  );
}
