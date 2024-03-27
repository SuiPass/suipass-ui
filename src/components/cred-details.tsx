import { CredDto } from '@/dtos';
import * as React from 'react';
import { Button } from '.';
import { Progress } from '@/components/ui/progress';

import TimerIcon from '@/assets/icons/timer.svg';
import VerifyIcon from '@/assets/icons/verify.svg';
import StarIcon from '@/assets/icons/star.svg';
import CloseIcon from '@/assets/icons/close.svg';
import { Checkbox } from './ui/checkbox';

interface BadgeProps {
  imageUrl: string;
  points: number;
}

interface StatProps {
  iconUrl: string;
  label: string;
  value: string;
}

const Stat: React.FC<StatProps> = ({ iconUrl, label, value }) => (
  <div className="flex flex-col flex-1 items-center px-2.5 whitespace-nowrap">
    <img src={iconUrl} alt={label} className="w-6 aspect-square" />
    <div className="mt-2 text-xs font-light">{label}</div>
    <div className="self-stretch mt-2 text-base font-medium">{value}</div>
  </div>
);

interface ChecklistItemProps {
  label: string;
  points: number;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ iconUrl, label, points }) => (
  <div className="flex gap-2 items-center mt-4">
    <img src={iconUrl} alt={label} className="shrink-0 self-stretch w-6 aspect-square" />
    <div className="flex-1 self-stretch my-auto text-white">{label}</div>
    <div className="self-stretch my-auto text-right text-amber-400">{points.toFixed(2)} pts</div>
  </div>
);

interface MyComponentProps {
  badgeData: BadgeProps;
  stats: StatProps[];
  checklistItems: ChecklistItemProps[];
}

const sampleProps: MyComponentProps = {
  badgeData: {
    imageUrl: '/images/github-badge.png',
    points: 7.38,
  },
  stats: [
    {
      iconUrl: '/images/earned.svg',
      label: 'Earned',
      value: 'mm.dd.yyyy',
    },
    {
      iconUrl: '/images/expires.svg',
      label: 'Expires',
      value: 'mm.dd.yyyy',
    },
    {
      iconUrl: '/images/points-gained.svg',
      label: 'Points Gained',
      value: '0',
    },
  ],
  checklistItems: [
    {
      label: 'Created at least 90 days ago',
      points: 1.02,
    },
    {
      label: 'Created at least 180 days ago',
      points: 1.23,
    },
    {
      label: 'Created at least 365 days ago',
      points: 1.43,
    },
  ],
};

type CredDetailsProps = {
  data: CredDto;
  setDrawerIsOpen: (open: boolean) => void;
};

export function CredDetails({ data, setDrawerIsOpen }: CredDetailsProps) {
  const { checklistItems } = sampleProps;

  return (
    <div className="overflow-scroll flex flex-col p-4 w-[472px] shadow-lg bg-black">
      <div className="flex justify-center items-center self-end p-2 w-10 rounded-lg">
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
            <div className="text-base font-semibold">{data.points.data ?? 0}</div>&nbsp;
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
              For the Contribution Activity credentials, make sure your contribution data is public.
              Go to{' '}
              <span className="font-medium">
                Settings &gt; Public Profile &gt; Contributions & Activity
              </span>{' '}
              and uncheck '
              <span className="font-medium">Make profile private and hide activity</span>
              '. Verify your contribution history with your SuiPass!
            </p>
          </div>
          <div className="flex gap-2 mt-6 text-white">
            <div className="flex flex-col flex-1 items-center px-2.5 whitespace-nowrap">
              <img src={VerifyIcon} className="w-6 aspect-square" />
              <div className="mt-2 text-xs font-light">Earned</div>
              <div className="self-stretch mt-2 text-center font-medium">N/A</div>
            </div>
            <div className="flex flex-col flex-1 items-center px-2.5 whitespace-nowrap">
              <img src={TimerIcon} className="w-6 aspect-square" />
              <div className="mt-2 text-xs font-light">Expires</div>
              <div className="self-stretch mt-2 text-center font-medium">N/A</div>
            </div>
            <div className="flex flex-col flex-1 items-center px-2.5 whitespace-nowrap">
              <img src={StarIcon} className="w-6 aspect-square" />
              <div className="mt-2 text-xs font-light">Points Gained</div>
              <div className="self-stretch mt-2 text-center font-medium">
                {data.points.data ?? 0}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex gap-5 px-2 text-sm text-white whitespace-nowrap">
              <div className="flex-1">0</div>
              <div className="flex-1 text-right">{data.maxPoints}</div>
            </div>
            <Progress className="mt-2" value={data.points.data ?? 0} max={data.maxPoints} />
          </div>
        </section>
        <section className="flex flex-col px-6 pt-6 mt-5 bg-dark-grey rounded-[32px]">
          <div className="flex flex-col">
            <div className="flex gap-5">
              <h2 className="flex-1 text-base font-medium text-white">Account Creation</h2>
              <button
                type="button"
                className="my-auto text-sm font-light leading-5 text-white underline"
              >
                Deselect All
              </button>
            </div>
            <div className="flex flex-col mt-6 pb-6 text-sm font-light">
              {checklistItems.map((item) => (
                <div className="flex gap-2 items-center mt-4">
                  <Checkbox id={item.label} />
                  {/* <label
                    htmlFor={item.label}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.label}
                  </label> */}
                  <div className="flex-1 self-stretch my-auto text-white">{item.label}</div>
                  <div className="self-stretch my-auto text-right text-amber-400">
                    {item.points.toFixed(2)} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="flex flex-col gap-2 mt-8 sticky bottom-0 bg-black pt-2">
        <Button>Verify</Button>
        <Button variant="ghost" onClick={() => setDrawerIsOpen(false)}>
          Remove
        </Button>
      </div>
    </div>
  );
}
