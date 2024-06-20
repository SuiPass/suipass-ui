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
