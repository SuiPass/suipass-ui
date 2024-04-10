import { CredDto } from '@/dtos';
import { Button, CredVerifying, Loader } from '.';
import { Progress } from '@/components/ui/progress';
import TimerIcon from '@/assets/icons/timer.svg';
import VerifyIcon from '@/assets/icons/verify.svg';
import StarIcon from '@/assets/icons/star.svg';
import CloseIcon from '@/assets/icons/close.svg';
import { Checkbox } from './ui/checkbox';
import { CredStatus, useCredDetails } from '@/hooks';

type CredDetailsProps = {
  data: CredDto;
  setDrawerIsOpen: (open: boolean) => void;
};

export function CredDetails({ data, setDrawerIsOpen }: CredDetailsProps) {
  const { status, verifyBtnOnClick } = useCredDetails({
    data,
    setDrawerIsOpen,
  });

  return (
    <>
      <div className="overflow-y-auto flex flex-col px-4 w-[472px] shadow-lg bg-black h-full">
        <div className="flex-1 flex flex-col">
          <div className="p-2 w-10 self-end">
            <img
              src={CloseIcon}
              className="w-full aspect-square cursor-pointer"
              onClick={() => setDrawerIsOpen(false)}
            />
          </div>
          <div className="flex flex-col self-center mt-6 w-full">
            <div className="flex gap-5">
              <div className="flex flex-1 gap-5 text-lg font-semibold text-white whitespace-nowrap">
                <img src={data.logo} alt="Logo" className="shrink-0 h-12" />
                <div className="my-auto">{data.name}</div>
              </div>
              <div className="flex items-center gap-0.5 px-4 py-2 rounded-2xl bg-yellow">
                <div className="text-base font-semibold">{data.points}</div>&nbsp;
                <div className="text-xs font-light"> points</div>
              </div>
            </div>
            <div className="mt-4 text-sm font-light leading-5 text-white">{data.desc}</div>
          </div>
          <div className="flex flex-col mt-8 rounded-[32px]">
            <section className="flex flex-col p-6 bg-dark-grey rounded-[32px]">
              <div className="flex flex-col text-white">
                <h2 className="text-base font-medium">Verifying Contribution Activity</h2>
                <p className="mt-2 text-sm font-light leading-5">
                  For the Contribution Activity credentials, make sure your contribution data is
                  public. Go to{' '}
                  <span className="font-medium">
                    Settings &gt; Public Profile &gt; Contributions & Activity
                  </span>{' '}
                  and uncheck '
                  <span className="font-medium">Make profile private and hide activity</span>
                  '. Verify your contribution history with your SuiPass!
                </p>
              </div>
              <div className="flex gap-2 mt-6 text-white divide-x divide-dashed">
                <div className="flex flex-col flex-1 items-center px-2.5 whitespace-nowrap">
                  <img src={VerifyIcon} className="w-6 aspect-square" />
                  <div className="mt-2 text-xs font-light">Earned</div>
                  <div className="self-stretch mt-2 text-center font-medium">
                    {data.issuedDate ? data.issuedDate.toISOString().split('T')[0] : 'N/A'}
                  </div>
                </div>
                <div className="flex flex-col flex-1 items-center px-2.5 whitespace-nowrap">
                  <img src={TimerIcon} className="w-6 aspect-square" />
                  <div className="mt-2 text-xs font-light">Expires</div>
                  <div className="self-stretch mt-2 text-center font-medium">N/A</div>
                </div>
                <div className="flex flex-col flex-1 items-center px-2.5 whitespace-nowrap">
                  <img src={StarIcon} className="w-6 aspect-square" />
                  <div className="mt-2 text-xs font-light">Points Gained</div>
                  <div className="self-stretch mt-2 text-center font-medium">{data.points}</div>
                </div>
              </div>
              <div className="flex flex-col mt-6">
                <div className="flex gap-5 px-2 text-sm text-white whitespace-nowrap">
                  <div className="flex-1">{data.points}</div>
                  <div className="flex-1 text-right">{data.maxPoints}</div>
                </div>
                <Progress className="mt-2" value={(data.points * 100) / data.maxPoints} />
              </div>
            </section>
            <section className="flex flex-col px-6 pt-6 mt-5 bg-dark-grey rounded-[32px]">
              <div className="flex flex-col">
                <div className="flex gap-5">
                  <h2 className="flex-1 text-base font-medium text-white">Levels</h2>
                </div>
                <div className="flex flex-col mt-6 pb-6 text-sm font-light">
                  {data.levels.map((levelItem) => (
                    <div key={levelItem.level} className="flex gap-2 items-center mt-4">
                      <Checkbox
                        id={levelItem.level.toString()}
                        checked={data.currentLevel >= levelItem.level}
                      />
                      <div className="flex-1 self-stretch my-auto text-white">{levelItem.desc}</div>
                      <div className="self-stretch my-auto text-right text-amber-400">
                        {levelItem.level * (data.maxPoints / data.levels.length)} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-8 sticky bottom-0 bg-black py-4">
          {status === null && <Loader />}
          {status === CredStatus.NotConnected && <Button onClick={verifyBtnOnClick}>Verify</Button>}
          {status === CredStatus.NeedToSubmit && (
            <Button disabled isLoading>
              Submitting
            </Button>
          )}
          {status === CredStatus.Waiting && <Button disabled>Waiting</Button>}
          {status === CredStatus.Connected && <Button disabled>Verified</Button>}
        </div>
      </div>
    </>
  );
}
