import { Button } from '@/components';
import * as React from 'react';

export const Storybook: React.FC = () => {
  return (
    <div className="py-40 px-20">
      <p className="text-2xl font-bold my-10">Button</p>
      <div className="flex gap-4">
        <Button>Button</Button>
        <Button isLoading>Button</Button>
        <Button disabled>Button</Button>
      </div>
    </div>
  );
};
