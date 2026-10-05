import * as React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-brand-500', className)}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-brand-900 transition-colors py-1"
            title="Bosh sahifa"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Bosh sahifa</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-brand-300 shrink-0" />
            {item.href && !item.isCurrent ? (
              <Link href={item.href} className="hover:text-brand-900 transition-colors py-1">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-brand-900 truncate max-w-[220px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
