"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUzbekCurrency = formatUzbekCurrency;
exports.formatNumberUzbek = formatNumberUzbek;
exports.formatDateUzbek = formatDateUzbek;
const decimal_js_1 = require("decimal.js");
/**
 * Formats a monetary value safely using Decimal precision and Uzbek conventions.
 * Example: 59400 -> "59 400 so‘m"
 */
function formatUzbekCurrency(value, currency = 'UZS') {
    try {
        const d = new decimal_js_1.Decimal(value);
        const integerPart = d.floor().toString();
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        if (currency === 'UZS') {
            return `${formattedInteger} so‘m`;
        }
        return `${formattedInteger} ${currency}`;
    }
    catch {
        return `0 so‘m`;
    }
}
/**
 * Formats a numeric value with space thousands separators.
 * Example: 440000 -> "440 000"
 */
function formatNumberUzbek(value) {
    try {
        const d = new decimal_js_1.Decimal(value);
        const parts = d.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join('.');
    }
    catch {
        return '0';
    }
}
const UZBEK_MONTHS = [
    'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
    'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'
];
/**
 * Formats an ISO date into standard Uzbek Latin format.
 * Example: 2026-09-01 -> "1-sentyabr, 2026"
 */
function formatDateUzbek(dateInput) {
    try {
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        if (isNaN(date.getTime()))
            return String(dateInput);
        const day = date.getDate();
        const month = UZBEK_MONTHS[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}, ${year}`;
    }
    catch {
        return String(dateInput);
    }
}
//# sourceMappingURL=formatters.js.map