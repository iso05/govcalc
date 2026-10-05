import { CalculationResult } from '@govcalc/types';

export interface SavedResultItem {
  id: string;
  savedAt: string; // ISO date string
  calculatorSlug: string;
  calculatorTitle: string;
  caseLabel: string;
  totalFormatted: string;
  stateDutyFormatted: string;
  emblemFeeFormatted: string;
  serviceFeeFormatted: string;
  inputs?: any;
  result: CalculationResult;
}

const STORAGE_KEY = 'hisobchi_saved_results';

export function getSavedResults(): SavedResultItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read saved results from localStorage:', err);
    return [];
  }
}

export function saveResultItem(
  item: Omit<SavedResultItem, 'id' | 'savedAt'>
): SavedResultItem {
  const existing = getSavedResults();
  const newItem: SavedResultItem = {
    ...item,
    id: `${item.calculatorSlug}_${Date.now()}`,
    savedAt: new Date().toISOString(),
  };

  // Remove existing entry if exact same case and amount to avoid unnecessary duplicates
  const filtered = existing.filter(
    (e) =>
      !(
        e.calculatorSlug === item.calculatorSlug &&
        e.caseLabel === item.caseLabel &&
        e.totalFormatted === item.totalFormatted
      )
  );

  const updated = [newItem, ...filtered].slice(0, 50); // Keep last 50
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    throw new Error('Natijani saqlash uchun brauzer xotirasi mavjud emas');
  }
  return newItem;
}

export function removeSavedResultItem(id: string): SavedResultItem[] {
  const existing = getSavedResults();
  const updated = existing.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update saved results in localStorage:', err);
  }
  return updated;
}

export function clearAllSavedResults(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear saved results in localStorage:', err);
  }
}
