# Hisobchi demo saytini joylashtirish

## Amaldagi VPS deploy — 2026-10-05

- Taqdimot: https://76.13.248.238/pitch
- Demo: https://76.13.248.238/demo
- Ubuntu 24.04, Nginx, alohida Node.js 22 runtime: `/opt/govcalc/node`.
- Next.js standalone server: `/opt/govcalc/current/apps/web/server.js`.
- Systemd xizmati: `govcalc`; faqat `127.0.0.1:3100` da tinglaydi.
- Ommaviy portlar: 22, 80, 443. API va sayt Nginx orqali beriladi.
- SSH: ushbu kompyuterdagi mavjud `id_ed25519` kaliti. Root uchun parol orqali SSH kirish o‘chirilgan.
- Konfiguratsiyalar: loyiha ichidagi `deploy/`; serverda `/etc/govcalc/web.env` va `/etc/nginx/sites-available/govcalc`.
- HTTPS: IP manzil uchun Let's Encrypt qisqa muddatli sertifikati. `govcalc-cert-renew.timer` har 6 soatda yangilash zaruratini tekshiradi; muvaffaqiyatli yangilanganda Nginx qayta yuklanadi. Sinov yangilanishi tekshirilgan.
- PatentLex Nginx konfiguratsiyasi saqlangan; uning veb va API domenlari tekshirilgan.
- Dastlabki server konfiguratsiyasi zaxirasi: `/root/govcalc-backups/20261005`.

Tekshirish va boshqarish:

```sh
systemctl status govcalc --no-pager
journalctl -u govcalc -n 50 --no-pager
systemctl restart govcalc
systemctl list-timers govcalc-cert-renew.timer
nginx -t
```

Keyingi versiyani alohida build papkasida `npm ci --ignore-scripts` bilan yig‘ing. `NEXT_PUBLIC_SITE_URL=https://76.13.248.238` va video tayyor bo‘lsa `DEMO_VIDEO_URL` ni build vaqtida bering. `.next/standalone` tarkibini yangi release papkasiga, `.next/static` ni uning `apps/web/.next/static` papkasiga ko‘chiring. Fayllarni root egasida faqat o‘qish huquqi bilan saqlang; `.next/cache` uchun `/var/cache/govcalc` ishlatiladi. Faqat muvaffaqiyatli builddan keyin `/opt/govcalc/current` havolasini yangi releasega almashtirib, xizmatni qayta ishga tushiring. Oldingi release saqlanadi va shu havola orqali ortga qaytish mumkin.

Serverda oldindan mavjud `reboot-required` holati bor. Boshqa xizmatlar bilan kelishilgan texnik xizmat vaqtida qayta yuklang. Bu deploy serverni qayta yuklamaydi.

## Ishlaydigan variant
Bu loyiha Node.js bilan Next.js server sifatida ishlaydi. Frontend va /api/v1 bir xizmat ichida. /pitch sahifasi botga yuboriladigan asosiy taqdimot manzili bo‘lishi mumkin.

Repo ildizida:
1. npm ci
2. npm run build
3. npm run start --workspace=@govcalc/web

Hosting Node.js 22+, tashqi HTTPS va doimiy ishlaydigan Next.js jarayonini ta’minlashi kerak. PORT sozlamasini hosting belgilashi mumkin; aks holda 3000. Amaldagi VPS standalone konfiguratsiyasi yuqorida keltirilgan.

## Muhit sozlamalari
Next.js lokal sozlamalarni apps/web/.env.local dan o‘qiydi. Hostingda environment variables bo‘limiga kiriting.

NEXT_PUBLIC_SITE_URL=https://SIZNING-DOMENINGIZ
DEMO_VIDEO_URL=https://VIDEO-HAVOLASI
FOUNDER_NAME=Muhammadiso Jo‘rayev
FOUNDER_PROFILE_URL=https://github.com/iso05

Video URL HTTPS bo‘lishi kerak. MP4/WebM bevosita fayl bo‘lsa saytdagi player ishlaydi; YouTube yoki boshqa sahifa bo‘lsa tomosha qilish havolasi chiqadi. Sozlamalar o‘zgarsa qayta build/deploy qiling, chunki pitch va demo sahifalari oldindan yig‘iladi.

Domen hali berilmaganida metadata lokal manzilga tushadi. Ommaviy deploy uchun NEXT_PUBLIC_SITE_URL majburiy.

## Yakuniy tekshiruv
- Tashqi tarmoqdan /pitch va /demo ni oching.
- Video 1–5 daqiqa, login talab qilmaydi va telefonda ochiladi.
- /demo dan kalkulyatorga o‘ting va natija oling.
- API Access havolalarini tekshiring.
- Manba va huquqiy tekshirish holati ko‘rinib tursin.
- Ommaviy sayt ishlashi tasdiqlangandan keyin uning /pitch manzilini botga yuboring.

NestJS 4000-portdagi server demo sayti uchun shart emas. Uning Swagger sahifasi alohida ishga tushirilganda /api/docs da. Prisma bazasi, Redis, autentifikatsiya va rate limiting ishlab turgan demo imkoniyatlari sifatida ko‘rsatilmasin.

