import React from 'react';
import Link from 'next/link';
import { Category } from '@govcalc/types';
import {
  Landmark,
  Scale,
  FileCheck,
  Car,
  Receipt,
  ShieldCheck,
  Home,
  Zap,
  Globe,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
  Calculator,
  ArrowUpRight,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Landmark,
  Scale,
  FileCheck,
  Car,
  Receipt,
  ShieldCheck,
  Home,
  Zap,
  Globe,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
  Calculator,
};

export function CategoryCard({ category }: { category: Category }) {
  const IconComponent = ICON_MAP[category.icon] || Calculator;

  return (
    <Link
      href={`/calculators?category=${category.slug}`}
      className="group flex flex-col justify-between p-5 bg-white rounded-xl border border-brand-200 hover:border-brand-400 hover:shadow-card transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-800 group-hover:bg-brand-900 group-hover:text-white transition-colors">
            <IconComponent className="w-5 h-5" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-brand-300 group-hover:text-brand-700 transition-colors" />
        </div>
        <h3 className="text-sm font-bold text-brand-900 group-hover:text-brand-800 tracking-tight">
          {category.nameUz}
        </h3>
        <p className="text-xs text-brand-500 mt-1.5 line-clamp-2 leading-relaxed">
          {category.descriptionUz}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-brand-100 flex items-center justify-between text-[11px] text-brand-400 font-medium">
        <span>{category.calculatorCount || 0} ta kalkulyator</span>
        <span className="text-brand-600 group-hover:translate-x-0.5 transition-transform font-semibold">
          Hisoblash &rarr;
        </span>
      </div>
    </Link>
  );
}
