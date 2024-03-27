import * as React from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { rootStore } from '@/stores';

type Checked = DropdownMenuCheckboxItemProps['checked'];
interface WalletInfoProps {
  logoutBtnOnClick: () => void;
  address: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ logoutBtnOnClick, address }) => {
  return (
    <div className="flex flex-col justify-center p-4 w-full rounded-3xl bg-neutral-900">
      <div className="text-sm font-light leading-5 text-gray-500">Connected wallet</div>
      {/* <div className="flex gap-2 mt-2 text-sm font-light leading-5 text-white whitespace-nowrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/56da6ad43abad46ab8c7be68c30040fb6f24467ee98e568ee61ab2476eb86c15?apiKey=05796128f6dd44148e772baecec9d384&"
          alt="User avatar"
          className="shrink-0 w-6 aspect-square"
        />
        <div className="my-auto">{email}</div>
      </div> */}
      <div className="flex gap-4 mt-2">
        <div className="flex-1 justify-center items-start px-8 text-base font-semibold leading-6 text-white whitespace-nowrap">
          {address}
        </div>
        <div className="flex gap-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/97c19f9a11bb18471f29cd57bc154814571796cb8a33d216ab589175867634e5?apiKey=05796128f6dd44148e772baecec9d384&"
            alt="Copy icon"
            className="shrink-0 w-6 aspect-square cursor-pointer"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b424d92ec6c1e9707edc2ef1f2e4b2e738856066334b0c8cd0179e158275d80e?apiKey=05796128f6dd44148e772baecec9d384&"
            alt="Disconnect icon"
            className="shrink-0 w-6 aspect-square cursor-pointer"
            onClick={logoutBtnOnClick}
          />
        </div>
      </div>
    </div>
  );
};

const TokenInfo: React.FC<{ tokenName: string; tokenAmount: number }> = ({
  tokenName,
  tokenAmount,
}) => {
  return (
    <div className="flex flex-col justify-center p-4 mt-2 text-sm leading-5 rounded-3xl">
      <div className="font-light text-white">Your token</div>
      <div className="flex gap-4 items-center mt-2 text-gray-200 whitespace-nowrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/38b00ec14c77345280d7a0dd267f6fea4f61287339d06ed790e673d94f4b9d8d?apiKey=05796128f6dd44148e772baecec9d384&"
          alt={`${tokenName} token icon`}
          className="shrink-0 self-stretch w-6 aspect-square"
        />
        <div className="flex-1 self-stretch my-auto font-semibold">{tokenName}</div>
        <div className="self-stretch my-auto font-light text-right">{tokenAmount.toFixed(1)}</div>
      </div>
    </div>
  );
};

type AccountDropdownProps = {
  logoutBtnOnClick: () => void;
};
export function AccountDropdown({ logoutBtnOnClick }: AccountDropdownProps) {
  const address = rootStore.contract.useTracked.account()?.address;

  const walletData = {
    address: `${address?.slice(0, 6)}...${address?.slice(address.length - 4, address.length)}`,
    tokenName: 'SUI',
    tokenAmount: 150.0,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 justify-center px-6 py-3 text-base font-semibold leading-6 text-center text-white whitespace-nowrap rounded-2xl bg-slate-800 cursor-pointer">
          <div>{walletData.address}</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9d783609eebfe9efa569c5a16ecfe25151bf8475365055c4a9e221d5688ea76?apiKey=05796128f6dd44148e772baecec9d384&"
            alt="Wallet icon"
            className="shrink-0 w-6 aspect-square"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col justify-center p-3 max-w-xs shadow-lg bg-slate-800 rounded-[36px]">
          <WalletInfo {...walletData} logoutBtnOnClick={logoutBtnOnClick} />
          <TokenInfo tokenName={walletData.tokenName} tokenAmount={walletData.tokenAmount} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
