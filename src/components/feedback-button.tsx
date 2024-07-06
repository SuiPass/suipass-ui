import InfoIcon from '@/assets/icons/info.svg';
import { Link } from '@tanstack/react-router';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function FeedbackButton() {
  return (
    <div className="fixed bottom-6 right-16">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link to="https://suipass.canny.io/feedback">
              <div className="p-4 rounded-2xl bg-[#302E40] opacity-[0.4] cursor-pointer">
                <img src={InfoIcon} className="w-6 h-6" />
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Request Feature</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

// AI gen
import React, { useState } from 'react';

export const FeatureRequestButton = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="relative"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <button className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center focus:outline-none">
          <span className="text-white text-2xl">!</span>
        </button>

        {isTooltipVisible && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
            <div className="bg-gray-800 text-white text-sm py-2 px-4 rounded-full whitespace-nowrap">
              Request Feature
            </div>
            <div className="w-3 h-3 bg-gray-800 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
          </div>
        )}
      </div>
    </div>
  );
};
