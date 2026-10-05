import { Gov001InputSchema, type Gov001Input } from '@govcalc/validation';
const keys = ['caseType', 'channel', 'specialExemption', 'socialDiscount', 'deliveryOption'] as const;

export function shareCalculationUrl(currentUrl: string, inputs?: Gov001Input): string {
  const url = new URL(currentUrl);
  url.search = '';
  if (inputs) for (const key of keys) {
    const value = inputs[key];
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url.toString();
}

export function readSharedCalculation(search: string): Gov001Input | undefined {
  const params = new URLSearchParams(search);
  if (!keys.some(key => params.has(key))) return undefined;
  const value: Record<string, unknown> = {};
  for (const key of keys) if (params.has(key)) {
    const raw = params.get(key);
    if (key === 'socialDiscount') {
      if (raw !== 'true' && raw !== 'false') return undefined;
      value[key] = raw === 'true';
    } else value[key] = raw;
  }
  const parsed = Gov001InputSchema.safeParse(value);
  return parsed.success ? parsed.data : undefined;
}
