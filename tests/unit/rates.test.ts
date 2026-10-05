import { expect, it } from 'vitest';
import { getBhmForDate } from '@govcalc/config';
it('keeps the verified 2024 and 2025 BHM transitions distinct', () => {
  expect(getBhmForDate('2024-09-30T23:59:59Z').value).toBe('340000.00');
  expect(getBhmForDate('2024-10-01').value).toBe('375000.00');
  expect(getBhmForDate('2025-07-31T23:59:59Z').value).toBe('375000.00');
  expect(getBhmForDate('2025-08-01').value).toBe('412000.00');
  expect(getBhmForDate('2026-10-05').status).toBe('PROVISIONAL');
});
it('does not silently turn invalid or unsupported dates into a valid rate', () => {
  expect(() => getBhmForDate('invalid')).toThrow();
  expect(() => getBhmForDate('2010-01-01')).toThrow();
});
