import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MOCK_CALCULATORS_INDEX, getBhmForDate } from '@govcalc/config';
import { formatUzbekCurrency } from '@govcalc/ui';
import { CalculatorForm } from '@/components/calculator/calculator-form';
import { Breadcrumbs } from '@/components/ui/breadcrumb';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const calc = MOCK_CALCULATORS_INDEX.find(item => item.slug === slug && item.id === 'GOV-001');
  return { title: calc?.title || 'Kalkulyator topilmadi', alternates: { canonical: '/calculators/' + slug } };
}
export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = MOCK_CALCULATORS_INDEX.find(item => item.slug === slug && item.id === 'GOV-001');
  if (!calc) notFound();
  const rate = getBhmForDate();
  return <div className="max-w-4xl mx-auto px-5 py-10 space-y-8">
    <div className="print:hidden"><Breadcrumbs items={[{ label: 'Kalkulyatorlar', href: '/calculators' }, { label: calc.title, isCurrent: true }]} /></div>
    <header className="print:hidden"><span className="inline-block rounded-lg bg-brand-100 px-3 py-1 text-xs font-semibold">GOV-001 · Prototip</span><h1 className="text-3xl sm:text-4xl font-bold mt-4">{calc.title}</h1><p className="text-brand-600 mt-4">{calc.description}</p><p className="text-sm text-brand-500 mt-3">Hisoblash uchun BHM: {formatUzbekCurrency(rate.value)} · {rate.status === 'PROVISIONAL' ? 'tekshirish talab qilinadi' : 'manba mavjud'}</p></header>
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900 print:hidden"><strong>Namoyish prototipi.</strong> Hisoblash qoidalari va imtiyozlar bo‘yicha yakuniy huquqiy tekshiruv tugallanmagan. Natija bilan birga formula, manba va tekshirish holati beriladi.</div>
    <CalculatorForm slug={calc.slug} calculatorTitle={calc.title} />
    <section className="rounded-2xl border border-brand-200 p-6 print:hidden"><h2 className="text-xl font-bold">Manbalar</h2><p className="text-sm text-brand-600 mt-3">Quyidagi rasmiy manbalar tekshirish uchun keltirilgan. Havolaning mavjudligi barcha holatlar huquqiy tasdiqlanganini anglatmaydi.</p><ul className="mt-5 space-y-4">{[
      ['Davlat boji to‘g‘risidagi qonun — O‘RQ-600', 'https://lex.uz/docs/-4680944'],
      ['FHDYO qoidalari — VMQ 550', 'https://lex.uz/uz/docs/-6638940'],
      ['Birinchi guvohnoma — my.gov.uz 913', 'https://my.gov.uz/uz/service/913'],
      ['Takroriy guvohnoma — my.gov.uz 865', 'https://my.gov.uz/uz/service/865'],
    ].map(([label, url]) => <li key={url}><a className="text-sm text-emerald-700 underline" href={url} target="_blank" rel="noopener noreferrer">{label} ↗</a></li>)}</ul></section>
    <section className="print:hidden"><h2 className="text-xl font-bold">Hisob-kitob haqida</h2><div className="space-y-4 mt-5">{[
      ['Nega davlat boji va gerb yig‘imi alohida?', 'Ular alohida to‘lov qismlari. Birining nol bo‘lishi jami xarajat ham nol bo‘lishini anglatmaydi.'],
      ['Yetkazib berish summaga kiradimi?', 'Pochta xarajati alohida hisoblanadi. Prototip noma’lum yetkazib berish narxini summaga qo‘shmaydi.'],
      ['Imtiyozlarni qanday tekshiraman?', 'Natijadagi izoh va manba havolalarini ko‘ring. Ijtimoiy va onlayn chegirmalar kesishuvi qo‘shimcha tekshiruv talab qiladi.'],
    ].map(([q, a]) => <div key={q} className="border border-brand-200 rounded-xl p-5"><h3 className="font-semibold">{q}</h3><p className="text-sm text-brand-600 mt-2">{a}</p></div>)}</div></section>
    <Link href="/demo" className="inline-block text-emerald-700 underline print:hidden">Demo sahifasiga qaytish →</Link>
  </div>;
}
