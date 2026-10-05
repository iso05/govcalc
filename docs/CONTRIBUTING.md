# Contributing to GovCalc

## Adding a New Calculator (e.g. `COURT-001` or `NOTARY-001`)

1. Define the input Zod schema with localized Uzbek Latin error messages in `packages/validation`.
2. Add the calculator definition and version calculation in `packages/calculators/src/definitions/`.
3. Link official LexUZ citations with verification status.
4. Add unit test matrix in `packages/calculators/tests/`.
5. Run `npm run test` and `npm run build` to verify.
