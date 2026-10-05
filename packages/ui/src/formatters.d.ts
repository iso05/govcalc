import { Decimal } from 'decimal.js';
/**
 * Formats a monetary value safely using Decimal precision and Uzbek conventions.
 * Example: 59400 -> "59 400 so‘m"
 */
export declare function formatUzbekCurrency(value: string | number | Decimal, currency?: string): string;
/**
 * Formats a numeric value with space thousands separators.
 * Example: 440000 -> "440 000"
 */
export declare function formatNumberUzbek(value: string | number | Decimal): string;
/**
 * Formats an ISO date into standard Uzbek Latin format.
 * Example: 2026-09-01 -> "1-sentyabr, 2026"
 */
export declare function formatDateUzbek(dateInput: string | Date): string;
//# sourceMappingURL=formatters.d.ts.map