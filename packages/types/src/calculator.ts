import { LegalSourceReference, LegalSourceStatus } from './legal.js';
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

export type PaymentType = 'STATE_DUTY' | 'EMBLEM_FEE' | 'SERVICE_FEE' | 'DELIVERY_FEE';

export type FeeCategory = 'state_duty' | 'emblem_fee' | 'service_fee' | 'delivery_fee' | 'other_fee';

export interface CalculationBreakdownItem {
  id: string;
  titleUz: string;
  titleRu?: string;
  descriptionUz?: string;
  paymentType?: PaymentType;
  feeCategory?: FeeCategory; // State duty, Emblem fee, Service fee, Delivery fee, Other fee
  baseRateAmount: string;     // e.g. "440000.00"
  multiplier: string;         // e.g. "0.1500"
  itemTotal: MoneyValue;
  discountAppliedPercent?: string;
  isExempt?: boolean;
  legalCitation?: string;
  legalUrl?: string;
  sortOrder: number;
}

export interface CalculationResult {
  calculatorCode: string;
  calculatorSlug: string;
  calculatorNameUz: string;
  versionCode: string;
  total: MoneyValue;
  stateDuty?: MoneyValue;     // State duty subtotal
  emblemFee?: MoneyValue;     // Emblem fee subtotal
  serviceFee?: MoneyValue;    // Service fee subtotal
  deliveryFee?: MoneyValue;   // Delivery fee subtotal
  otherFee?: MoneyValue;      // Other fee subtotal
  formulaSummary: string;
  breakdown: CalculationBreakdownItem[];
  legalSources: LegalSourceReference[];
  verificationStatus: LegalSourceStatus;
  ratesApplied: SystemRateSnapshot;
  calculatedAt: string;       // ISO date
  effectiveDate?: string;
  lastVerifiedAt?: string;
  notesUz?: string[];
  isExempt?: boolean;
  exemptionReasonUz?: string;
  isMock?: boolean;
}

export interface CalculationContext {
  calculationDate: Date;
  bhm: string;
  minimumWage?: string;
  currency: 'UZS';
}

export interface CalculatorMetadata {
  id: string;
  code: string;
  slug: string;
  title?: string;
  nameUz: string;
  nameRu?: string;
  nameEn?: string;
  descriptionUz: string;
  description?: string;
  categorySlug: string;
  category?: string;
  keywords?: string[];
  synonyms?: string[];
  status?: 'mock' | 'draft' | 'published' | 'deprecated';
  isPremium: boolean;
  premiumPrice?: string;
  estimatedMinutes: number;
  activeVersionCode: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
  legalSourcesCount: number;
}

export interface CalculationVersion<TInput = Record<string, unknown>> {
  version: string;
  versionCode: string;
  effectiveFrom: Date | string;
  effectiveTo: Date | string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'DEPRECATED' | 'MOCK';
  inputFields: CalculatorInputField[];
  legalSources: LegalSourceReference[];
  calculate?: (input: TInput, context: CalculationContext) => CalculationResult;
}

export interface CalculatorDefinition<TInput = Record<string, unknown>> {
  id?: string;
  code: string;
  slug: string;
  nameUz: string;
  nameRu?: string;
  nameEn?: string;
  categorySlug: string;
  category?: string;
  descriptionUz: string;
  isPremium: boolean;
  status?: 'mock' | 'draft' | 'published';
  keywords?: string[];
  synonyms?: string[];
  estimatedMinutes: number;
  versions: CalculationVersion<TInput>[];
}

export type CalculatorInput = Record<string, unknown>;
export type CalculatorResult = CalculationResult;
