import { Stamp } from '@/components';
import { useEffect } from 'react';
import { Spotlight } from '@/lib/animation';

const listOfStamps = [
  {
    code: 'github',
    label: 'GitHub',
    icon: 'https://cruip-tutorials.vercel.app/spotlight-effect/card-01.png',
    description: 'Quickly apply filters to refine your issues lists and create custom views.',
    onClick: () => {
      const rootURl = 'https://github.com/login/oauth/authorize';
      const options = {
        client_id: '5f5991f94e3f8e1224df',
        redirect_uri: `http://localhost:5173/dashboard?suipassProvider=github`,
        scope: 'user:email',
        state: location.pathname,
      };

      const qs = new URLSearchParams(options);
      const url = `${rootURl}?${qs.toString()}`;
      window.location.href = url;
    },
  },
];

export function ListStamps() {
  useEffect(() => {
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
      {listOfStamps.map((stamp) => (
        <Stamp key={stamp.code} data={stamp} />
      ))}
    </div>
  );
}
