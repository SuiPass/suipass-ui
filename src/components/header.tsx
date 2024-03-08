import { Link } from '@tanstack/react-router';
import { useWindowScroll } from '@uidotdev/usehooks';
import { useMemo } from 'react';
import { Button } from '.';
import { useDisconnectWallet } from '@mysten/dapp-kit';

export function Header() {
  const [{ y }] = useWindowScroll();
  const { mutate: disconnect } = useDisconnectWallet();

  const yLessThan100 = (y ?? 0) < 100;
  const isBgTransparent = useMemo(() => {
    return yLessThan100;
  }, [yLessThan100]);

  const isLogged = !!localStorage.getItem('logged');

  return (
    <>
      <header
        className={`${isBgTransparent ? 'bg-transparent' : 'bg-black/70'} text-white transition-background duration-300 ease-in-out py-5 sticky top-0 w-full z-10`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            <Link to="/">LOGO</Link>
          </h1>
          <nav>
            <a href="#" className="text-white px-4">
              Features
            </a>
            <a href="#" className="text-white px-4">
              About
            </a>
            {isLogged && (
              <Button
                onClick={() => {
                  disconnect();
                  localStorage.removeItem('logged');
                  location.replace('/');
                }}
              >
                Logout
              </Button>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
