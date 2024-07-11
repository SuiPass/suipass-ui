import SuiWalletIcon from '@/assets/wallets/sui-wallet.svg';
import SuiteIcon from '@/assets/wallets/suite.webp';
import NightlyIcon from '@/assets/wallets/nightly.png';
import EthosSuiWalletIcon from '@/assets/wallets/ethos-sui-wallet.png';
import SurfWalletIcon from '@/assets/wallets/surf-wallet.png';

export const SUPPORTED_WALLETS = [
  {
    name: 'Sui Wallet',
    available: false,
    icon: SuiWalletIcon,
    getUrl: 'https://chromewebstore.google.com/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil',
    connect() {
      window.open(this.getUrl, '_blank');
    },
  },
  {
    name: 'Suiet',
    available: false,
    icon: SuiteIcon,
    getUrl: 'https://suiet.app/install',
    connect() {
      window.open(this.getUrl, '_blank');
    },
  },
  {
    name: 'Nightly',
    available: false,
    icon: NightlyIcon,
    getUrl: 'https://nightly.app/download',
    connect() {
      window.open(this.getUrl, '_blank');
    },
  },
  {
    name: 'Ethos Wallet',
    available: false,
    icon: EthosSuiWalletIcon,
    getUrl:
      'https://chromewebstore.google.com/detail/ethos-sui-wallet/mcbigmjiafegjnnogedioegffbooigli',
    connect() {
      window.open(this.getUrl, '_blank');
    },
  },
  {
    name: 'Surf Wallet',
    available: false,
    icon: SurfWalletIcon,
    getUrl: 'https://surf.tech/',
    connect() {
      window.open(this.getUrl, '_blank');
    },
  },
];

export const MIN_BALANCE = 500000000; // 0.5 SUI
