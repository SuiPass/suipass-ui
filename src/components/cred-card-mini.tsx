import { CredDto } from '@/dtos';
import { cn } from '@/lib/utils';

type CredCardMiniProps = {
  data: CredDto;
  isSelected?: boolean;
  onClick?: () => void;
};

export const CredCardMini: React.FC<CredCardMiniProps> = ({ data, isSelected, onClick }) => {
  return (
    <div
      className={cn(
        'flex flex-col p-3 border border-solid bg-dark-grey border-dark-grey rounded-lg h-full cursor-pointer',
        {
          'border-aqua-green': isSelected,
        },
      )}
      onClick={onClick}
    >
      <div className="flex gap-5 justify-between w-full text-center"></div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="text-white">
          <div className="text-lg font-semibold flex gap-2 items-center">
            <img src={data.logo} alt="Logo" className="h-6" />
            {data.name}
            <div className="ml-auto flex items-center gap-0.5 px-4 py-1 rounded-2xl bg-neutral-900 bg-opacity-40">
              <div className="text-sm font-semibold text-white">{data.points}</div>&nbsp;
              <div className="text-xs font-light text-light-grey"> points</div>
            </div>
          </div>
          <div className="mt-2 text-xs font-light leading-5">{data.desc}</div>
        </div>
      </div>
    </div>
  );
};
