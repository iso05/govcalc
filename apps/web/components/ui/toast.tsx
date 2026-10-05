'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, X } from 'lucide-react';

export interface ToastProps {
  message: string | null;
  onClose: () => void;
  icon?: React.ReactNode;
  duration?: number;
}

export function Toast({ message, onClose, icon, duration = 2500 }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3',
        'bg-brand-950 text-white rounded-2xl shadow-xl border border-brand-800',
        'text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200 select-none'
      )}
    >
      <div className="text-emerald-400 shrink-0">
        {icon || <CheckCircle2 className="w-4 h-4" />}
      </div>
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-brand-400 hover:text-white p-0.5 rounded transition-colors focus:outline-none"
        aria-label="Xabarni yopish"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
