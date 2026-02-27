# E-Commerce Playwright Framework

End-to-end test automation framework for [shop.qaresults.com](https://shop.qaresults.com) built with Playwright and
TypeScript.

## Quick Start

```bash
# Install dependencies
npm ci

# Install browsers
npx playwright install --with-deps

# Run CI smoke tests
npm run test:ci-smoke

# Run all smoke tests (including legacy)
npm run test:smoke

# Run regression tests
npm run test:regression

# View HTML report
npm run report
```

## Available Scripts

| Script                    | Description                            |
|---------------------------|----------------------------------------|
| `npm run test:ci-smoke`   | CI smoke suite — fast PR gate          |
| `npm run test:smoke`      | All smoke tests (ci + legacy)          |
| `npm run test:regression` | Full regression suite                  |
| `npm run test:list`       | List all discovered tests              |
| `npm run typecheck`       | TypeScript compilation check           |
| `npm run report`          | Open Playwright HTML report            |
| `npm run clean:reports`   | Remove generated reports and artifacts |

## Project Structure

```
src/
├── components/          # Reusable UI blocks (header, category menu)
├── pages/               # Page objects (home, plp, pdp, cart, category)
│   └── _legacy/         # Old page objects used by regression tests
├── selectors/           # Centralized selectors
└── utils/               # Helpers and utilities

tests/
├── smoke/
│   ├── ci/              # CI smoke tests (new architecture, runs on every PR)
│   └── _legacy/         # Old smoke tests (to be migrated)
└── regression/          # Full regression suite (legacy architecture)
```

`src/pages/*.ts` (PascalCase) re-export legacy Page Objects from `src/pages/_legacy` to keep older imports working.

## Architecture

The framework follows a layered Page Object pattern:

```
spec files (what to test)
  → page objects (how to interact)
    → components (reusable UI blocks)
      → selectors (where elements are)
```

Each layer knows only the layer below. Tests never use raw selectors directly.

**New architecture** (`*.page.ts`) is used in CI smoke tests. Page objects expose Locators via getters, components
handle shared UI blocks (header appears on every page), and all selectors live in a single centralized file.

**Legacy architecture** (`*Page.ts`) is used in regression tests and is planned for migration.

## CI Smoke Tests

The CI smoke suite covers critical user paths and runs on every PR via GitHub Actions:

| Test                   | What it verifies                                         |
|------------------------|----------------------------------------------------------|
| Search bar visibility  | Search box present on Home and PLP                       |
| Search and add to cart | Search → select product → add to cart → verify cart item |
| Category navigation    | Navigate to categories, verify products displayed        |
| Sign in / Sign up      | Account dropdown, login and register links work          |
| Logo                   | Logo visible and navigates to home                       |

### CI Configuration

Playwright config auto-detects CI environment:

- **CI:** headless Chromium, 1 worker, 1 retry, Allure + HTML reporters, artifacts on failure
- **Local:** headed Chrome, parallel workers, no retries, list reporter only

Artifacts collected on failure: screenshots, videos, trace files. Available as GitHub Actions artifacts for 14 days.

## Design Decisions

**Single config file.** One `playwright.config.ts` with `isCI` detection instead of separate CI config. Less
duplication, same behavior.

**Centralized selectors.** All locators in `src/selectors/selectors.ts`. When UI changes, fix one file. Trade-off: file
grows over time, but manageable at current scale.

**Components for shared UI.** Header and category menu are components, not page methods. They appear on multiple pages,
so they're composed into page objects via constructor.

**test.step() for reporting.** Business-level steps in smoke tests make trace viewer and HTML reports human-readable
without adding framework complexity.

**Smoke vs regression separation.** CI smoke tests use the new architecture and run fast (~60s). Regression tests use
legacy page objects and run separately. Migration is planned but not blocking.

## Flaky Test Policy

- Flaky tests are not tolerated in CI smoke. If a test fails intermittently, it gets fixed or removed.
- `retries: 1` on CI catches infrastructure flakiness (network, browser startup). If a test needs more than 1 retry, the
  test is broken.
- `trace: 'on-first-retry'` captures diagnostic data only when needed, without bloating every run.
- No `page.waitForTimeout()` anywhere. All waits use Playwright auto-wait and web-first assertions.

## Development Standards

**Branch naming:** `[type]/[prefix]-[id]-[description]` (e.g., `feature/EPP-107-add-cart-page`)

**Commits:** Conventional style — `feat:`, `fix:`, `chore:`, `docs:`

**Locators:** Prefer stable selectors (role, testid, semantic) over brittle CSS/XPath. No hardcoded selectors in spec
files.

**Test independence:** Each test runs in isolation, in any order, with no shared state.

---

> **Author's note:** When building any solution — whether it's a test framework, an API, or a data pipeline — remember
> that working code is just the starting point. A good solution is one that's easy to read, maintain, extend, and debug by
> someone who didn't write it. Design for the next person, not just for the task at hand.