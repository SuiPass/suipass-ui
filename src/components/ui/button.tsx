import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva('block justify-center font-semibold leading-6 text-center', {
  variants: {
    variant: {
      default: 'bg-aqua-green text-neutral-900',
      secondary: 'bg-aqua-green text-neutral-900',
      outline: 'bg-aqua-green text-neutral-900',
      ghost: 'bg-slate-800 bg-opacity-60 text-base text-gray-500',
    },
    size: {
      default: 'px-6 py-3 rounded-2xl max-md:px-5',
      sm: 'px-10 py-6 text-xl rounded-2xl',
      lg: 'px-10 py-6 text-xl rounded-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    if (props.disabled) variant = 'ghost';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading ? true : props.disabled}
        {...props}
      >
        <div className="relative">
          {isLoading && (
            <div className="absolute w-full flex justify-center">
              <Loader2 className={`mr-2 animate-spin ${size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'}`} />
            </div>
          )}
          <div className={`${isLoading ? 'opacity-0' : ''}`}>{children}</div>
        </div>
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
