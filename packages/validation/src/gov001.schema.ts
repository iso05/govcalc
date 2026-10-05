import { z } from 'zod';

export const Gov001CaseEnum = z.enum([
  'FIRST_CERTIFICATE',
  'SINGLE_MOTHER',
  'LATE_OR_SPECIAL',
  'PATERNITY_ESTABLISHMENT',
  'ADOPTION',
  'DUPLICATE_CERTIFICATE',
  'RESTORATION_OF_RECORD',
  'CORRECTION_FHDY_ERROR',
  'CORRECTION_OTHER_UNDER_16',
  'CORRECTION_OTHER_16_AND_ABOVE',
  'ARCHIVE_DUPLICATION_REISSUE',
  'FOREIGN_CERTIFICATE',
]);

export type Gov001Case = z.infer<typeof Gov001CaseEnum>;

export const Gov001ChannelEnum = z.enum(['ONLINE_YIDXP', 'OFFLINE_FHDYO']);
export type Gov001Channel = z.infer<typeof Gov001ChannelEnum>;

export const Gov001SpecialExemptionEnum = z.enum([
  'none',
  'orphan',
  'natural_disaster',
  'technological_disaster',
  'rehabilitation',
]);
export type Gov001SpecialExemption = z.infer<typeof Gov001SpecialExemptionEnum>;

export const Gov001InputSchema = z.object({
  caseType: Gov001CaseEnum.optional(),
  channel: Gov001ChannelEnum.default('ONLINE_YIDXP'),
  specialExemption: Gov001SpecialExemptionEnum.default('none'),
  socialDiscount: z.boolean().default(false),
  deliveryOption: z.enum(['none', 'postal']).default('none'),

  // Backwards-compatibility fields with previous UI/API calls
  serviceType: z.enum(['initial_timely', 'single_mother', 'initial_delayed', 'duplicate_copy', 'certificate_with_change']).optional(),
  isSocialExempt: z.boolean().optional(),
}).strict();

export type Gov001Input = z.infer<typeof Gov001InputSchema>;
