import * as React from 'react';
import { cn } from '@/src/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, subtitle, headerAction, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('card', className)}
        {...props}
      >
        {(title || subtitle || headerAction) && (
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && <h3 className="font-semibold text-text-main tracking-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        )}
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export { Card };
