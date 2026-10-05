import React from 'react';
import Link from 'next/link';
import { Calculator, ShieldCheck, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-brand-200 bg-brand-50/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-900 flex items-center justify-center text-white">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-brand-900">Hisobchi</span>
            </div>
            <p className="text-xs text-brand-600 leading-relaxed">
              O‘zbekiston Respublikasining davlat bojlari, sud to‘lovlari, notarial xarajatlar va boshqa rasmiy to‘lovlarini aniq hamda tushunarli hisoblash platformasi.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Rasmiy manbalar arxitekturasi</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-900 mb-3">
              Asosiy bo‘limlar
            </h4>
            <ul className="space-y-2 text-xs text-brand-600">
              <li>
                <Link href="/" className="hover:text-brand-900 transition-colors">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-brand-900 transition-colors">
                  Barcha kalkulyatorlar
                </Link>
              </li>
              <li>
                <Link href="/calculators/fhdyo-tugilganlik-guvohnomasi" className="hover:text-brand-900 transition-colors">
                  Tug‘ilganlik guvohnomasi (GOV-001)
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-brand-900 transition-colors">
                  Shaffoflik va manbalar
                </a>
              </li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-900 mb-3">
              Yo‘nalishlar
            </h4>
            <ul className="space-y-2 text-xs text-brand-600">
              <li>
                <Link href="/calculators?category=sud" className="hover:text-brand-900 transition-colors">
                  Sud bojlari
                </Link>
              </li>
              <li>
                <Link href="/calculators?category=notarius" className="hover:text-brand-900 transition-colors">
                  Notarius xarajatlari
                </Link>
              </li>
              <li>
                <Link href="/calculators?category=avtomobil" className="hover:text-brand-900 transition-colors">
                  Avtomobil to‘lovlari
                </Link>
              </li>
              <li>
                <Link href="/calculators?category=uy-joy" className="hover:text-brand-900 transition-colors">
                  Uy-joy va ko‘chmas mulk
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Disclaimer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-900 mb-3">
              Rasmiy portallar
            </h4>
            <ul className="space-y-2 text-xs text-brand-600">
              <li>
                <a
                  href="https://lex.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brand-900 transition-colors"
                >
                  <span>Lex.uz — Qonun hujjatlari milliy bazasi</span>
                  <ExternalLink className="w-3 h-3 text-brand-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://my.gov.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brand-900 transition-colors"
                >
                  <span>My.gov.uz — Yagona interaktiv xizmatlar</span>
                  <ExternalLink className="w-3 h-3 text-brand-400" />
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-xl bg-white border border-brand-200 text-[11px] text-brand-500 leading-snug">
              Hisobchi — rasmiy hisob-kitoblarni tushunarli qilish uchun mustaqil loyiha. Barcha hisoblar faqat axborot berish maqsadida ko‘rsatiladi.
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-500 gap-4">
          <p>© {new Date().getFullYear()} Hisobchi. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>GovMind · Hisobchi</span>
            <Link href="/pitch" className="underline">Pitch Day 3.0 · Prototip</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
