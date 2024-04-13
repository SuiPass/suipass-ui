import * as React from 'react';
import { AccountDropdown, Brand } from '.';
import { useHeader } from '@/hooks';
import { Link } from '@tanstack/react-router';

interface SocialIconProps {
  src: string;
  alt: string;
  className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={`shrink-0 ${className}`} />
);

const socialIcons = [
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/35d5bb0b271599267af08e8595196e614172aee23a1d1eb0950b7a25749e2d11?apiKey=05796128f6dd44148e772baecec9d384&',
    alt: 'Twitter icon',
    className: 'w-6 aspect-square',
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6b0a29dc8e707b9fe8fc1cfa3cf5fde91102b0047a0a0b15e0c59cebf4312946?apiKey=05796128f6dd44148e772baecec9d384&',
    alt: 'Discord icon',
    className: 'w-6 aspect-square fill-[linear-gradient(180deg,#FFF_0%,#229ED9_9925.83%)]',
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/99352547f68e7257d20c5abede59a973b54f45978ff6a434b68a860cd1bd8b8e?apiKey=05796128f6dd44148e772baecec9d384&',
    alt: 'Telegram icon',
    className: 'w-8 aspect-[1.33]',
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b6831d5743b11ca398b23842e0b9998c5fb9cdf608c5faff39e8f84986dddcbc?apiKey=05796128f6dd44148e772baecec9d384&',
    alt: 'Medium icon',
    className: 'aspect-[1.41] w-[34px]',
  },
];

export function Header() {
  const { isLogged, logoutBtnOnClick } = useHeader();

  return (
    <header className="w-full fixed top-0 z-50 bg-black px-12 py-6 max-md:px-5">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center max-md:flex-wrap">
        <Brand />
        {isLogged && <AccountDropdown logoutBtnOnClick={logoutBtnOnClick} />}
        {!isLogged && (
          <div className="flex gap-[7.5rem] max-md:gap-5">
            <Link to="https://docs.suipass.xyz">
              <nav className="flex-1 font-semibold text-right text-white max-md:max-w-full">
                Docs
              </nav>
            </Link>
            <div className="flex flex-col justify-center self-stretch my-auto">
              <div className="flex gap-5">
                {socialIcons.map((icon, index) => (
                  <SocialIcon key={index} {...icon} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
