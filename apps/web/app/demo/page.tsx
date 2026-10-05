import Link from 'next/link';
import { PlayCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { pitch } from '@/lib/pitch';

export const metadata = {
  title: 'Demo — GovMind / Hisobchi',
  description: 'Hisobchi: davlat to‘lovlarini topish va holatga mos hisoblash platformasi. 4 daqiqa 36 soniyalik demo-video va ishlaydigan prototip.',
  alternates: { canonical: '/demo' },
};

export default function DemoPage() {
  const directVideo = /\.(mp4|webm)(\?|$)/i.test(pitch.videoUrl);
  const originalVideo = pitch.videoUrl.endsWith('/hisobchi-demo-20261005.mp4');
  return <div className="max-w-5xl mx-auto px-5 py-12 sm:py-16 space-y-10">
    <header>
      <Link href="/pitch" className="text-sm text-brand-500 hover:text-brand-900">← GovMind taqdimoti</Link>
      <p className="text-emerald-700 font-semibold text-sm mt-8">Pitch Day 3.0 / Demo</p>
      <h1 className="text-3xl sm:text-5xl font-bold mt-3">Xizmatga borishdan oldin xarajatni tushuning.</h1>
      <p className="text-lg text-brand-600 mt-5 max-w-3xl">Hisobchi bilan tanishing: davlat xizmatlari narxini topish, o‘z holatingizga mos hisoblash va huquqiy manbasini ko‘rish uchun yaratilayotgan platforma.</p>
    </header>
    <section aria-labelledby="video-title" className="rounded-3xl overflow-hidden border border-brand-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
        <div><h2 id="video-title" className="text-xl font-bold">Hisobchi — loyiha va jonli demo</h2><p className="text-sm text-brand-500 mt-1">Muhammadiso Jo‘rayev · GovMind asoschisi</p></div>
        {originalVideo && <span className="rounded-full bg-emerald-50 text-emerald-800 px-3 py-1.5 text-sm font-medium">4:36 · O‘zbek tilida</span>}
      </div>
      {directVideo ? <video controls playsInline preload="metadata" poster={originalVideo ? '/media/hisobchi-demo-20261005.jpg' : undefined} className="w-full aspect-video bg-brand-950" aria-label="Hisobchi demo-videosi">
        <source src={pitch.videoUrl} type={/\.mp4(\?|$)/i.test(pitch.videoUrl) ? 'video/mp4' : 'video/webm'} />
        Brauzeringiz videoni ijro eta olmayapti. <a href={pitch.videoUrl}>Videoni alohida oching</a>.
      </video> : <div className="min-h-64 bg-brand-950 text-white flex flex-col items-center justify-center p-8 text-center"><PlayCircle size={48} className="text-emerald-300" /><p className="mt-4">Namoyishni video sahifasida tomosha qiling.</p><a href={pitch.videoUrl} target="_blank" rel="noopener noreferrer" className="mt-6 bg-emerald-300 text-brand-950 font-semibold px-5 py-3 rounded-xl">Videoni tomosha qilish ↗</a></div>}
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 text-sm bg-brand-50 border-t border-brand-200">
        <p className="text-brand-600">Videoni boshlash uchun ▶ tugmasini bosing.</p>
        <a href={pitch.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-700 font-semibold">Videoni alohida ochish <ExternalLink size={15} /></a>
      </div>
    </section>
    <section aria-labelledby="description-title">
      <h2 id="description-title" className="text-2xl font-bold">Demo tavsifi</h2>
      <p className="mt-4 text-brand-600 leading-relaxed">Davlat xizmati uchun qancha to‘lash kerak? Javob xizmat turi, murojaat usuli va fuqaroning holatiga bog‘liq. Ushbu videoda GovMind asoschisi Hisobchi g‘oyasi va birinchi ishlaydigan modul — tug‘ilganlik guvohnomasi kalkulyatorini taqdim etadi. Namoyish foydalanuvchi vaziyatini hisobga olish, to‘lov tarkibini tushunarli ko‘rsatish va natijani huquqiy manba bilan bog‘lash yondashuvini tanishtiradi.</p>
      <p className="mt-4 text-brand-600 leading-relaxed">Guvohnoma — katta platformaning boshlanishi. Davlat to‘lovlari bo‘yicha 45+ kalkulyator, keng huquqiy qidiruv va tashkilotlar uchun moslashtirilgan hisoblagichlar keyingi bosqichlarda rejalashtirilgan. Hozirgi holat — ishlaydigan prototip.</p>
      <ol className="grid sm:grid-cols-3 gap-4 mt-6">{[
        ['01', 'Muammo va yechim', 'Xizmat narxini topish, ma’lumotning yangiligini va o‘z holatingizga mosligini tushunish.'],
        ['02', 'Ishlaydigan prototip', 'Guvohnoma bilan bog‘liq vaziyatni tanlash va to‘lov qismlarini ko‘rish.'],
        ['03', 'Platforma istiqboli', 'Yangi kalkulyatorlar, manbaga tayangan qidiruv va tashkilotlar uchun xizmatlar.'],
      ].map(([n, title, text]) => <li key={n} className="bg-brand-50 rounded-2xl border border-brand-200 p-5"><span className="text-emerald-700 text-sm font-mono">{n}</span><h3 className="font-bold mt-3">{title}</h3><p className="text-sm text-brand-600 mt-2">{text}</p></li>)}</ol>
    </section>
    <section className="rounded-2xl bg-brand-900 text-white p-7 sm:p-8">
      <h2 className="text-2xl font-bold">Endi o‘zingiz sinab ko‘ring</h2>
      <p className="text-brand-300 mt-3">Ishlayotgan prototip ochiq. Ro‘yxatdan o‘tish, ism yoki pasport ma’lumotlarini kiritish talab qilinmaydi.</p>
      <div className="flex flex-wrap gap-4 items-center mt-6"><Link href={pitch.prototype} className="inline-flex gap-2 items-center bg-emerald-300 text-brand-950 rounded-xl px-5 py-3 font-semibold">Kalkulyatorni ochish <ArrowRight size={18} /></Link><Link href="/pitch" className="text-white underline underline-offset-4">Jamoa va yo‘l xaritasi</Link></div>
    </section>
    <p className="text-sm text-brand-500">Prototip natijasi to‘lov kvitansiyasi emas. Stavkalar va imtiyozlar bo‘yicha tekshirish holatini natija bilan birga o‘qing.</p>
  </div>;
}
