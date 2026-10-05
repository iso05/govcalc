import { Decimal } from 'decimal.js';
import { MoneyValue } from '@govcalc/types';
import { formatUzbekCurrency } from '@govcalc/ui';

// Strict decimal configuration for legal financial calculations
Decimal.set({
  precision: 20,
  rounding: Decimal.ROUND_HALF_UP,
  toExpNeg: -7,
  toExpPos: 21,
});

export const D = (value: string | number | Decimal): Decimal => {
  if (value instanceof Decimal) return value;
  return new Decimal(value);
};

export function toMoney(amount: Decimal | string | number, currency: 'UZS' = 'UZS'): MoneyValue {
  const dec = D(amount);
  const fixed = dec.toFixed(2);
  return {
    amount: fixed,
    currency,
    formattedAmount: formatUzbekCurrency(dec, currency),
  };
}

export function zeroMoney(currency: 'UZS' = 'UZS', customFormatted?: string): MoneyValue {
  return {
    amount: '0.00',
    currency,
    formattedAmount: customFormatted || formatUzbekCurrency(0, currency),
  };
}

