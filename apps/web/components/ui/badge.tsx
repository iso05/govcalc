import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'outline'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'premium'
    | 'free'
    | 'pro'
    | 'mock'
    | 'verified';
}

export function Badge({ children, className, variant = 'default', ...props }: BadgeProps) {
  const base =
    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors';

  const variants = {
    default: 'bg-brand-100 text-brand-800 border border-brand-200',
    outline: 'border border-brand-300 text-brand-700 bg-transparent',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    destructive: 'bg-red-50 text-red-800 border border-red-200',
    premium: 'bg-brand-900 text-white border border-brand-800',
    free: 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold uppercase tracking-wider text-[10px]',
    pro: 'bg-amber-50 text-amber-800 border border-amber-300 font-bold uppercase tracking-wider text-[10px]',
    mock: 'bg-slate-100 text-slate-600 border border-slate-300 font-mono text-[10px] uppercase',
    verified: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold',
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
