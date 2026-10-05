import {
  CalculationResult,
  CalculatorMetadata,
  Category,
  LegalSource,
} from '@govcalc/types';

const API_BASE =
  typeof window === 'undefined'
    ? process.env.API_URL || 'http://localhost:4000/api/v1'
    : '/api/v1';

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCalculators(params?: {
  search?: string;
  category?: string;
  isPremium?: boolean;
}): Promise<CalculatorMetadata[]> {
  try {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.category) query.set('category', params.category);
    if (params?.isPremium !== undefined) query.set('isPremium', String(params.isPremium));

    const res = await fetch(`${API_BASE}/calculators?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch calculators');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching calculators:', error);
    return [];
  }
}

export async function getCalculator(slug: string) {
  const res = await fetch(`${API_BASE}/calculators/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch calculator');
  }
  const json = await res.json();
  return json.data;
}

export async function executeCalculation(
  slug: string,
  inputs: Record<string, unknown>,
  targetDate?: string
): Promise<CalculationResult> {
  const res = await fetch(`${API_BASE}/calculators/${slug}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({ inputs, targetDate }),
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || json.error?.message || 'Hisoblashda xatolik yuz berdi');
  }

  return json.data;
}

export async function getSystemRates() {
  try {
    const res = await fetch(`${API_BASE}/system-settings/rates`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch system rates');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching rates:', error);
    return { bhm: '440000.00', minimumWage: '1150000.00', currency: 'UZS' };
  }
}
