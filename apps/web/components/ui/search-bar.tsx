'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { searchCalculators, SearchResult, DEFAULT_SEARCH_SUGGESTIONS } from '@/lib/search';
import { Badge } from './badge';

interface SearchBarProps {
  initialQuery?: string;
  size?: 'large' | 'normal';
  placeholder?: string;
}

export function SearchBar({
  initialQuery = '',
  size = 'normal',
  placeholder = 'Nimani hisoblamoqchisiz? Masalan: uy sotish, sud boji, mashina olib kirish...',
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setQuery(initialQuery); }, [initialQuery]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const res = searchCalculators(query);
    setResults(res.results.slice(0, 5));
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/calculators?search=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectSuggestion = (s: string) => {
    setQuery(s);
    setIsOpen(false);
    router.push(`/calculators?search=${encodeURIComponent(s)}`);
  };

  const isLarge = size === 'large';

  return (
    <div className="w-full max-w-3xl mx-auto relative" ref={containerRef}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-brand-400">
          <Search className={isLarge ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-5 sm:h-5'} />
        </div>

        <input
          type="text"
          aria-label="Kalkulyator qidirish"
          maxLength={160}
          id="universal-search-input"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full bg-white text-brand-900 border border-brand-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-900/10 focus:border-brand-900 transition-all placeholder:text-brand-400 font-medium ${
            isLarge
              ? 'py-3.5 sm:py-4 pl-12 sm:pl-14 pr-24 sm:pr-32 text-sm sm:text-base shadow-card'
              : 'py-2.5 pl-10 sm:pl-12 pr-20 sm:pr-24 text-xs sm:text-sm shadow-subtle'
          }`}
        />

        <button
          type="submit"
          id="universal-search-submit"
          className={`absolute right-2 flex items-center gap-1.5 bg-brand-900 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors shadow-subtle ${
            isLarge ? 'px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm' : 'px-3 py-1.5 text-xs'
          }`}
        >
          <span>Qidirish</span>
          <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
        </button>
      </form>

      {/* Real-time search suggestions dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl border border-brand-200 shadow-card p-2 text-left animate-in fade-in-0 zoom-in-95 duration-150">
          {results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-brand-400 uppercase tracking-wider flex items-center justify-between">
                <span>Topilgan kalkulyatorlar ({results.length})</span>
                <span className="text-[10px] font-normal lowercase text-brand-400">Enter orqali barchasi</span>
              </div>
              {results.map(({ item, matchType }) => (
                <Link
                  key={item.id}
                  href={item.id === 'GOV-001' ? `/calculators/${item.slug}` : `/calculators?category=${item.category}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50 transition-colors group"
                >
                  <div className="space-y-0.5 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-brand-700 bg-brand-100 px-1.5 py-0.5 rounded text-[10px]">
                        {item.id}
                      </span>
                      <span className="text-sm font-semibold text-brand-900 group-hover:text-brand-950 transition-colors truncate">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-brand-500 line-clamp-1">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.isPremium ? 'pro' : 'free'}>
                      {item.id === 'GOV-001' ? 'BEPUL' : 'REJADA'}
                    </Badge>
                    <CornerDownLeft className="w-3.5 h-3.5 text-brand-300 group-hover:text-brand-700 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center space-y-3">
              <div className="text-sm font-bold text-brand-900">Hech narsa topilmadi</div>
              <p className="text-xs text-brand-500">
                "{query}" bo‘yicha hech qanday kalkulyator topilmadi.
              </p>
              <div className="pt-2 border-t border-brand-100 space-y-2">
                <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider block">
                  Tavsiya etilgan qidiruvlar:
                </span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {DEFAULT_SEARCH_SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSuggestion(s)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggested Quick Tags underneath Hero Search */}
      {isLarge && !isOpen && (
        <div className="flex flex-wrap items-center gap-2 mt-4 justify-center text-xs text-brand-600">
          <span className="text-brand-400 font-medium">Masalan:</span>
          {['uy sotish', 'sud boji', 'mashina olib kirish', 'doverennost'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleSelectSuggestion(tag)}
              className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-brand-800 transition-colors border border-brand-200 shadow-subtle"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
