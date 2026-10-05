'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Menu, X, Search } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { SearchBar } from '@/components/ui/search-bar';
const links = [['/pitch', 'Loyiha haqida'], ['/demo', 'Demo'], ['/calculators', 'Kalkulyatorlar'], ['/api-access', 'API']];
export function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setMobile(false); setSearch(false); }, [pathname]);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearch(value => !value); }
      if (event.key === 'Escape') { setMobile(false); setSearch(false); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);
  return <header className="sticky top-0 z-40 border-b border-brand-200 bg-white/95 backdrop-blur-md print:hidden">
    <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-5">
      <Link href="/" className="flex items-center gap-2.5" aria-label="Hisobchi bosh sahifasi"><span className="bg-brand-900 text-white rounded-xl p-2"><Calculator size={22} /></span><span><span className="text-xl font-bold block leading-tight">Hisobchi</span><span className="text-[10px] text-brand-500">GovMind loyihasi</span></span></Link>
      <nav aria-label="Asosiy navigatsiya" className="hidden md:flex items-center gap-1">{links.map(([href,label]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-brand-50">{label}</Link>)}</nav>
      <div className="flex gap-1"><button type="button" aria-label="Qidirish oynasini ochish" onClick={() => setSearch(true)} className="p-2 rounded-lg hover:bg-brand-100"><Search size={21} /></button><button type="button" aria-label="Mobil menyu" aria-expanded={mobile} aria-controls="mobile-navigation" onClick={() => setMobile(value => !value)} className="p-2 rounded-lg hover:bg-brand-100 md:hidden">{mobile ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    {mobile && <nav id="mobile-navigation" aria-label="Mobil navigatsiya" className="md:hidden border-t border-brand-100 p-4 space-y-1">{links.map(([href,label]) => <Link key={href} href={href} onClick={() => setMobile(false)} className="block px-3 py-3 rounded-lg hover:bg-brand-50 font-medium">{label}</Link>)}</nav>}
    <Dialog isOpen={search} onClose={() => setSearch(false)} maxWidth="lg" title="Kalkulyator qidiruvi"><SearchBar /></Dialog>
  </header>;
}
