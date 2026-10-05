# GovCalc Architecture Specification

GovCalc is a production-grade legal and financial calculation platform tailored for Uzbekistan's citizens and businesses. It calculates government duties, state court fees, notary fees, taxes, customs, traffic-related charges, and official expenses.

---

## 1. High-Level Architecture

```text
govcalc/
├── apps/
│   ├── web/                     # Next.js 15 App Router (Tailwind CSS, Lucide, React Hook Form, Zod)
│   └── api/                     # NestJS (Prisma ORM, PostgreSQL, Redis, Swagger OpenAPI)
├── packages/
│   ├── ui/                      # Design system tokens, buttons, inputs, alerts, formatters
│   ├── types/                   # Unified TypeScript models, LegalSource, CalculatorDefinition
│   ├── validation/              # Zod validation schemas with contextual error messages
│   ├── calculators/             # Calculation engine, versioned definitions registry
│   └── config/                  # Categories config, search index metadata, site constants
├── docs/                        # Architecture, engine, database, and security documentation
└── tests/                       # Unit tests (Vitest) & E2E browser tests (Playwright)
```

---

## 2. Core Principles

1. **Skeleton-First & Separation of Concerns**:
   - The UI and application shell are decoupled from specific legal formulas.
   - All legal provisions, articles, and formulas are version-tracked and validated against official sources (`lex.uz`).
2. **Decimal Precision**:
   - Floating-point arithmetic (`0.1 + 0.2 = 0.30000000000000004`) is strictly forbidden for financial calculations.
   - All arithmetic uses arbitrary-precision math via `decimal.js`.
3. **Transparent Explainability**:
   - Every calculation produces a human-readable derivation:
     - Base rate / BHM applied.
     - Multiplier / percentage coefficient.
     - Categorized breakdown: State Duty (Davlat boji), Service Fee (Xizmat haqi), Other Fee (Boshqa to‘lovlar).
     - Statutory legal citations (LexUZ document number, article, paragraph).
4. **Mobile-First & Accessible**:
   - Responsive breakpoints: 360px, 390px, 430px, 768px, 1024px, 1280px, 1440px+.
   - Semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`).
   - Accessible form controls with visible focus rings and WCAG AAA contrast ratios.

---

## 3. Search Architecture

The search engine supports:
- **Exact Title Matching**: Highest priority score (1000).
- **Keyword Matching**: Tokenized tags across categories (400).
- **Synonym Matching**: Localized colloquial queries (e.g. `doverennost` -> `Avtomobil ishonchnomasi`, `kvartira sotish` -> `Uy sotish xarajatlari`) (600).
- **Fuzzy Matching**: Levenshtein distance (edit distance 1–2) for typos and Uzbek apostrophes (150).
- **Empty State Fallback**: Displays "Hech narsa topilmadi" with suggested popular queries.
