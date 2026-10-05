import React from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/ui/search-bar';
import { CategoryCard } from '@/components/calculator/category-card';
import { CalculatorCard } from '@/components/calculator/calculator-card';
import { OFFICIAL_CATEGORIES, MOCK_CALCULATORS_INDEX } from '@govcalc/config';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Calculator,
  Scale,
  Sparkles,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  ExternalLink,
  Layers,
  Search,
  Check,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Hisobchi — O‘zbekiston Rasmiy To‘lovlar va Xarajatlar Platformasi',
  description:
    'Rasmiy to‘lovlarni tushunish va hisoblash oson. Sud boji, soliq, notarius, avtomobil, uy-joy va boshqa rasmiy xarajatlarni tushunarli tarzda hisoblang.',
};

export default function HomePage() {
  const popularCalculators = MOCK_CALCULATORS_INDEX.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <div className="bg-brand-900 text-white px-5 py-4 flex flex-wrap justify-center items-center gap-3 text-sm"><span>GovMind · Pitch Day 3.0</span><Link className="text-emerald-300 underline font-semibold" href="/pitch">Loyiha taqdimoti →</Link><Link className="underline" href="/demo">Demoni ko‘rish</Link></div>
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-b border-brand-200/80 bg-gradient-to-b from-brand-50/70 via-white to-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold border border-brand-200 shadow-subtle">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Rasmiy qonunchilik asosidagi tushunarli hisob-kitoblar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-900 tracking-tight leading-tight">
            Rasmiy to‘lovlarni tushunish va hisoblash oson.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-600 leading-relaxed font-normal">
            Sud boji, soliq, notarius, avtomobil, uy-joy va boshqa rasmiy xarajatlarni tushunarli tarzda hisoblang.
          </p>

          {/* Main Universal Search */}
          <div className="pt-3">
            <SearchBar
              size="large"
              placeholder="Nimani hisoblamoqchisiz? Masalan: uy sotish, sud boji, mashina olib kirish..."
            />
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-brand-600 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% tushunarli formulalar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Rasmiy LexUZ manbalari</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Yashirin to‘lovlarsiz aniqlik</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-500 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-brand-700" />
              <span>Prototip imkoniyatlari</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-900 tracking-tight">
              Mavjud kalkulyator
            </h2>
          </div>
          <Link
            href="/calculators"
            className="text-xs font-semibold text-brand-900 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>Barcha kalkulyatorlar katalogi</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {popularCalculators
            .filter((calc) => calc.id === 'GOV-001')
            .map((calc) => (
              <CalculatorCard key={calc.id} calculator={calc} />
            ))}
          <div className="rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <Clock className="w-8 h-8 text-brand-400 mb-3" />
            <span className="text-base sm:text-lg font-bold text-brand-800">Tez kunda</span>
            <p className="text-xs text-brand-500 mt-1">Yangi kalkulyatorlar tez kunda qo‘shiladi.</p>
          </div>
        </div>
      </section>

      {/* 10 Categories Grid */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
            Yo‘nalishlar
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-900 tracking-tight mt-1">
            Hisoblash toifalari bo‘yicha tanlang
          </h2>
          <p className="text-xs text-brand-500 mt-1">
            O‘zbekiston davlat to‘lovlari, sud, soliq va notariatning asosiy yo‘nalishlari
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {OFFICIAL_CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={{
                id: cat.id,
                slug: cat.slug,
                nameUz: cat.nameUz,
                nameRu: cat.nameRu,
                nameEn: cat.nameEn,
                descriptionUz: cat.descriptionUz,
                icon: cat.icon,
                calculatorCount: cat.calculatorsCount,
                sortOrder: 1,
              }}
            />
          ))}
        </div>
      </section>

      {/* How It Works — 3 Simple Steps */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-900 text-white rounded-3xl p-8 sm:p-12 shadow-card">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
              Qanday ishlaydi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              3 oddiy qadamda rasmiy xarajatlaringizni biling
            </h2>
            <p className="text-xs sm:text-sm text-brand-300 mt-2 leading-relaxed">
              Hisobchi yuridik va moliyaviy bilimlarga ega bo‘lmagan har bir oddiy fuqaroga o‘z
              huquq va to‘lovlarini oson tushunishga yordam beradi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-800/60 border border-brand-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white font-mono font-bold text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-white">Xizmatni tanlang</h3>
              <p className="text-xs text-brand-300 leading-relaxed">
                Katalogdan kerakli xizmat, sud arizasi, notarial harakat yoki soliq turini tanlang.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-800/60 border border-brand-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white font-mono font-bold text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-white">Ma’lumotlarni kiriting</h3>
              <p className="text-xs text-brand-300 leading-relaxed">
                Oddiy va tushunarli savollarga javob bering (masalan: ko‘chmas mulk maydoni yoki da’vo summasi).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-800/60 border border-brand-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white font-mono font-bold text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-white">Natijani oling</h3>
              <p className="text-xs text-brand-300 leading-relaxed">
                Aniq taxminiy summa, qadamma-qadam to‘lov tarkibi va rasmiy LexUZ qonuniy asosini oling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust and Legal Transparency Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl border border-brand-200 bg-brand-50/50 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
                Shaffoflik va Ishonch
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-900 tracking-tight mt-1">
                Manbalar va tekshirish holati
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3.5 py-1.5 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Qonuniy manbalar arxitekturasi</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-brand-700 leading-relaxed max-w-4xl">
            Hisobchi platformasidagi har bir kalkulyator qonun hujjatlarining rasmiy manbalariga
            bog‘langan. Prototipdagi qoidalar va imtiyozlar huquqiy tekshiruvdan o‘tkazilishi kerak. Qonunchilik o‘zgarganda har bir kalkulyator yangi versiya bilan
            chiqariladi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-5 bg-white rounded-2xl border border-brand-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-900 text-sm">LexUZ manba havolalari</span>
                <Badge variant="verified">Rasmiy Hujjat</Badge>
              </div>
              <p className="text-brand-600 leading-relaxed">
                O‘zbekiston Respublikasi Adliya vazirligi qonunchilik ma’lumotlari milliy bazasi
                (lex.uz) dagi hujjat raqami, moddasi va bandi ko‘rsatiladi.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-brand-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-900 text-sm">Versiyalangan Dvigatel</span>
                <Badge variant="outline">Qat’iy Nazorat</Badge>
              </div>
              <p className="text-brand-600 leading-relaxed">
                BHM sanalar bo‘yicha saqlanadi. Tarixiy BHM bilan hisoblash tarixiy qonunchilikning to‘liq nusxasi emas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">FAQ</span>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-900 tracking-tight mt-1">
            Ko‘p beriladigan savollar
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Hisobchi hisob-kitoblari qonuniy to‘g‘rimi?',
              a: 'Hisobchi hisob-kitoblari O‘zbekiston Respublikasining rasmiy qonunlari, Vazirlar Mahkamasi qarorlari va me’yoriy hujjatlardagi ochiq stavkalar asosida tuziladi. Har bir natijada qaysi qonun va moddaga asoslangani ko‘rsatiladi.',
            },
            {
              q: 'Ushbu xizmatdan foydalanish bepulmi?',
              a: 'Ha, asosiy fuqarolik kalkulyatorlaridan foydalanish mutlaqo bepul. Maxsus murakkab korporativ yoki ko‘p tarmoqli hisob-kitoblar uchun PRO rejimlar keyinchalik taqdim etiladi.',
            },
            {
              q: 'Natijani chop etish yoki boshqalar bilan ulashish mumkinmi?',
              a: 'Ha. Hisoblash amalga oshirilgach, natijani havola orqali nusxalash, saqlash yoki "Chop etish / PDF" tugmasi orqali qog‘ozga chiqarish mumkin.',
            },
            {
              q: 'Nega kalkulyatorlarda taxminiy summa ko‘rsatiladi?',
              a: 'Ko‘p davlat to‘lovlari fuqaroning aniq holati (ijtimoiy imtiyozlar, nogironlik, hujjat berish muddati, qo‘shimcha xizmatlar) ga bog‘liq. Hisobchi kiritilgan aniq parametrlarga qat’iy mos keluvchi rasmiy summani hisoblab beradi.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-brand-200 shadow-subtle space-y-2">
              <h3 className="text-sm font-bold text-brand-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{item.q}</span>
              </h3>
              <p className="text-xs text-brand-600 leading-relaxed pl-6">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
