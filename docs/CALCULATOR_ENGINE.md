# GovCalc Calculator Engine Architecture

The GovCalc Calculator Engine is a modular, versioned, and decimal-safe calculation runtime.

---

## 1. Core Interfaces

```typescript
export interface CalculatorDefinition<TInput = Record<string, unknown>> {
  id?: string;
  code: string;
  slug: string;
  nameUz: string;
  categorySlug: string;
  descriptionUz: string;
  isPremium: boolean;
  status?: 'mock' | 'draft' | 'published';
  keywords?: string[];
  synonyms?: string[];
  estimatedMinutes: number;
  versions: CalculationVersion<TInput>[];
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

export interface CalculationResult {
  calculatorCode: string;
  calculatorSlug: string;
  calculatorNameUz: string;
  versionCode: string;
  total: MoneyValue;
  stateDuty?: MoneyValue;     // State duty subtotal
  serviceFee?: MoneyValue;    // Service fee subtotal
  otherFee?: MoneyValue;      // Other fee subtotal
  formulaSummary: string;
  breakdown: CalculationBreakdownItem[];
  legalSources: LegalSourceReference[];
  verificationStatus: LegalSourceStatus;
  ratesApplied: SystemRateSnapshot;
  calculatedAt: string;
  effectiveDate?: string;
  lastVerifiedAt?: string;
  notesUz?: string[];
  isExempt?: boolean;
  exemptionReasonUz?: string;
  isMock?: boolean;
}
```

---

## 2. Legal Source Architecture

All legal references conform to the statutory model:

```typescript
export type LegalSourceStatus = 'VERIFIED' | 'NEEDS_REVIEW' | 'CONFLICT' | 'EXPIRED';

export interface LegalSource {
  id: string;
  title: string;
  documentType: LegalDocumentType | string;
  documentNumber: string;
  publicationDate: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
  officialUrl: string;
  article: string;
  paragraph?: string;
  lastVerifiedAt: string;
  status: LegalSourceStatus;
}
```

### Important Legal Integrity Rules
1. **No Guessed Formulas**: Real formulas are never implemented without primary source verification.
2. **No Fabricated Rates**: Static test numbers are strictly flagged as `mock` or `skeleton`.
3. **No Unverified BHM Values**: All rate snapshots must reference official executive decrees with effective dates.
