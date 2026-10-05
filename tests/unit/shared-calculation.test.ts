import { expect, it } from 'vitest';
import { readSharedCalculation, shareCalculationUrl } from '../../apps/web/lib/shared-calculation';
it('preserves selected case and discounts in a share link without unrelated query data', () => {
  const inputs = { caseType: 'DUPLICATE_CERTIFICATE' as const, channel: 'OFFLINE_FHDYO' as const, specialExemption: 'none' as const, socialDiscount: true, deliveryOption: 'postal' as const };
  const url = new URL(shareCalculationUrl('https://example.com/calculators/fhdyo-tugilganlik-guvohnomasi?unrelated=x', inputs));
  expect(url.searchParams.has('unrelated')).toBe(false);
  expect(readSharedCalculation(url.search)).toEqual(inputs);
});
it('does not coerce invalid shared inputs to valid values', () => {
  expect(readSharedCalculation('?caseType=INVALID')).toBeUndefined();
  expect(readSharedCalculation('?socialDiscount=anything')).toBeUndefined();
  expect(readSharedCalculation('')).toBeUndefined();
});
