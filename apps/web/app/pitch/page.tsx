import Link from 'next/link';
import { ArrowRight, Check, Code2, FileCheck2, Layers, Users, Compass } from 'lucide-react';
import { pitch } from '@/lib/pitch';

export const metadata = {
  title: 'GovMind — Pitch Day 3.0',
  description: 'Hisobchi — davlat xizmatlari to‘lovlarini topish, holatga mos hisoblash va huquqiy manbasini ko‘rish uchun yaratilayotgan platforma. Birinchi prototip, 45+ kalkulyator rejasi va tashkilotlar uchun obuna modeli.',
  alternates: { canonical: '/pitch' },
};

const roadmap = [
  ['Idea', 'Bajarilgan', 'Davlat xizmatlari narxini oldindan topish va shaxsiy holatga mos hisoblash muammosi tanlandi. Yechim — qidiruv, hisob-kitob va huquqiy manbani birlashtirish.'],
  ['Prototype', 'Hozir shu yerdamiz', 'Sayt internetda ochiq. Katalog qidiruvi va bitta ishlaydigan modul: tug‘ilganlik guvohnomasi, to‘lov tarkibi, manbalar, saqlash, ulashish va demo API.'],
  ['MVP', 'Keyingi bosqich', 'Fuqarolar va xizmat ko‘rsatuvchi tashkilotlar bilan ehtiyojni tekshirish; ustuvor xizmatlarni tanlash; qoidalarni huquqshunos bilan tekshirish va qidiruvni kengaytirish.'],
  ['Launched', 'Kengayish rejasi', 'Bosqichma-bosqich 45+ kalkulyatorga yetish; bepul va pullik xizmatlarni yo‘lga qo‘yish; tashkilotlar uchun moslashtirilgan hisoblagichlar va oylik obunani sinash.'],
];

const audiences = [
  ['Fuqarolar', 'Xizmatga borishdan oldin kerakli xizmatni topish, o‘z holati uchun to‘lovni bilish va xarajatni rejalashtirish.'],
  ['Davlat tashkilotlari', 'Xodimlar va murojaatchilar uchun to‘lov qoidalarini bir xil manba asosida tushuntirish, mos holatni topish va hisoblashni yengillashtirish.'],
  ['Advokatlik tuzilmalari va xususiy tashkilotlar', 'Mijoz holati uchun xarajatni hisoblash, asosini ko‘rsatish va ko‘p takrorlanadigan hisoblarni tashkilot ish jarayoniga moslashtirish.'],
];

const platformSteps = [
  ['Topish', 'Foydalanuvchi xizmat nomini yoki vaziyatini oddiy tilda yozadi. Qidiruv uni tegishli xizmat, to‘lov qoidasi va hisoblagichga olib borishi ko‘zda tutilgan.'],
  ['Holatni aniqlash', 'Xizmat turi, murojaat usuli, sana va tegishli imtiyozlar bo‘yicha savollar beriladi. Bir xizmat uchun ham barcha foydalanuvchiga bir xil summa chiqmasligi hisobga olinadi.'],
  ['Hisoblash', 'Tanlangan holatga tegishli boj, yig‘im va boshqa xarajatlar tekshirilgan qoidalar asosida ajratiladi. Noma’lum yoki alohida belgilanadigan xarajatlar ochiq ko‘rsatiladi.'],
  ['Asosini ko‘rish', 'Natijada huquqiy hujjat havolasi, tegishli qoida, qo‘llangan stavka va amal qilish sanasi bo‘lishi rejalashtirilgan. Foydalanuvchi hisobni birlamchi manba bilan tekshira olishi kerak.'],
];

export default function PitchPage() {
  return <div className="pb-16">
    <section className="bg-brand-950 text-white px-5 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <p className="text-sm font-semibold text-emerald-300">GovMind / Pitch Day 3.0 / Prototype</p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight mt-5">To‘lov qancha?<br /><span className="text-emerald-300">Nima uchun shuncha?</span></h1>
          <p className="text-brand-300 text-lg leading-relaxed mt-6 max-w-xl">Davlat xizmatiga borishdan oldin to‘lovni biling. Hisobchi xizmat narxini topish, o‘z holatingizga mos hisoblash va huquqiy asosini ko‘rish uchun yaratilayotgan qidiruv va hisoblash platformasi.</p>
          <div className="flex flex-wrap gap-2 mt-6 text-xs font-medium"><span className="rounded-full border border-brand-700 px-3 py-2">Hozir: 1 ta ishlaydigan modul</span><span className="rounded-full border border-brand-700 px-3 py-2">Maqsad: 45+ kalkulyator</span><span className="rounded-full border border-brand-700 px-3 py-2">Fuqarolar va tashkilotlar uchun</span></div>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href={pitch.prototype} className="rounded-xl bg-emerald-300 text-brand-950 px-5 py-3 font-semibold inline-flex items-center gap-2">Prototipni sinash <ArrowRight size={18} /></Link>
            <Link href="/demo" className="rounded-xl border border-brand-600 px-5 py-3 font-semibold hover:bg-brand-800">Demo sahifasi</Link>
          </div>
          <p className="text-xs text-brand-400 mt-5">Mustaqil loyiha. Davlat organi yoki davlat xizmatlari portali emas.</p>
        </div>
        <div className="rounded-3xl border border-brand-700 bg-brand-900 p-7 sm:p-9">
          <p className="text-emerald-300 text-xs uppercase tracking-widest font-semibold">Katta platformaning birinchi moduli</p>
          <h2 className="text-2xl font-bold mt-4">Tug‘ilganlik guvohnomasi</h2>
          <div className="space-y-4 mt-7">
            {['Vaziyat va murojaat usulini tanlash', 'Boj, gerb yig‘imi va xizmat haqini ajratish', 'Formula va huquqiy manbani ko‘rish', 'Natijani saqlash yoki chop etish'].map((text, i) => <div key={text} className="flex gap-3 items-start"><span className="rounded-full bg-brand-800 text-emerald-300 w-7 h-7 shrink-0 flex items-center justify-center text-sm">{i + 1}</span><p className="text-sm text-brand-200 pt-1">{text}</p></div>)}
          </div>
          <p className="text-xs text-brand-400 border-t border-brand-700 mt-7 pt-5">Guvohnoma kalkulyatori platformaning boshlanishi. Keyingi modullar boshqa davlat to‘lovlarini qamrab oladi. Hozirgi demo natijalarida huquqiy tekshiruv holati ko‘rsatiladi.</p>
        </div>
      </div>
    </section>
    <nav aria-label="Taqdimot bo‘limlari" className="border-b border-brand-200 px-5 py-4 overflow-x-auto">
      <div className="max-w-6xl mx-auto flex gap-6 text-sm font-medium whitespace-nowrap">{[['problem', 'Muammo → Yechim'], ['platform', 'Platforma'], ['audience', 'Kimlar uchun'], ['team', 'Jamoa'], ['why-us', 'Nega biz'], ['roadmap', 'Yo‘l xaritasi'], ['implementation', 'Amalga oshirish'], ['business', 'Biznes modeli']].map(([id, label]) => <a key={id} href={`#${id}`} className="hover:text-emerald-700">{label}</a>)}</div>
    </nav>
    <div className="max-w-6xl mx-auto px-5 space-y-20 mt-16">
      <section id="problem" className="scroll-mt-24 grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-sm font-semibold text-brand-500">01 / Muammo</p>
          <h2 className="text-3xl font-bold mt-3">To‘lovni bilish uchun<br />idora eshigigacha borish kerakmi?</h2>
          <p className="text-brand-600 leading-relaxed mt-5">Davlat xizmatidan foydalanmoqchi bo‘lgan fuqaro uchun birinchi qiyinchilik — kerakli xizmat narxini topish. Keyingisi — topilgan summa aynan uning holatiga mosligini tushunish. Xuddi shu savol davlat tashkiloti xodimi, advokat yoki mijozga xizmat ko‘rsatayotgan xususiy korxonada ham paydo bo‘ladi.</p>
          <p className="text-brand-600 leading-relaxed mt-4">Loyiha asoschisining kuzatuviga ko‘ra, odamlar to‘lovni ko‘pincha xizmat ko‘rsatish joyiga borgach aniqlashtiradi. Internetdagi ma’lumot eskirgan, tarqoq yoki huquqiy hujjatga aniq havolasiz bo‘lsa, xizmatga bormasdan turib ishonchli hisob chiqarish qiyinlashadi.</p>
          <p className="text-brand-600 leading-relaxed mt-4">Murojaat usuli, xizmat turi, amaldagi stavka va imtiyozlar natijani o‘zgartirishi mumkin. Bu noaniqlik xarajatni oldindan rejalashtirishni va mijozga asosli javob berishni qiyinlashtiradi.</p>
          <p className="text-sm text-brand-500 mt-4">Muammoning qanchalik keng tarqalganini fuqarolar va tashkilotlar bilan suhbat hamda foydalanuvchi sinovlari orqali o‘lchash rejalashtirilgan.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-7 self-start">
          <p className="text-sm font-semibold text-emerald-700">Yechim / Hisobchi</p>
          <h3 className="text-2xl font-bold mt-3">Xizmatni toping.<br />Holatingizni kiriting.<br />Asosli hisobni ko‘ring.</h3>
          <p className="text-brand-600 leading-relaxed mt-4">Maqsad — xizmatni qidirishdan uning narxi va huquqiy asosini tushunishgacha bo‘lgan jarayonni bir platformada birlashtirish.</p>
          <ul className="space-y-4 mt-5">{['Xizmat yoki vaziyat bo‘yicha kerakli ma’lumotni topish.', 'Shaxsiy holatga tegishli qoidani savollar orqali aniqlash.', 'To‘lov qismlari va hisoblash formulasini ko‘rsatish.', 'Lex.uz va boshqa birlamchi rasmiy manbalarga havola berish.', 'Ma’lumotning sanasi va tekshirish holatini ochiq ko‘rsatish.'].map(text => <li key={text} className="flex gap-3 text-brand-700"><Check size={19} className="shrink-0 text-emerald-700 mt-1" />{text}</li>)}</ul>
          <p className="text-sm text-emerald-800 mt-6 border-t border-emerald-200 pt-5">Hozir shu yondashuv tug‘ilganlik guvohnomasi moduli orqali namoyish qilinadi. Keng qamrovli huquqiy qidiruv va qolgan kalkulyatorlar rivojlanish rejasida.</p>
        </div>
      </section>
      <section id="platform" className="scroll-mt-24">
        <p className="text-sm font-semibold text-brand-500">Platforma qanday ishlashi ko‘zda tutilgan?</p>
        <h2 className="text-3xl font-bold mt-3">Qidiruvdan huquqiy asoslangan hisobgacha.</h2>
        <p className="text-brand-600 leading-relaxed mt-5 max-w-3xl">Masalan, foydalanuvchi “Uy sotishda qanday to‘lovlar bor?” deb izlaydi. Rejalashtirilgan platforma tegishli xizmatlarni topishga, zarur ma’lumotlarni kiritishga va har bir to‘lovning asosini ko‘rishga yordam beradi. Bu misol kelajakdagi foydalanish jarayonini ifodalaydi; uy-joy moduli hali ishga tushmagan.</p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">{platformSteps.map(([title, text], i) => <li key={title} className="rounded-2xl border border-brand-200 p-6"><span className="font-mono text-emerald-700 text-sm">0{i + 1}</span><h3 className="text-xl font-bold mt-3">{title}</h3><p className="text-sm text-brand-600 leading-relaxed mt-3">{text}</p></li>)}</ol>
        <div className="rounded-2xl bg-brand-50 border border-brand-200 p-7 mt-6"><h3 className="text-xl font-bold">Manba va yangilanish — mahsulotning bir qismi.</h3><p className="text-brand-600 leading-relaxed mt-3">Asos sifatida <a href="https://lex.uz" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">Lex.uz</a>dagi ochiq qonunchilik hujjatlari, kodekslar, qarorlar va vakolatli organlarning rasmiy ma’lumotlaridan foydalanish ko‘zda tutilgan. Har bir modulda qoida, hujjat bandi va amal qilish davrini qayd etish; o‘zgarishlarni kuzatish va qayta tekshirish tartibi yaratiladi. Ma’lumotlardan foydalanish usuli tegishli huquqiy va texnik shartlarga mos bo‘lishi kerak.</p><p className="text-sm text-brand-500 mt-4">Hozir manbalar prototip moduliga kiritilgan. Lex.uz bilan rasmiy hamkorlik, barcha hujjatlarning avtomatik importi yoki uzluksiz yangilanish tizimi hali mavjud emas.</p></div>
      </section>
      <section id="audience" className="scroll-mt-24">
        <p className="text-sm font-semibold text-brand-500">Kimlar uchun?</p><h2 className="text-3xl font-bold mt-3">Bir xil savol. Turli foydalanuvchilar.</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-7">{audiences.map(([title, text]) => <div key={title} className="rounded-2xl border border-brand-200 p-6"><h3 className="text-xl font-bold">{title}</h3><p className="text-brand-600 leading-relaxed mt-4">{text}</p></div>)}</div>
      </section>
      <section id="team" className="scroll-mt-24">
        <p className="text-sm font-semibold text-brand-500">02 / Jamoa</p><h2 className="text-3xl font-bold mt-3">GovMind — bir asoschi, ishlaydigan prototip.</h2>
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 mt-7">
          <div className="p-7 rounded-2xl border border-brand-200"><Users className="text-emerald-700" /><h3 className="text-xl font-bold mt-5">{pitch.founder}</h3><p className="text-brand-600 mt-2">Founder &amp; Full-Stack Developer</p><p className="text-sm text-brand-500 mt-4">Mahsulot yo‘nalishi, interfeys, hisoblash moduli, API va demo uchun mas’ul. Jamoa: 1 kishi.</p>{pitch.founderUrl ? <a href={pitch.founderUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-700 underline mt-5">GitHub ↗</a> : <p className="text-xs text-brand-500 mt-5">Asoschining ommaviy profili hali qo‘shilmagan.</p>}<a href={pitch.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block ml-5 text-emerald-700 underline mt-5">LinkedIn ↗</a></div>
          <div className="p-7 rounded-2xl bg-brand-50 border border-brand-200"><Code2 /><h3 className="text-xl font-bold mt-5">Loyihada qo‘llangan ko‘nikmalar</h3><p className="text-brand-600 mt-3 leading-relaxed">TypeScript va React bilan interfeys; Next.js va NestJS bilan server; Zod bilan ma’lumot tekshirish; Decimal.js bilan aniq arifmetika; avtomatlashtirilgan testlar.</p><div className="flex flex-wrap gap-2 mt-5">{['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'NestJS', 'Zod', 'Decimal.js', 'Vitest', 'Playwright'].map(tech => <span key={tech} className="px-3 py-1.5 bg-white border border-brand-200 rounded-lg text-xs font-medium">{tech}</span>)}</div></div>
        </div>
      </section>
      <section id="why-us" className="scroll-mt-24"><p className="text-sm font-semibold text-brand-500">03 / Nega biz?</p><h2 className="text-3xl font-bold mt-3">Birinchi modul bilan yondashuvni sinayapmiz.</h2><div className="grid md:grid-cols-3 gap-6 mt-7">{[[Code2, 'Amaliy asos', 'Asoschi qidiruv interfeysi, hisoblash moduli va API ustida birgalikda ishlaydi. Ishlayotgan prototip g‘oyani foydalanuvchiga ko‘rsatish va fikr asosida o‘zgartirish imkonini beradi.'], [FileCheck2, 'Tekshiriladigan natija', 'To‘lov qismlari, formulalar va manba havolalari ochiq ko‘rsatiladi. Kengayishdan oldin huquqiy qoidalarni mutaxassis bilan tekshirish rejalashtirilgan.'], [Compass, 'Modullar orqali kengayish', 'Guvohnoma — boshlang‘ich modul. Shu yondashuvni xizmatlar kesimida takrorlash, ustuvor talablarni tekshirish va bosqichma-bosqich 45+ kalkulyatorga yetish maqsad qilingan.']].map(([Icon, title, description]) => { const Component = Icon as typeof Code2; return <div key={String(title)} className="p-6 border border-brand-200 rounded-2xl"><Component className="text-emerald-700" /><h3 className="text-lg font-bold mt-4">{String(title)}</h3><p className="text-sm leading-relaxed text-brand-600 mt-3">{String(description)}</p></div>; })}</div><p className="text-sm text-brand-500 mt-5">Jamoa hozir bir kishidan iborat. Huquqiy ekspertiza va tashkilotlar bilan pilot sinovlar keyingi bosqichda jalb qilinishi kerak.</p></section>
      <section id="roadmap" className="scroll-mt-24"><p className="text-sm font-semibold text-brand-500">04 / Yo‘l xaritasi</p><h2 className="text-3xl font-bold mt-3">Bugungi prototipdan tekshirilgan mahsulotga.</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">{roadmap.map(([name, status, text], i) => <div key={name} className={`p-6 rounded-2xl border ${i === 1 ? 'bg-brand-900 text-white border-brand-900' : 'border-brand-200'}`}><span className={i === 1 ? 'text-emerald-300 text-xs' : 'text-brand-500 text-xs'}>{status}</span><h3 className="text-xl font-bold mt-3">{name}</h3><p className={`text-sm leading-relaxed mt-4 ${i === 1 ? 'text-brand-300' : 'text-brand-600'}`}>{text}</p></div>)}</div></section>
      <section id="implementation" className="scroll-mt-24"><p className="text-sm font-semibold text-brand-500">05 / Amalga oshirish</p><h2 className="text-3xl font-bold mt-3">Xizmatlar katalogidan 45+ kalkulyatorgacha.</h2><div className="grid md:grid-cols-2 gap-8 mt-7"><ol className="space-y-5">{['Talabni tekshirish: fuqarolar, davlat tashkilotlari va xususiy xizmat ko‘rsatuvchilar bilan suhbat. Eng qiyin topiladigan to‘lovlar va takroriy hisoblash vaziyatlarini aniqlash.', 'Manbalar bazasi: Lex.uz va boshqa rasmiy manbalardagi tegishli hujjatlar, bandlar, stavkalar va sanalarni tartiblash. Huquqshunos tekshiruvidan o‘tgan qoidalarni versiyalash.', 'Qidiruv: xizmat nomlari, kundalik iboralar va tegishli huquqiy qoidalarni bog‘lash. Avval katalog qidiruvi, keyin ma’noga ko‘ra qidirish imkoniyatini sinash.', 'Hisoblash modullari: TypeScript, Zod va Decimal.js yordamida qoidalarni yozish; har bir xizmat uchun chegara holatlari, imtiyozlar va sana bo‘yicha testlar.', 'Bosqichma-bosqich kengayish: sud, notarius, avtomobil, uy-joy, soliq, bojxona, hujjatlar va boshqa davlat to‘lovlari bo‘yicha 45+ modulga yetish. Har bir modul tekshirilgach ochiladi.', 'Tashkilotlar uchun pilot: moslashtirilgan hisoblagich, mijozga beriladigan hisob va API integratsiyasini sinash; foydalanish hajmi va qiymatiga qarab oylik obunani shakllantirish.'].map((text, i) => <li key={text} className="flex gap-4"><span className="font-mono text-emerald-700 font-bold">0{i + 1}</span><p className="text-brand-600 leading-relaxed">{text}</p></li>)}</ol><div className="bg-brand-50 border border-brand-200 rounded-2xl p-7 self-start"><Layers /><h3 className="text-xl font-bold mt-4">AI vositalarining o‘rni</h3><p className="text-sm text-brand-600 leading-relaxed mt-3">Codex kodni tekshirish, tuzatish va test tayyorlashda yordamchi sifatida ishlatilmoqda. Hisoblash qoidalarini tushuntirish va tekshirish uchun asoschi mas’ul.</p><p className="text-sm text-brand-600 leading-relaxed mt-4">Keyingi bosqichda AI foydalanuvchining oddiy tildagi savolini tushunish, mos xizmatni topish va topilgan hujjatlarga tayangan izoh berish uchun sinovdan o‘tkaziladi. Yakuniy summalar tekshirilgan hisoblash qoidalari orqali chiqarilishi kerak.</p><p className="text-sm text-brand-500 leading-relaxed mt-4">Hozir AI-chatbot va to‘liq huquqiy qidiruv tizimi mavjud emas. Ishlayotgan prototip qoida asosidagi hisoblash va katalog qidiruvidan foydalanadi.</p><Link className="inline-block text-sm text-emerald-700 underline mt-5" href="/api-access">API bilan tanishish →</Link></div></div></section>
      <section id="business" className="scroll-mt-24">
        <p className="text-sm font-semibold text-brand-500">06 / Biznes modeli</p><h2 className="text-3xl font-bold mt-3">Bepul kirish. Pullik imkoniyatlar. Tashkilotlar uchun obuna.</h2>
        <p className="text-brand-600 leading-relaxed mt-5 max-w-3xl">Rejalashtirilgan model — fuqarolarga asosiy xizmatlarni ochiq taqdim etish, murakkab hisoblashlar va tashkilot ish jarayoniga mos yechimlar orqali daromad olish.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-7">
          <div className="rounded-2xl border border-brand-200 p-6"><p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Bepul</p><h3 className="text-xl font-bold mt-3">Fuqarolar uchun asosiy xizmatlar</h3><p className="text-brand-600 leading-relaxed mt-4">Asosiy qidiruv, ommabop kalkulyatorlar va natijaning huquqiy manbasini ko‘rish. Maqsad — xizmatga borishdan oldin xarajatni tushunishni qulay qilish.</p></div>
          <div className="rounded-2xl border border-brand-200 p-6"><p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Pullik / rejalashtirilgan</p><h3 className="text-xl font-bold mt-3">Kengaytirilgan hisoblashlar</h3><p className="text-brand-600 leading-relaxed mt-4">Murakkab va professional vaziyatlar uchun kalkulyatorlar, bir nechta holatni taqqoslash va kengaytirilgan hisobotlarni taklif qilish ko‘zda tutilgan. Qaysi imkoniyatlar pullik bo‘lishi talab sinovida aniqlanadi.</p></div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Oylik obuna / rejalashtirilgan</p><h3 className="text-xl font-bold mt-3">Tashkilotga mos hisoblagichlar</h3><p className="text-brand-600 leading-relaxed mt-4">Advokatlik tuzilmalari, xususiy xizmat ko‘rsatuvchi korxonalar va davlat tashkilotlari uchun ish jarayoniga mos hisoblagichlar. Mijozlar hisoblari, tashkilot saytiga qo‘shish va API orqali ulash imkoniyatlari pilotlarda tekshiriladi.</p></div>
        </div>
        <p className="text-sm text-brand-500 leading-relaxed mt-5">Hozir demo bepul. Pullik tariflar, obuna, tashkilotlar kabineti va tijoriy integratsiyalar hali ishga tushmagan. Narx, mijozlar soni yoki daromad bo‘yicha tasdiqlanmagan ko‘rsatkichlar berilmaydi; model foydalanuvchi suhbatlari va pilotlar orqali tekshiriladi.</p>
      </section>
      <section className="rounded-3xl bg-emerald-50 border border-emerald-100 p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"><div><h2 className="text-2xl font-bold">Natijani o‘zingiz sinab ko‘ring.</h2><p className="text-brand-600 mt-2">Video, demo tavsifi va prototip — bir sahifada.</p></div><Link href="/demo" className="shrink-0 px-5 py-3 bg-brand-900 text-white rounded-xl font-semibold">Demoni ochish →</Link></section>
    </div>
  </div>;
}
