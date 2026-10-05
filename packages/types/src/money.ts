export type CurrencyCode = 'UZS' | 'USD' | 'EUR';

export interface MoneyValue {
  amount: string;          // Decimal string representation, e.g. "59400.00"
  currency: CurrencyCode;  // e.g. "UZS"
  formattedAmount: string; // e.g. "59 400 so‘m"
}

export interface SystemRateSnapshot {
  bhm: string;          // e.g. "440000.00"
  minimumWage?: string;  // e.g. "1150000.00"
  currency: CurrencyCode;
  effectiveDate: string; // ISO Date string
}

export interface EconomicValue {
  type: 'BHM' | 'MIN_WAGE' | 'BASE_PENSION';
  value: string;
  nominalNumber: number;
  currency: CurrencyCode;
  effectiveFrom: string; // ISO date string e.g. "2026-09-01"
  effectiveTo?: string | null;
  source: string;
  sourceUrl?: string;
  status: 'VERIFIED' | 'NEEDS_REVIEW';
}

