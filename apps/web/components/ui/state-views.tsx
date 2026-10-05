'use client';

import * as React from 'react';
import Link from 'next/link';
import { Loader2, SearchX, AlertTriangle, FileQuestion, ShieldAlert, ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = 'Ma’lumotlar yuklanmoqda...', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-center space-y-3', className)}>
      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-900">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
      <p className="text-xs font-medium text-brand-600 animate-pulse">{message}</p>
    </div>
  );
}

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  suggestions?: string[];
  onSelectSuggestion?: (s: string) => void;
  className?: string;
}

export function EmptyState({
  title = 'Hech narsa topilmadi',
  description = 'Qidiruv parametrlarini o‘zgartirib ko‘ring yoki taklif qilingan so‘rovlardan foydalaning.',
  actionText,
  actionHref,
  onAction,
  suggestions,
  onSelectSuggestion,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40', className)}>
      <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-500">
        <SearchX className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold text-brand-900">{title}</h4>
        <p className="text-xs text-brand-500 leading-relaxed">{description}</p>
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="pt-2 space-y-1.5 w-full">
          <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider block">
            Tavsiya etilgan qidiruvlar:
          </span>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {suggestions.map((s, idx) => onSelectSuggestion ? (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSuggestion?.(s)}
                className="text-xs px-2.5 py-1 rounded-lg bg-white border border-brand-200 text-brand-700 hover:text-brand-900 hover:border-brand-300 transition-colors"
              >
                {s}
              </button>
            ) : (
              <Link
                key={idx}
                href={`/calculators?search=${encodeURIComponent(s)}`}
                className="text-xs px-2.5 py-1 rounded-lg bg-white border border-brand-200 text-brand-700 hover:text-brand-900 hover:border-brand-300 transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      )}

      {actionText && (
        <div className="pt-2">
          {actionHref ? (
            <Link href={actionHref}>
              <Button size="sm" variant="outline">
                {actionText}
              </Button>
            </Link>
          ) : (
            <Button size="sm" variant="outline" onClick={onAction}>
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Xatolik yuz berdi',
  message = 'Xizmat bilan bog‘lanishda kutilmagan nosozlik yuz berdi. Iltimos, qayta urinib ko‘ring.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 rounded-2xl border border-red-200 bg-red-50/40', className)}>
      <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold text-red-950">{title}</h4>
        <p className="text-xs text-red-700 leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <div className="pt-2">
          <Button size="sm" variant="outline" onClick={onRetry} className="gap-1.5 border-red-300 hover:bg-red-50">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta urinish</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export interface NotFoundStateProps {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export function NotFoundState({
  title = 'Kalkulyator topilmadi',
  description = 'Siz qidirayotgan kalkulyator tizimda mavjud emas yoki nomi o‘zgargan bo‘lishi mumkin.',
  backHref = '/calculators',
  backLabel = 'Kalkulyatorlar ro‘yxatiga qaytish',
  className,
}: NotFoundStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-center max-w-lg mx-auto space-y-4', className)}>
      <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600">
        <FileQuestion className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <span className="text-xs font-bold text-brand-500 uppercase tracking-wider font-mono">404 — Not Found</span>
        <h3 className="text-xl font-bold text-brand-900">{title}</h3>
        <p className="text-xs text-brand-500 leading-relaxed">{description}</p>
      </div>

      <div className="pt-2">
        <Link href={backHref}>
          <Button size="sm" variant="secondary" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export interface ValidationErrorStateProps {
  errors: string[];
  className?: string;
}

export function ValidationErrorState({ errors, className }: ValidationErrorStateProps) {
  if (!errors.length) return null;
  return (
    <div className={cn('p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-800 space-y-2', className)}>
      <div className="flex items-center gap-2 font-bold text-red-900">
        <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
        <span>Kiritilgan ma’lumotlarda xatolik mavjud:</span>
      </div>
      <ul className="list-disc list-inside space-y-1 text-red-700 pl-1">
        {errors.map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>
    </div>
  );
}
