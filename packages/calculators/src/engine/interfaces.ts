import { z } from 'zod';
import {
  CalculationBreakdownItem,
  CalculationContext,
  CalculationResult,
  CalculatorInputField,
  LegalSourceReference,
  LegalVerificationStatus,
} from '@govcalc/types';
import { Decimal } from 'decimal.js';

export interface CalculationComputationOutput {
  totalAmount: Decimal;
  formulaSummary: string;
  items: CalculationBreakdownItem[];
  notesUz?: string[];
  isExempt?: boolean;
  exemptionReasonUz?: string;
  verificationStatus?: LegalVerificationStatus;
}

export interface CalculatorVersionDefinition<TInput = unknown> {
  version: string;             // e.g. "v1"
  versionCode: string;         // e.g. "GOV-001-v1"
  effectiveFrom: Date;
  effectiveTo?: Date | null;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  inputSchema: z.ZodType<TInput, any, any>;
  inputFields: CalculatorInputField[];
  legalSources: LegalSourceReference[];
  calculate: (
    inputs: TInput,
    context: CalculationContext
  ) => CalculationComputationOutput | Promise<CalculationComputationOutput>;
}

export interface CalculatorDefinition<TInput = unknown> {
  code: string;                // e.g. "GOV-001"
  slug: string;                // e.g. "fhdyo-tugilganlik-guvohnomasi"
  nameUz: string;
  nameRu?: string;
  nameEn?: string;
  categorySlug: string;
  descriptionUz: string;
  descriptionRu?: string;
  descriptionEn?: string;
  isPremium: boolean;
  premiumPrice?: string;
  estimatedMinutes: number;
  versions: CalculatorVersionDefinition<TInput>[];
}
