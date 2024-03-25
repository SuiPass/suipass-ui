import { useCredentialCard } from '@/hooks';
import { Button, CrendentialDetails } from '.';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { useState } from 'react';

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
  const {} = useCredentialCard({ code: 'github' });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col p-6 border border-solid bg-dark-grey border-dark-grey rounded-[40px] h-full">
      <div className="flex gap-5 justify-between w-full text-center">
        <img src={imageSrc} alt={title} className="h-12" />
        <div className="flex items-center gap-0.5 px-4 py-2 rounded-2xl bg-neutral-900 bg-opacity-40">
          <div className="text-base font-semibold text-white">{points}</div>&nbsp;
          <div className="text-xs font-light text-light-grey"> points</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="mt-6 text-white">
          <div className="text-lg font-semibold">{title}</div>
          <div className="mt-2 text-sm font-light leading-5">{description}</div>
        </div>
        <div>
          <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button onClick={() => setIsOpen((prevState) => !prevState)}>Connect</Button>
            </DrawerTrigger>
            <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 rounded-none">
              <CrendentialDetails />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
