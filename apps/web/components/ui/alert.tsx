import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'destructive';
  title?: string;
  icon?: React.ReactNode;
}

export function Alert({
  className,
  variant = 'info',
  title,
  icon,
  children,
  ...props
}: AlertProps) {
  const variantStyles = {
    info: 'bg-blue-50/70 border-blue-200 text-blue-900',
    success: 'bg-emerald-50/70 border-emerald-200 text-emerald-900',
    warning: 'bg-amber-50/70 border-amber-200 text-amber-900',
    destructive: 'bg-red-50/70 border-red-200 text-red-900',
  };

  const defaultIcons = {
    info: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
    destructive: <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />,
  };

  return (
    <div
      role="alert"
      className={cn(
        'relative w-full rounded-xl border p-4 text-xs flex items-start gap-3 shadow-subtle',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon ?? defaultIcons[variant]}
      <div className="space-y-1">
        {title && <h5 className="font-bold tracking-tight text-sm">{title}</h5>}
        <div className="text-xs leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}
