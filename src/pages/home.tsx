import { Button, Header, SpotLightBg } from '@/components';
import SuiIconIcon from '@/assets/sui_icon.svg';
import SuipassLogo from '@/assets/logo.png';
import { useHomePage } from '@/hooks';

export function Home() {
  const { connectWalletButtonOnClick } = useHomePage();

  return (
    <>
      <div className="min-h-[800px] min-w-[375px] relative">
        <SpotLightBg />
        <div className="relative">
          <Header />
          <main className="container mx-auto relative">
            <section className="grid grid-cols-5 gap-16 py-32 text-white">
              <div className="col-span-5 md:col-span-3">
                <div className="mb-2 text-2xl">Decentralize Passport</div>
                <h1 className="text-6xl mb-12 font-bold md:text-8xl">Suipass</h1>
                <p className="max-w-xl mb-16 text-xl font-thin">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo adipiscing
                  faucibus nunc amet convallis posuere diam nulla. Pellentesque vulputate dui
                  posuere orci tellus dolor, semper convallis sed.
                </p>
                <Button size="lg" className="w-full md:w-auto" onClick={connectWalletButtonOnClick}>
                  <div className="flex items-center">
                    <img src={SuiIconIcon} className="h-6" />
                    <div className="ml-4">Sign in with Sui</div>
                  </div>
                </Button>
              </div>
              <div className="hidden md:col-span-2 md:block rounded-full overflow-hidden">
                <img src={SuipassLogo} className="object-cover w-full" />
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
