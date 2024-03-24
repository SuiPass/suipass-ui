import * as React from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

interface BadgeProps {
  imageUrl: string;
  points: number;
}

const Badge: React.FC<BadgeProps> = ({ imageUrl, points }) => (
  <div className="flex gap-5 text-center">
    <div className="flex flex-1 gap-5 justify-between text-lg font-semibold text-white whitespace-nowrap">
      <img src={imageUrl} alt="Badge" className="shrink-0 w-12 aspect-square" />
      <div className="my-auto">Github</div>
    </div>
    <div className="flex gap-0.5 px-4 py-2 my-auto bg-amber-400 rounded-2xl text-neutral-900">
      <div className="text-base font-semibold">{points.toFixed(2)}</div>
      <div className="text-xs font-light">points</div>
    </div>
  </div>
);

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
  iconUrl: string;
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
      iconUrl: '/images/created-90-days.svg',
      label: 'Created at least 90 days ago',
      points: 1.02,
    },
    {
      iconUrl: '/images/created-180-days.svg',
      label: 'Created at least 180 days ago',
      points: 1.23,
    },
    {
      iconUrl: '/images/created-365-days.svg',
      label: 'Created at least 365 days ago',
      points: 1.43,
    },
  ],
};

export const CrendentialDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { badgeData, stats, checklistItems } = sampleProps;

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button className="text-white" onClick={() => setIsOpen((prevState) => !prevState)}>
            Open
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col p-4 mx-auto w-full shadow-lg bg-neutral-900 max-w-[480px] rounded-[40px]">
            <div className="flex justify-center items-center self-end p-2 w-10 rounded-lg">
              <img src="{{ext_20}}" alt="Profile" className="w-full aspect-square" />
            </div>
            <div className="flex flex-col self-center mt-6 w-full max-w-[392px]">
              <Badge {...badgeData} />
              <div className="mt-4 text-sm font-light leading-5 text-white">
                Connect to Github to verify your code contributions.
              </div>
            </div>
            <div className="flex flex-col mt-8 rounded-[32px]">
              <section className="flex flex-col p-6 bg-slate-800 rounded-[32px]">
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
                <div className="flex gap-2 mt-6 text-white">
                  {stats.map((stat) => (
                    <Stat key={stat.label} {...stat} />
                  ))}
                </div>
                <div className="flex flex-col mt-6">
                  <div className="flex gap-5 px-2 text-sm text-white whitespace-nowrap">
                    <div className="flex-1">0</div>
                    <div className="flex-1 text-right">7.38</div>
                  </div>
                  <div className="flex flex-col justify-center items-start py-1 mt-2 bg-neutral-900 rounded-[30px]">
                    <img
                      src="{{ext_21}}"
                      alt="Progress"
                      className="w-3 aspect-[0.75] fill-teal-400"
                    />
                  </div>
                </div>
              </section>
              <section className="flex flex-col px-6 pt-6 mt-5 bg-slate-800 rounded-[32px]">
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
                  <div className="flex flex-col mt-6 text-sm font-light leading-5">
                    {checklistItems.map((item) => (
                      <ChecklistItem key={item.label} {...item} />
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <div className="flex flex-col mt-8 text-base text-center whitespace-nowrap">
              <button
                type="button"
                className="flex flex-col justify-center font-semibold leading-[150%] text-neutral-900"
              >
                <div className="flex justify-center items-center px-6 py-3 bg-teal-400 rounded-2xl">
                  <div className="flex gap-2">
                    <div>Verifying</div>
                    <img src="{{ext_22}}" alt="Verifying" className="shrink-0 w-6 aspect-square" />
                  </div>
                </div>
              </button>
              <button
                type="button"
                className="justify-center items-center px-6 py-3 mt-2 font-light text-white rounded-2xl"
              >
                Remove
              </button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
