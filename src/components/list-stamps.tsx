import { Stamp } from '@/components';
import { useEffect } from 'react';
import { Spotlight } from '@/lib/animation';

export function ListStamps() {
  useEffect(() => {
    // Init Spotlight
    const spotlights = document.querySelectorAll('[data-spotlight]');
    spotlights.forEach((spotlight) => {
      new Spotlight(spotlight);
    });
  }, []);

  return (
    <div
      className="relative z-0 max-w-sm mx-auto grid gap-6 lg:grid-cols-4 items-start lg:max-w-none group"
      data-spotlight
    >
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
      <Stamp />
    </div>
  );
}
