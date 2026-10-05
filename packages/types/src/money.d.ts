export type CurrencyCode = 'UZS' | 'USD' | 'EUR';
export interface MoneyValue {
    amount: string;
    currency: CurrencyCode;
    formattedAmount: string;
}
export interface SystemRateSnapshot {
    bhm: string;
    minimumWage: string;
    currency: CurrencyCode;
    effectiveDate: string;
}
//# sourceMappingURL=money.d.ts.map