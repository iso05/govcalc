import { MOCK_CALCULATORS_INDEX, CalculatorSearchItem } from '@govcalc/config';

export interface SearchResult {
  item: CalculatorSearchItem;
  score: number;
  matchType: 'exact_title' | 'title_contains' | 'keyword' | 'synonym' | 'fuzzy';
  matchedTerm?: string;
}

export interface SearchQueryResponse {
  query: string;
  results: SearchResult[];
  total: number;
  suggestions: string[];
}

/**
 * Normalize Uzbek characters, accents, apostrophes and casing
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[‘`ʻ’']/g, "'")
    .replace(/o['’`]/g, "o'")
    .replace(/g['’`]/g, "g'")
    .replace(/\s+/g, ' ');
}

/**
 * Simple Levenshtein distance for fuzzy matching
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const d: number[][] = [];
  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,      // deletion
        d[i][j - 1] + 1,      // insertion
        d[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return d[m][n];
}

/**
 * Fuzzy word matching allowing 1-2 edit distance depending on length
 */
function isFuzzyMatch(word: string, target: string): boolean {
  if (word.length < 3) return false;
  const maxDistance = word.length <= 4 ? 1 : 2;
  const dist = levenshteinDistance(word, target);
  return dist <= maxDistance;
}

/**
 * Default search suggestion list for empty states
 */
export const DEFAULT_SEARCH_SUGGESTIONS = [
  'uy sotish',
  'sud boji',
  'mashina olib kirish',
  'doverennost',
  'tug‘ilganlik guvohnomasi',
  'daromad solig‘i',
];

/**
 * Pure, decoupled search index executor
 * Ready for future Meilisearch, Typesense, or Vector store integration.
 */
export function searchCalculators(
  rawQuery: string,
  categoryFilter?: string
): SearchQueryResponse {
  const query = normalizeText(rawQuery);

  if (!query) {
    const list = categoryFilter
      ? MOCK_CALCULATORS_INDEX.filter((c) => c.category === categoryFilter)
      : MOCK_CALCULATORS_INDEX;

    return {
      query: '',
      results: list.map((item) => ({
        item,
        score: 100,
        matchType: 'title_contains',
      })),
      total: list.length,
      suggestions: DEFAULT_SEARCH_SUGGESTIONS,
    };
  }

  const queryWords = query.split(' ').filter(Boolean);
  const scoredResults: SearchResult[] = [];

  for (const item of MOCK_CALCULATORS_INDEX) {
    if (categoryFilter && item.category !== categoryFilter) {
      continue;
    }

    const titleNorm = normalizeText(item.title);
    const descNorm = normalizeText(item.description);
    const keywordsNorm = item.keywords.map(normalizeText);
    const synonymsNorm = item.synonyms.map(normalizeText);

    let score = 0;
    let matchType: SearchResult['matchType'] = 'fuzzy';
    let matchedTerm: string | undefined;

    // 1. Exact title match
    if (titleNorm === query) {
      score = 1000;
      matchType = 'exact_title';
      matchedTerm = item.title;
    }
    // 2. Title contains full query
    else if (titleNorm.includes(query)) {
      score = 800;
      matchType = 'title_contains';
      matchedTerm = item.title;
    }
    // 3. Synonym matching
    else if (synonymsNorm.some((s) => s.includes(query) || query.includes(s))) {
      const match = item.synonyms.find((s) => normalizeText(s).includes(query));
      score = 600;
      matchType = 'synonym';
      matchedTerm = match || item.synonyms[0];
    }
    // 4. Keyword matching
    else if (keywordsNorm.some((k) => k.includes(query) || queryWords.includes(k))) {
      const match = item.keywords.find((k) => normalizeText(k).includes(query));
      score = 400;
      matchType = 'keyword';
      matchedTerm = match;
    }
    // 5. Description contains query
    else if (descNorm.includes(query)) {
      score = 250;
      matchType = 'title_contains';
    }
    // 6. Fuzzy matching on title, keywords, or synonyms
    else {
      let fuzzyHit = false;
      for (const qWord of queryWords) {
        // Check title words
        const titleWords = titleNorm.split(' ');
        for (const tWord of titleWords) {
          if (isFuzzyMatch(qWord, tWord)) {
            score = 150;
            matchType = 'fuzzy';
            matchedTerm = tWord;
            fuzzyHit = true;
            break;
          }
        }
        if (fuzzyHit) break;

        // Check keywords
        for (const kw of keywordsNorm) {
          if (isFuzzyMatch(qWord, kw)) {
            score = 120;
            matchType = 'fuzzy';
            matchedTerm = kw;
            fuzzyHit = true;
            break;
          }
        }
        if (fuzzyHit) break;
      }
    }

    if (score > 0) {
      scoredResults.push({ item, score, matchType, matchedTerm });
    }
  }

  scoredResults.sort((a, b) => b.score - a.score);

  // Suggested searches logic
  let suggestions = DEFAULT_SEARCH_SUGGESTIONS;
  if (scoredResults.length === 0) {
    // Generate context-aware suggestions
    suggestions = DEFAULT_SEARCH_SUGGESTIONS.filter((s) => s !== rawQuery);
  }

  return {
    query: rawQuery,
    results: scoredResults,
    total: scoredResults.length,
    suggestions,
  };
}
