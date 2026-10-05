import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
  prefixElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, helperText, prefixElement, suffixElement, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold uppercase tracking-wider text-brand-900">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {prefixElement && (
            <div className="absolute left-3.5 pointer-events-none text-brand-400 text-sm">
              {prefixElement}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              'flex h-11 w-full rounded-xl border border-brand-300 bg-white px-3.5 py-2 text-sm text-brand-900 placeholder:text-brand-400 transition-colors focus:border-brand-900 focus:outline-none focus:ring-1 focus:ring-brand-900 disabled:cursor-not-allowed disabled:opacity-50',
              prefixElement && 'pl-10',
              suffixElement && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {suffixElement && (
            <div className="absolute right-3.5 pointer-events-none text-brand-500 text-xs font-mono">
              {suffixElement}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-red-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-brand-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
