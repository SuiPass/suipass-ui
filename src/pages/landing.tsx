import { Button, Container } from '@/components';
import { useHomePage } from '@/hooks';
import * as React from 'react';
import SuiIconImg from '@/assets/sui-icon.svg';
import LandingCoverImg from '@/assets/landing-cover.svg';

export const Landing: React.FC = () => {
  const { signInBtnIsLoading, signInBtnOnClick } = useHomePage();
  return (
    <div className="relative min-h-dvh">
      <img
        loading="lazy"
        src={LandingCoverImg}
        alt="Background"
        className="object-cover absolute left-0 bottom-0 size-full"
      />
      <Container>
        <main className="relative py-48 max-md:px-4">
          <div className="w-full max-w-[659px]">
            <h1 className="text-2xl text-white font-[275]">Decentralized Passport</h1>
            <h2 className="mt-2 text-6xl font-semibold max-md:text-4xl">
              <span className="text-white">Sui</span>
              <span className="text-yellow">Pass</span>
            </h2>
            <p className="mt-10 text-xl font-light text-white max-md:max-w-full">
              Operating as a digital passport, SuiPass allows you to collect &quot;Creds&quot; that
              demonstrate identity and reputation. SuiPass streamlines verification, boosting
              security, privacy, and how you connect across SUI ecosystem.
            </p>
            <Button size="lg" className="mt-10 max-md:w-full" onClick={signInBtnOnClick}>
              <div className="flex gap-2">
                <img
                  loading="lazy"
                  src={SuiIconImg}
                  alt="Sui icon"
                  className="shrink-0 aspect-[0.8] w-[20px]"
                />
                Sign in with SUI
              </div>
            </Button>
          </div>
        </main>
      </Container>
    </div>
  );
};
