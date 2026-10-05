export interface EconomicValue {
  type: 'BHM' | 'MINIMUM_WAGE';
  value: string;
  nominalNumber: number;
  currency: 'UZS';
  effectiveFrom: string; // YYYY-MM-DD
  effectiveTo: string | null; // null if currently effective
  source: string;
  sourceUrl: string;
  status: 'VERIFIED' | 'PROVISIONAL';
}

export const CURRENT_BHM = '440000.00';

export const ECONOMIC_VALUES: EconomicValue[] = [
  {
    type: 'BHM',
    value: '440000.00',
    nominalNumber: 440000,
    currency: 'UZS',
    effectiveFrom: '2026-09-01',
    effectiveTo: null,
    source: 'Demo stavkasi; my.gov.uz 913/865 xizmat narxlari bilan mos. Farmon va kuchga kirish sanasi qayta tekshirilishi kerak.',
    sourceUrl: 'https://my.gov.uz/uz/service/865',
    status: 'PROVISIONAL',
  },
  {
    type: 'BHM',
    value: '412000.00',
    nominalNumber: 412000,
    currency: 'UZS',
    effectiveFrom: '2025-08-01',
    effectiveTo: '2026-08-31',
    source: 'Soliq qo‘mitasi: 2025-yil 1-avgustdan BHM 412 000 so‘m',
    sourceUrl: 'https://gov.uz/oz/soliq/news/view/58818',
    status: 'VERIFIED',
  },
  {
    type: 'BHM', value: '375000.00', nominalNumber: 375000, currency: 'UZS',
    effectiveFrom: '2024-10-01', effectiveTo: '2025-07-31',
    source: 'Soliq qo‘mitasi: 2024-yil 1-oktabrdan BHM 375 000 so‘m',
    sourceUrl: 'https://gov.uz/oz/soliq/news/view/18832', status: 'VERIFIED',
  },
  {
    type: 'BHM',
    value: '340000.00',
    nominalNumber: 340000,
    currency: 'UZS',
    effectiveFrom: '2023-12-01',
    effectiveTo: '2024-09-30',
    source: 'O‘zbekiston Respublikasi Prezidentining 2023-yil 17-noyabrdagi PF-193-son Farmoni',
    sourceUrl: 'https://lex.uz/docs/-6666870',
    status: 'VERIFIED',
  },
  {
    type: 'BHM',
    value: '330000.00',
    nominalNumber: 330000,
    currency: 'UZS',
    effectiveFrom: '2023-05-01',
    effectiveTo: '2023-11-30',
    source: 'O‘zbekiston Respublikasi Prezidentining 2023-yil 28-martdagi PF-44-son Farmoni',
    sourceUrl: 'https://lex.uz/docs/-6419728',
    status: 'VERIFIED',
  },
  {
    type: 'BHM',
    value: '300000.00',
    nominalNumber: 300000,
    currency: 'UZS',
    effectiveFrom: '2022-06-01',
    effectiveTo: '2023-04-30',
    source: 'O‘zbekiston Respublikasi Prezidentining 2022-yil 20-maydagi PF-138-son Farmoni',
    sourceUrl: 'https://lex.uz/docs/-6026210',
    status: 'VERIFIED',
  },
  {
    type: 'BHM',
    value: '270000.00',
    nominalNumber: 270000,
    currency: 'UZS',
    effectiveFrom: '2021-09-01',
    effectiveTo: '2022-05-31',
    source: 'O‘zbekiston Respublikasi Prezidentining 2021-yil 17-avgustdagi PF-6279-son Farmoni',
    sourceUrl: 'https://lex.uz/docs/-5580004',
    status: 'VERIFIED',
  },
];

/**
 * Resolves the officially effective BHM (Bazaviy hisoblash miqdori) for a target calculation date.
 * If targetDate is not provided or is in the future, the current BHM is returned.
 */
export function getBhmForDate(targetDate?: Date | string | null): EconomicValue {
  if (!targetDate) {
    return ECONOMIC_VALUES[0];
  }

  const d = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const time = d.getTime();
  if (!Number.isFinite(time)) throw new Error('Hisoblash sanasi noto‘g‘ri');

  for (const item of ECONOMIC_VALUES) {
    const fromTime = new Date(item.effectiveFrom).getTime();
    const toTime = item.effectiveTo ? new Date(item.effectiveTo).getTime() + 86400000 - 1 : Infinity;

    if (time >= fromTime && time <= toTime) {
      return item;
    }
  }

  throw new Error('Ushbu sana uchun BHM stavkasi mavjud emas');
}
