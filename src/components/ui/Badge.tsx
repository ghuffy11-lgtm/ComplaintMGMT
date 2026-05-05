import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'warn' | 'danger' | 'success';
  className?: string;
  children?: React.ReactNode;
}

export function Badge({ 
  className, 
  variant = 'default', 
  children, 
  ...props 
}: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        {
          'badge-primary': variant === 'primary',
          'badge-warn': variant === 'warn',
          'badge-danger': variant === 'danger',
          'badge-success': variant === 'success',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
