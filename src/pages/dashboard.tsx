import { Button, Header, SpotLightBg, Stamp } from '@/components';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Minus, Plus } from 'lucide-react';
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
                {/* <!-- End: Cards container --> */}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
