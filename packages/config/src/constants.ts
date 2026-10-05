export const LEGAL_VERIFICATION_STATUSES = {
  VERIFIED: 'VERIFIED',
  NEEDS_REVIEW: 'NEEDS_REVIEW',
  CONFLICT: 'CONFLICT',
  EXPIRED: 'EXPIRED',
} as const;

export const CALCULATOR_STATUSES = {
  MOCK: 'mock',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  DEPRECATED: 'deprecated',
} as const;

export const DEFAULT_CURRENCY = 'UZS' as const;
