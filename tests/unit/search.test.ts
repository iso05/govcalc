import { describe, it, expect } from 'vitest';
import { searchCalculators } from '../../apps/web/lib/search';

describe('Hisobchi Search Architecture Unit Tests', () => {
  it('should find calculator by exact title match', () => {
    const res = searchCalculators('Tug‘ilganlik guvohnomasi');
    expect(res.total).toBeGreaterThan(0);
    expect(res.results[0].item.id).toBe('GOV-001');
    expect(res.results[0].matchType).toBe('exact_title');
  });

  it('should find calculator by keywords (e.g. "sud boji", "da’vo")', () => {
    const res = searchCalculators('sud boji');
    expect(res.total).toBeGreaterThan(0);
    const found = res.results.some((r) => r.item.id === 'CRT-001');
    expect(found).toBe(true);
  });

  it('should find calculator by synonyms (e.g. "doverennost", "mashinaga doverennost")', () => {
    const res = searchCalculators('doverennost');
    expect(res.total).toBeGreaterThan(0);
    expect(res.results[0].item.id).toBe('NOT-002');
    expect(res.results[0].matchType).toBe('synonym');
  });

  it('should find calculator by fuzzy match (e.g. "kvartira sotsh")', () => {
    const res = searchCalculators('kvartira sotsh');
    expect(res.total).toBeGreaterThan(0);
    const found = res.results.some((r) => r.item.id === 'CAD-008');
    expect(found).toBe(true);
  });

  it('should return empty result and suggestions when nothing is found', () => {
    const res = searchCalculators('xyznoexistterm123');
    expect(res.total).toBe(0);
    expect(res.results.length).toBe(0);
    expect(res.suggestions.length).toBeGreaterThan(0);
  });
});
