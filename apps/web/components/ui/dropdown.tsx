'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  label: React.ReactNode;
  items: DropdownItem[];
  className?: string;
}

export function Dropdown({ label, items, className }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-brand-700 hover:text-brand-900 bg-white hover:bg-brand-50 border border-brand-200 rounded-xl shadow-subtle transition-all focus:outline-none focus:ring-2 focus:ring-brand-900/10"
      >
        <span>{label}</span>
        <ChevronDown className={cn('w-3.5 h-3.5 text-brand-400 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-48 origin-top-right rounded-xl bg-white p-1.5 shadow-card border border-brand-200 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-150">
          {items.map((item) => (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-brand-800 hover:bg-brand-50 hover:text-brand-900 rounded-lg transition-colors disabled:opacity-40 text-left"
            >
              {item.icon && <span className="text-brand-400">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
