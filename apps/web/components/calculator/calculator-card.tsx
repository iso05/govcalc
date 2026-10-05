import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export interface CalculatorCardData {
  id?: string;
  code?: string;
  slug: string;
  title?: string;
  nameUz?: string;
  description?: string;
  descriptionUz?: string;
  category?: string;
  categorySlug?: string;
  isPremium?: boolean;
  status?: string;
  estimatedMinutes?: number;
}

export function CalculatorCard({ calculator }: { calculator: CalculatorCardData }) {
  const title = calculator.title || calculator.nameUz || 'Kalkulyator';
  const description = calculator.description || calculator.descriptionUz || '';
  const code = calculator.code || calculator.id || 'CALC';
  const isPremium = Boolean(calculator.isPremium);

  return (
    <Link
      href={`/calculators/${calculator.slug}`}
      className="group flex flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-brand-200 hover:border-brand-900 hover:shadow-card transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono font-semibold text-brand-700 bg-brand-100 px-2 py-0.5 rounded-lg border border-brand-200">
              {code}
            </span>
            <Badge variant="mock">PROTOTIP</Badge>
          </div>

          <div className="flex items-center gap-1.5">
            <Badge variant={isPremium ? 'pro' : 'free'}>
              {isPremium ? 'PRO' : 'FREE'}
            </Badge>
          </div>
        </div>

        <h3 className="text-base font-bold text-brand-900 group-hover:text-brand-950 tracking-tight leading-snug">
          {title}
        </h3>

        <p className="text-xs text-brand-600 mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-brand-100 flex items-center justify-between text-xs text-brand-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            <span>~{calculator.estimatedMinutes || 2} daqiqa</span>
          </span>
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rasmiy manba</span>
          </span>
        </div>

        <span className="font-semibold text-brand-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          <span>Hisoblash</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
