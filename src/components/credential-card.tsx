import { Button } from '.';

interface CredentialCardProps {
  imageSrc: string;
  points: number;
  title: string;
  description: string;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({
  imageSrc,
  points,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col p-6 border border-solid bg-slate-800 border-slate-800 rounded-[40px] h-full">
      <div className="flex gap-5 justify-between w-full text-center">
        <img src={imageSrc} alt={title} className="shrink-0 w-12 aspect-square" />
        <div className="flex gap-0.5 self-start px-4 py-2 rounded-2xl bg-neutral-900 bg-opacity-40">
          <div className="text-base font-semibold text-white">{points}</div>
          <div className="text-xs font-light text-gray-500"> points</div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="mt-6 text-white">
          <div className="text-lg font-semibold text-center">{title}</div>
          <div className="mt-2 text-sm font-light leading-5">{description}</div>
        </div>
        <div>
          <Button>Connect</Button>
        </div>
      </div>
    </div>
  );
};
