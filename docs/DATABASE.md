# GovCalc Database Architecture & Schema Specification

GovCalc uses **PostgreSQL 16** managed through **Prisma ORM**, designed with high normalization, strict relational integrity, and audit logging.

---

## 1. Entity Relationship Overview

```text
Category (1) ────< (N) Calculator (1) ────< (N) CalculatorVersion (1) ────< (N) CalculatorInput
                                                       │
                                                       ├───< (N) CalculatorVersionLegalSource >─── (1) LegalSource
                                                       │
                                                       └───< (N) Calculation (1) ──── (1) CalculationResult ────< (N) CalculationItem
                                                                      │
                                                       User (1) ──────┘
```

---

## 2. Table Specifications

### 2.1 `categories`
- `id` (UUID, Primary Key)
- `slug` (VARCHAR, Unique, Indexed)
- `nameUz`, `nameRu`, `nameEn` (VARCHAR)
- `descriptionUz`, `descriptionRu`, `descriptionEn` (TEXT)
- `icon` (VARCHAR) — Lucide icon key
- `sortOrder` (INT)
- `isActive` (BOOLEAN, Default: true)

### 2.2 `calculators`
- `id` (UUID, Primary Key)
- `slug` (VARCHAR, Unique, Indexed)
- `code` (VARCHAR, Unique) e.g. `GOV-001`, `CRT-001`
- `nameUz`, `nameRu`, `nameEn` (VARCHAR)
- `descriptionUz` (TEXT)
- `categoryId` (UUID, Foreign Key -> `categories.id`)
- `isPremium` (BOOLEAN, Default: false)
- `premiumPrice` (DECIMAL(18,2), Nullable)
- `estimatedMinutes` (INT, Default: 2)
- `status` (ENUM: `DRAFT`, `PUBLISHED`, `ARCHIVED`, `UNDER_REVIEW`)

### 2.3 `calculator_versions`
- `id` (UUID, Primary Key)
- `calculatorId` (UUID, Foreign Key -> `calculators.id`)
- `versionNumber` (INT)
- `versionCode` (VARCHAR, Unique) e.g. `GOV-001-v1`
- `effectiveFrom` (TIMESTAMP WITH TIME ZONE)
- `effectiveTo` (TIMESTAMP WITH TIME ZONE, Nullable)
- `isActive` (BOOLEAN, Default: true)
- `formulaDescriptionUz` (TEXT)
- `notesUz` (TEXT, Nullable)

### 2.4 `legal_sources`
- `id` (UUID, Primary Key)
- `code` (VARCHAR, Unique) e.g. `LEX-4622285`
- `titleUz` (VARCHAR)
- `documentType` (VARCHAR) — Qonun, VM Qarori, Prezident Farmoni
- `documentNumber` (VARCHAR) e.g. `O‘RQ-600`
- `publicationDate` (DATE)
- `effectiveDate` (DATE)
- `officialUrl` (TEXT)
- `articleParagraph` (TEXT)
- `verificationStatus` (ENUM: `VERIFIED`, `NEEDS_REVIEW`, `CONFLICT_DETECTED`)
- `lastVerifiedAt` (TIMESTAMP WITH TIME ZONE)

### 2.5 `calculations` & `calculation_results`
- Stores anonymous and authenticated calculation snapshots.
- All monetary amounts stored as `DECIMAL(18, 2)`.
- Multipliers stored as `DECIMAL(18, 4)`.

---

## 3. RBAC & Security
- `UserRole`: `CITIZEN`, `ENTREPRENEUR`, `ACCOUNTANT`, `LAWYER`, `ADMIN`, `SUPERADMIN`.
- Read-only public access to verified published calculators.
- Role-based mutation restricted to authorized legal/admin operators with audit tracking.
