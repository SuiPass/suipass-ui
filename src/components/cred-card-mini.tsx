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
        'flex flex-col p-6 border-2 border-transparent bg-dark-grey rounded-[1.5rem] cursor-pointer',
        {
          'border-aqua-green': isSelected,
        },
      )}
      onClick={onClick}
    >
      <div className="flex gap-5 justify-between w-full text-center"></div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="text-white">
          <div className="text-lg font-semibold flex gap-6 items-center">
            <img src={data.logo} alt="Logo" className="w-8" />
            {data.name}
            <div className="ml-auto flex items-center gap-0.5">
              <div className="text-base font-semibold text-white">{data.maxPoints}</div>&nbsp;
              <div className="text-xs font-light text-light-grey">pts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
