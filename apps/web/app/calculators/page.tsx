import React from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/ui/search-bar';
import { CalculatorCard } from '@/components/calculator/calculator-card';
import { OFFICIAL_CATEGORIES, MOCK_CALCULATORS_INDEX } from '@govcalc/config';
import { searchCalculators } from '@/lib/search';
import { Breadcrumbs } from '@/components/ui/breadcrumb';
import { EmptyState } from '@/components/ui/state-views';
import { Filter, Sparkles, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Kalkulyatorlar Katalogi — Hisobchi',
  description:
    'O‘zbekiston davlat to‘lovlari, sud, soliq, notarius, avtomobil va ko‘chmas mulk xarajatlarini hisoblovchi kalkulyatorlar katalogi.',
};

interface CalculatorsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    filter?: 'all' | 'popular' | 'newest' | 'free' | 'pro';
  }>;
}

export default async function CalculatorsPage({ searchParams }: CalculatorsPageProps) {
  const { search, category, filter = 'all' } = await searchParams;

  // Perform search / filtering using our search engine
  const searchResult = searchCalculators(search || '', category);
  let items = searchResult.results.map((r) => r.item);

  // Apply tab filter: popular, newest, free, pro
  if (filter === 'free') {
    items = items.filter((item) => !item.isPremium);
  } else if (filter === 'pro') {
    items = items.filter((item) => item.isPremium);
  } else if (filter === 'popular') {
    // Top popular IDs
    const popularIds = ['GOV-001', 'CRT-001', 'NOT-002', 'CAD-008'];
    items = items.filter((item) => popularIds.includes(item.id));
  } else if (filter === 'newest') {
    items = [...items].reverse();
  }

  const availableCalculators = items.filter((item) => item.id === 'GOV-001');
  const activeCategory = OFFICIAL_CATEGORIES.find((c) => c.slug === category);
  const allCategoriesQuery = new URLSearchParams();
  if (filter !== 'all') allCategoriesQuery.set('filter', filter);
  if (search) allCategoriesQuery.set('search', search);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: 'Kalkulyatorlar', href: '/calculators', isCurrent: !category },
          ...(activeCategory ? [{ label: activeCategory.nameUz, isCurrent: true }] : []),
        ]}
      />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-brand-200">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
              Katalog
            </span>
            <Badge variant="mock">PROTOTIP</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
            {activeCategory
              ? `${activeCategory.nameUz} kalkulyatorlari`
              : 'Barcha rasmiy kalkulyatorlar katalogi'}
          </h1>
          <p className="text-xs sm:text-sm text-brand-600">
            {activeCategory
              ? activeCategory.descriptionUz
              : 'O‘zbekiston Respublikasi rasmiy qonunchiligiga muvofiq to‘lovlar va davlat bojlari.'}
          </p>
        </div>

        <div className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-xl border border-brand-200 self-start md:self-auto">
          Mavjud: <strong className="text-brand-900">{availableCalculators.length} ta</strong> kalkulyator
        </div>
      </div>

      {/* Global Search Component */}
      <div>
        <SearchBar initialQuery={search || ''} />
      </div>

      {/* Quick Filters Bar: All, Popular, Newest, FREE, PRO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills Slider */}
        <nav aria-label="Kalkulyator yo‘nalishlari" className="flex items-center gap-1.5 overflow-x-auto pb-2 custom-scrollbar">
          <Link
            href={allCategoriesQuery.size ? `/calculators?${allCategoriesQuery}` : '/calculators'}
            aria-current={!category ? 'page' : undefined}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
              !category
                ? 'bg-brand-900 text-white border-brand-900 shadow-subtle'
                : 'bg-white text-brand-700 border-brand-200 hover:border-brand-400'
            }`}
          >
            Barchasi
          </Link>
          {OFFICIAL_CATEGORIES.map((cat) => {
            const isSelected = category === cat.slug;
            const queryParams = new URLSearchParams();
            queryParams.set('category', cat.slug);
            if (filter !== 'all') queryParams.set('filter', filter);
            if (search) queryParams.set('search', search);

            return (
              <Link
                key={cat.id}
                aria-current={isSelected ? 'page' : undefined}
                href={`/calculators?${queryParams.toString()}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                  isSelected
                    ? 'bg-brand-900 text-white border-brand-900 shadow-subtle'
                    : 'bg-white text-brand-700 border-brand-200 hover:border-brand-400'
                }`}
              >
                {cat.nameUz}
              </Link>
            );
          })}
        </nav>

        {/* Status / Sort Tabs: All, Popular, Newest, Free, Pro */}
        <nav aria-label="Kalkulyator filtrlari" className="flex items-center gap-1 bg-brand-100/70 p-1 rounded-xl border border-brand-200 self-start sm:self-auto shrink-0 text-xs">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'popular', label: 'Ommabop' },
            { id: 'newest', label: 'Eng yangi' },
            { id: 'free', label: 'FREE' },
            { id: 'pro', label: 'PRO' },
          ].map((tab) => {
            const isTabActive = filter === tab.id;
            const q = new URLSearchParams();
            if (category) q.set('category', category);
            if (search) q.set('search', search);
            if (tab.id !== 'all') q.set('filter', tab.id);

            return (
              <Link
                key={tab.id}
                aria-current={isTabActive ? 'page' : undefined}
                href={q.size ? `/calculators?${q}` : '/calculators'}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  isTabActive
                    ? 'bg-white text-brand-900 shadow-subtle'
                    : 'text-brand-600 hover:text-brand-900'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Calculator Cards Grid */}
      {availableCalculators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {availableCalculators.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
          <div className="rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <Clock className="w-8 h-8 text-brand-400 mb-3" />
            <span className="text-base sm:text-lg font-bold text-brand-800">Tez kunda</span>
            <p className="text-xs text-brand-500 mt-1">Yangi kalkulyatorlar tez kunda qo‘shiladi.</p>
          </div>
        </div>
      ) : (
        <EmptyState
          title={search ? 'Hech narsa topilmadi' : filter === 'pro' ? 'PRO kalkulyatorlar hali qo‘shilmagan' : 'Bu yo‘nalish tayyorlanmoqda'}
          description={
            search
              ? `"${search}" so‘rovi va tanlangan filtrlar bo‘yicha ishlaydigan kalkulyator topilmadi.`
              : 'Hozir tug‘ilganlik guvohnomasi kalkulyatori mavjud. Boshqa xizmatlar bosqichma-bosqich qo‘shiladi.'
          }
          suggestions={searchResult.suggestions}
          actionText="Filtrlarni tozalash"
          actionHref="/calculators"
        />
      )}
    </div>
  );
}
