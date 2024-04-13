import { Link } from '@tanstack/react-router';
import SuiPassLogoImg from '@/assets/suipass-logo.svg';

export function Brand() {
  return (
    <Link to="/">
      <div className="flex flex-1 gap-4 text-2xl font-semibold">
        <img
          loading="lazy"
          src={SuiPassLogoImg}
          alt="SuiPass logo"
          className="shrink-0 w-10 aspect-square"
        />
        <div className="my-auto">
          <div className="flex-1 pt-4">
            <span className="text-white">Sui</span>
            <span className="text-yellow">Pass</span>
          </div>
          <div className="text-light-grey text-sm font-light">testnet</div>
        </div>
      </div>
    </Link>
  );
}
