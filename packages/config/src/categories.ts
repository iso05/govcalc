export interface CategoryConfig {
  id: string;
  slug: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  descriptionUz: string;
  icon: string;
  calculatorsCount: number;
}

export const OFFICIAL_CATEGORIES: CategoryConfig[] = [
  {
    id: 'cat-sud',
    slug: 'sud',
    nameUz: 'Sud',
    nameRu: 'Суд',
    nameEn: 'Court',
    descriptionUz: 'Fuqarolik, iqtisodiy va ma’muriy sudlarga da’vo arizalari bo‘yicha davlat bojlari.',
    icon: 'Scale',
    calculatorsCount: 0,
  },
  {
    id: 'cat-notarius',
    slug: 'notarius',
    nameUz: 'Notarius',
    nameRu: 'Нотариус',
    nameEn: 'Notary',
    descriptionUz: 'Ishonchnoma, oldi-sotdi, hadya va boshqa notarial harakatlar uchun to‘lovlar.',
    icon: 'FileCheck',
    calculatorsCount: 0,
  },
  {
    id: 'cat-avtomobil',
    slug: 'avtomobil',
    nameUz: 'Avtomobil',
    nameRu: 'Автомобиль',
    nameEn: 'Automotive',
    descriptionUz: 'Avtotransport ro‘yxati, davlat raqami, texnik ko‘rik va utilizatsiya yig‘imi.',
    icon: 'Car',
    calculatorsCount: 0,
  },
  {
    id: 'cat-uy-joy',
    slug: 'uy-joy',
    nameUz: 'Uy-joy',
    nameRu: 'Недвижимость',
    nameEn: 'Real Estate',
    descriptionUz: 'Ko‘chmas mulk oldi-sotdisi, kadastr pasporti va ro‘yxatga olish xarajatlari.',
    icon: 'Home',
    calculatorsCount: 0,
  },
  {
    id: 'cat-soliq',
    slug: 'soliq',
    nameUz: 'Soliq',
    nameRu: 'Налоги',
    nameEn: 'Tax',
    descriptionUz: 'JShODS, daromad solig‘i, mol-mulk va yer soliqlari hisob-kitoblari.',
    icon: 'Receipt',
    calculatorsCount: 0,
  },
  {
    id: 'cat-bojxona',
    slug: 'bojxona',
    nameUz: 'Bojxona',
    nameRu: 'Таможня',
    nameEn: 'Customs',
    descriptionUz: 'Tovarlarni olib kirishdagi bojxona bojlari, aksiz va QQS hisoblash.',
    icon: 'Landmark',
    calculatorsCount: 0,
  },
  {
    id: 'cat-hujjatlar',
    slug: 'hujjatlar',
    nameUz: 'Hujjatlar',
    nameRu: 'Документы',
    nameEn: 'Documents',
    descriptionUz: 'Pasport, ID-karta, xorijga chiqish pasporti va FHDYo guvohnomalari to‘lovlari.',
    icon: 'FileText',
    calculatorsCount: 1,
  },
  {
    id: 'cat-biznes',
    slug: 'biznes',
    nameUz: 'Biznes',
    nameRu: 'Бизнес',
    nameEn: 'Business',
    descriptionUz: 'YTT va MChJ ro‘yxatdan o‘tkazish, litsenziya va ruxsatnoma davlat bojlari.',
    icon: 'Briefcase',
    calculatorsCount: 0,
  },
  {
    id: 'cat-kommunal',
    slug: 'kommunal',
    nameUz: 'Kommunal',
    nameRu: 'Коммунальные',
    nameEn: 'Utilities',
    descriptionUz: 'Elektr, gaz, suv va maishiy chiqindi tariflari bo‘yicha to‘lovlar.',
    icon: 'Zap',
    calculatorsCount: 0,
  },
  {
    id: 'cat-boshqa',
    slug: 'boshqa',
    nameUz: 'Boshqa',
    nameRu: 'Другое',
    nameEn: 'Other',
    descriptionUz: 'Universal stavkalar, apostil, ma’muriy jarimalar va maxsus xizmatlar.',
    icon: 'FolderPlus',
    calculatorsCount: 0,
  },
];
