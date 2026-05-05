import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/src/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:translate-y-[1px]',
          {
            'bg-primary text-white hover:bg-primary-hover shadow-sm': variant === 'primary',
            'bg-surface text-text-main border border-border hover:bg-surface-hover shadow-sm': variant === 'secondary',
            'bg-danger text-white hover:bg-danger-hover shadow-sm': variant === 'danger',
            'bg-transparent text-text-main hover:bg-surface-hover': variant === 'ghost',
          },
          {
            'px-5 py-2.5 text-[13px]': size === 'sm',
            'px-4 py-2 text-[14px]': size === 'md',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
