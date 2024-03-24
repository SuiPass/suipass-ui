import { Button } from '@/components';
import { useHomePage } from '@/hooks';
import * as React from 'react';

export const Landing: React.FC = () => {
  const { signInBtnIsLoading, signInBtnOnClick } = useHomePage();
  return (
    <div className="py-48 w-full h-dvh min-h-[900px] max-md:max-w-full bg-neutral-900">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccf02f7196a82b3c979387a8c42f5fce041f6add19dd406f1ebf43c7786408d2?apiKey=05796128f6dd44148e772baecec9d384&"
        alt="Background"
        className="object-cover absolute bottom-0 inset-0 size-full"
      />
      <main className="flex relative flex-col items-start mt-24 mb-40 ml-40 max-w-full w-[659px] max-md:my-10 max-md:mx-10 max-md:w-auto">
        <div className="flex flex-col">
          <h1 className="text-2xl text-white font-[275]">Decentralized Passport</h1>
          <h2 className="mt-2 text-6xl font-semibold max-md:text-4xl">
            <span className="text-white">Sui</span>
            <span className="text-amber-400">Pass</span>
          </h2>
        </div>
        <p className="self-stretch mt-10 text-xl font-light text-white max-md:max-w-full">
          Operating as a digital passport, SuiPass allows you to collect &quot;Creds&quot; that
          demonstrate identity and reputation. SuiPass streamlines verification, boosting security,
          privacy, and how you connect across SUI ecosystem.
        </p>
        <Button
          size="lg"
          className="mt-10 max-md:w-full"
          isLoading={signInBtnIsLoading}
          onClick={signInBtnOnClick}
        >
          <div className="flex gap-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/29954136649f3196e613c2e8b0f53a3a56aa93bbeb671877034242b3bb433f49?apiKey=05796128f6dd44148e772baecec9d384&"
              alt="Sui icon"
              className="shrink-0 aspect-[0.8] w-[20px]"
            />
            Sign in with SUI
          </div>
        </Button>
      </main>
    </div>
  );
};
