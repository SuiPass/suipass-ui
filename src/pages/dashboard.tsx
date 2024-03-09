import { Header, SpotLightBg, Stamp } from '@/components';
import { useEffect } from 'react';
import { Spotlight } from '@/lib/animation';
import { useSubmitRequest } from '@/hooks';

export function Dashboard() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  const { available, mutate: submitRequest } = useSubmitRequest();
  const providerId = '0x0ae16ee5f5a9fe9e01163f726b6369abbcd03dd65bf11acc34842e1674949129';

  useEffect(() => {
    if (!code) return;
    if (submitRequest) submitRequest(providerId, code);
  }, [code, available]);

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
            <section className="pt-32 pb-24">
              <div className="">
                <h2 className="mb-12 text-3xl">My Stamps</h2>
              </div>
            </section>
            <section className="py-24">
              <div className="">
                <h2 className="mb-12 text-3xl">Add stamps</h2>
                {/* <!-- Cards container --> */}
                <div
                  className="max-w-sm mx-auto grid gap-6 lg:grid-cols-4 items-start lg:max-w-none group"
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
                {/* <!-- End: Cards container --> */}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
