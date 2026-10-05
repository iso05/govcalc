# Demo arxitekturasi va cheklovlar

- Hisoblash so‘rovlari Zod bilan tekshiriladi. Noma’lum holat va maydonlar rad etiladi.
- Next.js hisoblash endpointi 16 KB dan katta so‘rovlarni rad etadi.
- Demo foydalanuvchidan pasport, ism yoki akkaunt talab qilmaydi.
- Saqlangan natijalar faqat foydalanuvchining brauzeridagi localStorage da saqlanadi.
- Hisoblash arifmetikasi Decimal.js bilan bajariladi.
- Hisoblash dvigateli brauzerga yuborilmaydi; sayt ichidagi API chaqiriladi.
- VPS Nginx hisoblash API uchun IP boshiga 5 so‘rov/soniya, qisqa oqim uchun 20 ta zaxira va 16 KB tana chegarasini qo‘llaydi. Ortiqcha so‘rovlar 429, katta tana 413 bilan rad etiladi. Redis ishlatilmaydi.
- Sayt HTTPS orqali ochiladi. IP sertifikati avtomatik yangilanadi; yangilanish sinovi o‘tkazilgan.
- Xizmat `govcalc` tizim foydalanuvchisi ostida, root huquqisiz, faqat localhostda ishlaydi. Systemd tizim fayllariga yozishni cheklaydi, xotira chegarasi 512 MB.
- Firewall faqat 22/80/443 portlarni ochadi. SSH root kirishi kalit bilan; Fail2ban takroriy noto‘g‘ri kirishlarni bloklaydi.
- Nginx CSP, clickjacking himoyasi, MIME tekshiruvi va brauzer ruxsatlarini cheklovchi sarlavhalarni qo‘llaydi. Next.js statik sahifalari uchun inline script/style ruxsati saqlangan.
- 2026-10-05: Next.js 15.5.27 va PostCSS 8.5.29 bilan web production dependency auditi 0 ma’lum zaiflik ko‘rsatdi. Bu to‘liq penetration test yoki boshqa server loyihalarining auditi emas.
- NestJS/Prisma alternativ backend ushbu deployga kiritilmagan. Monoreponing o‘sha qismida alohida dependency audit tuzatishlari kerak; uni hozir ommaga yoqmang.
- NestJS alternativ API CORS sozlamasi hozir umumiy; alohida ommaviy server qilinsa ruxsat etilgan originlar bilan cheklash kerak.
- Login, RBAC, admin audit jurnali va database persistence hozir ishlab turgan imkoniyatlar emas.
- Huquqiy manba holati va hisoblash testlari huquqiy sertifikatsiya o‘rnini bosa olmaydi.

