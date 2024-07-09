import { Button, CredDetails } from '.';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { useState } from 'react';
import { CredDto, CredStatus } from '@/dtos';
import { useCredCard } from '@/hooks';

type CredCardProps = {
  data: CredDto;
};

export const CredCard: React.FC<CredCardProps> = ({ data }) => {
  const [isDrawerOpen, setDrawerIsOpen] = useState(false);

  useCredCard({ data, setDrawerIsOpen });
  return (
    <div
      className="flex flex-col p-6 border border-solid bg-dark-grey border-dark-grey rounded-[40px] h-full cursor-pointer"
      onClick={() => setDrawerIsOpen(true)}
    >
      <div className="flex gap-5 justify-between w-full text-center">
        <img src={data.logo} alt="Logo" className="h-12" />
        <div className="flex items-center gap-0.5 px-4 py-2 rounded-2xl bg-neutral-900 bg-opacity-40">
          <div className="text-base font-semibold text-white">{data.points}</div>&nbsp;
          <div className="text-xs font-light text-light-grey"> points</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="mt-6 text-white">
          <div className="text-lg font-semibold">{data.name}</div>
          <div className="mt-2 text-sm font-light leading-5">{data.desc}</div>
        </div>
        <div>
          <Drawer direction="right" open={isDrawerOpen}>
            <DrawerTrigger asChild>
              <div>
                {data.status === CredStatus.NotVerified && (
                  <Button className="mt-6">Connect</Button>
                )}
                {data.status === CredStatus.Waiting && (
                  <Button className="mt-6" disabled>
                    Waiting
                  </Button>
                )}
                {data.status === CredStatus.Verified &&
                  (data.points === data.maxPoints ? (
                    <Button className="mt-6" disabled>
                      Verified
                    </Button>
                  ) : (
                    <Button className="mt-6">Re-Verify</Button>
                  ))}
              </div>
            </DrawerTrigger>
            <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 rounded-none">
              <CredDetails data={data} setDrawerIsOpen={setDrawerIsOpen} />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
