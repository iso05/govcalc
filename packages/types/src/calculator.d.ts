import { LegalSourceReference, LegalVerificationStatus } from './legal.js';
import { MoneyValue, SystemRateSnapshot } from './money.js';
export type InputFieldType = 'NUMBER' | 'CURRENCY' | 'SELECT' | 'RADIO' | 'CHECKBOX' | 'DATE';
export interface InputOption {
    value: string;
    labelUz: string;
    labelRu?: string;
    labelEn?: string;
    descriptionUz?: string;
}
export interface CalculatorInputField {
    key: string;
    labelUz: string;
    labelRu?: string;
    labelEn?: string;
    type: InputFieldType;
    placeholderUz?: string;
    helpTextUz?: string;
    defaultValue?: unknown;
    options?: InputOption[];
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
    prefix?: string;
    suffix?: string;
}
export interface CalculationBreakdownItem {
    id: string;
    titleUz: string;
    titleRu?: string;
    descriptionUz?: string;
    baseRateAmount: string;
    multiplier: string;
    itemTotal: MoneyValue;
    legalCitation?: string;
    sortOrder: number;
}
export interface CalculationResult {
    calculatorCode: string;
    calculatorSlug: string;
    calculatorNameUz: string;
    versionCode: string;
    total: MoneyValue;
    formulaSummary: string;
    breakdown: CalculationBreakdownItem[];
    legalSources: LegalSourceReference[];
    verificationStatus: LegalVerificationStatus;
    ratesApplied: SystemRateSnapshot;
    calculatedAt: string;
    notesUz?: string[];
    isExempt?: boolean;
    exemptionReasonUz?: string;
}
export interface CalculationContext {
    calculationDate: Date;
    bhm: string;
    minimumWage: string;
    currency: 'UZS';
}
export interface CalculatorMetadata {
    id: string;
    code: string;
    slug: string;
    nameUz: string;
    nameRu?: string;
    nameEn?: string;
    descriptionUz: string;
    categorySlug: string;
    isPremium: boolean;
    premiumPrice?: string;
    estimatedMinutes: number;
    activeVersionCode: string;
    effectiveFrom: string;
    legalSourcesCount: number;
}
//# sourceMappingURL=calculator.d.ts.map