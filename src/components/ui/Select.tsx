import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { label: string; value: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, ...props }, ref) => {
    return (
      <div className="field">
        {label && <label className="text-[13px] font-medium text-text-main">{label}</label>}
        <select
          className={cn(
            'flex h-10 w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-sm ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-2 appearance-none',
            error && 'border-danger focus-visible:ring-danger',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {hint && !error && <p className="hint">{hint}</p>}
        {error && <p className="err">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
