import { Header, ListStamps, SpotLightBg } from '@/components';
import { useEffect } from 'react';
import { Spotlight } from '@/lib/animation';

export function Dashboard() {
  useEffect(() => {
    // Init Spotlight
    const spotlights = document.querySelectorAll('[data-spotlight]');
    spotlights.forEach((spotlight) => {
      new Spotlight(spotlight);
    });
  });
  return (
    <>
      <div className="min-h-[800px] min-w-[375px] relative text-white">
        <SpotLightBg />
        <div className="relative">
          <Header />
          <main className="container mx-auto relative">
            {/* <section className="pt-32 pb-24">
              <div className="">
                <h2 className="mb-12 text-3xl">My Stamps</h2>
              </div>
            </section> */}
            <section className="py-24">
              <div className="">
                <h2 className="mb-12 text-3xl">Add stamps</h2>
                <ListStamps />
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
