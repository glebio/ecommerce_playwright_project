# E-Commerce Test Automation Framework (Playwright/TypeScript)

![Node.js](https://img.shields.io/badge/node-%3E%3D18-blue)
![Playwright](https://img.shields.io/badge/playwright-1.50%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D4.9-blue)
![Allure](https://img.shields.io/badge/allure-reporting-orange)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

Made with ❤️ by the professionals at [**QAresults**](https://qaresults.com) — Let’s Make Your Product Better with
Automated Testing!

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Development Standards and Best Practices](#development-standards-and-best-practices)
- [Test Coverage: Detailed List of Test Cases](#test-coverage-detailed-list-of-test-cases)
- [Test Reports](#test-reports)
- [Contributing](#contributing)
- [License](#license)

## Overview

This **Test Framework** provides robust and maintainable test automation for **E-commerce websites**.<br/><br/>
For a real demonstration of how the automated tests work, our team developed a dedicated test
website 🚀: <a href="https://shop.qaresults.com" target="_blank">shop.qaresults.com</a>&nbsp;<br/><br/>
[![Shop Screenshot](https://github.com/user-attachments/assets/ad92704b-a6bb-4779-9b33-24cf3326280f "Click to open test store")](https://shop.qaresults.com)<br/><br/>
Test Framework leverages
the ![Playwright](https://img.shields.io/badge/-Playwright-45ba63?logo=playwright&logoColor=white) [Playwright](https://playwright.dev/)
testing library
and ![TypeScript](https://img.shields.io/badge/-TypeScript-3178c6?logo=typescript&logoColor=white) [TypeScript](https://www.typescriptlang.org/)
for validating critical functionalities such as **product search**, **filtering**, **sorting**, **user-generated
interactions** (like reviews and ratings) ond others.

## Key Features

- **Automated UI Tests**  
  Covers critical user journeys including product search, category navigation, filtering, sorting, and checkout.
- **User Interactions**  
  Validates functionality like reviews, ratings, and other interactive site elements.
- **Scalability & Maintainability**  
  Supports multiple environments and easy CI/CD integration.
- **Flexible Configuration**  
  Centralizes base URLs, environment variables, and test data for efficient test management.

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/glebio/ecommerce_playwright_project.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the base URL**
  - Open the `playwright.config.ts` file (or your relevant configuration file).
  - Update the `baseURL` property to point to the environment you wish to test. For example:
    ```ts
    use: {
      baseURL: 'https://shop.qaresults.com'
    }
    ```

## Usage

- **Run All Tests**
  ```bash
  npx playwright test
  ```

- **Run Specific Tests**
  ```bash
  npm run test:ci-smoke
  ```
  Use tags or separate configurations for targeted test execution.

- **Clean generated artifacts (reports, traces)**
  ```bash
  npm run clean:reports
  ```

- **Headed vs. Headless**
  - Toggle `headless: false` or `headless: true` in your configuration for debugging (headed) or performance (headless).

## Requirements

- **Node.js** (latest version recommended)
- **Playwright** (installed via `npm install`)
- Other dependencies found in `package.json`

## Project Structure

```text
📦 ecommerce-playwright-framework
 ┃
 ┣━━ 📂 .github/workflows/             # 🐙 GitHub Actions (primary CI)
 ┃   ┗━━ 📄 e2e.yml                    # Jobs: install → test → upload artifacts
 ┣━━ 📄 .gitlab-ci.yml                 # 🦊 (optional) GitLab CI entrypoint (if GitLab is used)
 ┣━━ 📄 Jenkinsfile                    # 👷 (optional) Jenkins pipeline (if Jenkins is used)
 ┃
 ┣━━ 📂 tests/                         # 🧪 Test layer (spec files only)
 ┃   ┣━━ 📂 setup/                     # 🛠 Global setup & preconditions
 ┃   ┃   ┗━━ 📄 auth.setup.ts          # One-time login → saves storageState
 ┃   ┣━━ 📂 smoke/                     # ⚡ Smoke suite (fast PR gate)
 ┃   ┃   ┣━━ 📄 search.spec.ts
 ┃   ┃   ┗━━ 📄 checkout-light.spec.ts
 ┃   ┣━━ 📂 regression/                # 🐢 Full regression (grouped by modules)
 ┃   ┃   ┣━━ 📂 catalog/               # Filters, sorting, search
 ┃   ┃   ┣━━ 📂 cart/                  # Promos, taxes, item removal
 ┃   ┃   ┗━━ 📂 user-profile/          # Account, password change
 ┃   ┗━━ 📂 api/                       # 🔌 (optional) API tests (contract/integration)
 ┃
 ┣━━ 📂 src/                           # 🧠 Framework layer (reusable code)
 ┃   ┣━━ 📂 app/                       # ⚙️ Framework entry point
 ┃   ┃   ┣━━ 📄 test.ts                # Custom test() + fixtures (single import point)
 ┃   ┃   ┗━━ 📄 config.ts              # Env validation (URL, creds, flags)
 ┃   ┃
 ┃   ┣━━ 📂 pages/                     # 📑 Pages (locators + simple actions)
 ┃   ┃   ┣━━ 📄 base.page.ts           # Navigation helpers, waits, common actions
 ┃   ┃   ┣━━ 📄 home.page.ts
 ┃   ┃   ┣━━ 📄 plp.page.ts
 ┃   ┃   ┣━━ 📄 pdp.page.ts
 ┃   ┃   ┗━━ 📄 cart.page.ts
 ┃   ┃
 ┃   ┣━━ 📂 components/                # 🧩 Reusable UI components
 ┃   ┃   ┣━━ 📄 header.component.ts
 ┃   ┃   ┗━━ 📄 footer.component.ts
 ┃   ┃
 ┃   ┣━━ 📂 flows/                     # 🚦 Business flows (workflows/steps)
 ┃   ┃   ┣━━ 📄 search.flow.ts
 ┃   ┃   ┗━━ 📄 checkout.flow.ts
 ┃   ┃
 ┃   ┣━━ 📂 selectors/                 # 🏷️ Centralized TestIDs/locators
 ┃   ┃   ┗━━ 📄 testids.ts
 ┃   ┃
 ┃   ┣━━ 📂 data/                      # 💾 Test data (constants/fixtures)
 ┃   ┃   ┣━━ 📄 test-users.ts
 ┃   ┃   ┗━━ 📄 test-products.ts
 ┃   ┃
 ┃   ┣━━ 📂 utils/                     # 🔨 Utilities/helpers
 ┃   ┃   ┣━━ 📄 api-client.ts
 ┃   ┃   ┗━━ 📄 logger.ts
 ┃   ┃
 ┃   └── 📂 types/                     # 🧾 (optional) Shared TS types/interfaces
 ┃       └── 📄 index.ts
 ┃
 ┣━━ 📄 playwright.config.ts           # 🛠 Playwright global configuration
 ┣━━ 📄 package.json                   # 📦 Dependencies + run scripts
 ┣━━ 📄 package-lock.json              # 🔒 Locked dependency versions
 ┣━━ 📄 tsconfig.json                  # 📘 TypeScript config (path aliases, etc.)
 ┣━━ 📄 .gitignore                     # 🚫 Ignored files/patterns
 ┣━━ 📄 README.md                      # 📄 Project documentation
 ┣━━ 📄 .env.example                   # 📝 Environment variables template (safe to commit)
 ┣━━ 📄 .env                           # 🔐 Local secrets (gitignored, NOT committed)
 ┃
 ┣━━ 📂 test-results/                  # (generated) Traces/screenshots/videos on failures
 ┣━━ 📂 playwright-report/             # (generated) Playwright HTML report
 ┗━━ 📂 allure-results/                # (optional, generated) Allure output (if enabled)

```

## Development Standards and Best Practices

To keep the project stable, readable, and easy to scale, we follow these standards.

### 1) Branch Naming Strategy

**Format:** `[type]/[project-prefix]-[task-id]-[short-description]`

- **feature/** — new functionality (new flows, pages, fixtures, tests)
- **fix/** — bug fixes, locator updates, flaky test stabilization
- **chore/** — dependencies, tooling, configs, refactoring (no behavior change)
- **docs/** — documentation updates

**Example:** `feature/EPP-107-add-cart-page`

### 2) Commit Messages (Conventional Style)

Use short, descriptive commits:

- `feat: add cart page and flow`
- `fix: stabilize search locator on home page`
- `chore: update Playwright version`
- `docs: update README with project structure`

### 3) Automation Principles

- **Stable Locators First:** Prefer `data-testid` and Playwright `getByRole()` over CSS/XPath.
- **No Explicit Waits:** Avoid `page.waitForTimeout()`. Use web-first assertions (`expect(...)`) and built-in
  auto-waiting.
- **No Hardcoded Selectors in Tests:** Tests should use the `pages/` and `components/` layer (avoid raw selector strings
  in spec files).
- **Test Independence:** Each test should run in isolation and in any order (no shared mutable state).
- **CI Debuggability:** On failure, CI should publish artifacts (HTML report + trace/screenshot/video, if enabled).

## Test Coverage: Detailed List of Test Cases

Below is a comprehensive list of test cases designed for an E-commerce site. These cover everything from basic smoke
checks to more in-depth scenarios like user authentication, payment flows, and performance testing.

> ✅ – Autotest is ready and implemented.

---

### 1. API & Backend Health Checks

#### 1.1 API/Backend Health Check (if API is available)

- **Healthcheck Endpoint** ✅  
  Check: `GET /api/healthcheck` (or equivalent) to ensure it returns a `200 OK` status.
- **Key API Requests** ✅  
  Validate important endpoints such as: `GET /products`, `GET /categories`, `GET /cart`  
  Confirm: proper **status codes**, valid **JSON structure**, acceptable **response time**

#### 1.2 Page-Level Smoke Checks

- **Public Key Pages** ✅  
  Ensure: the following key pages are reachable and return `200 OK`: Home, Category/Catalog, Product, Cart

#### 🔍 Summary

- If an API exists, begin with **1.1** to verify `/api/healthcheck` returns a `200 OK` response.
- Regardless of API availability, ensure all major pages (home, catalog, product, cart) return a `200 OK` status.
---

### 2. Smoke Tests – Critical Elements & Basic Functionality

#### 2.1 Critical Element Verification (UI/Visual Checks)

**Purpose**: Verify that critical elements and basic website functionality operate correctly.

- **Page Load** ✅
  - Ensure home page, category pages, and product pages load without errors.
  - Check images, text, overall speed, and SEO elements.
- **Logo Display** ✅
  - Confirm the site logo is visible on all key pages and redirects correctly to the home page.
- **Main Menu Navigation** ✅
  - Verify the main menu is visible, with working links (Categories, Account, Cart).
  - Check category links navigate correctly to product listings.
- **Category Navigation** ✅
  - Verify that each category link in the main menu leads to its product listing page.
  - Ensure the listing page shows a visible product list with at least one item.
- **Search Bar Visibility** ✅
  - Ensure the search bar is visible on the home page and throughout the site, with placeholder text.
- **Hero Image/Banners** ✅
  - Check the homepage hero image or carousel loads and links to correct sections.
- **Promotional Banners/Pop-ups** ✅
  - Confirm any discount or newsletter pop-ups appear as expected and can be dismissed.
- **Cart Icon** ✅
  - Verify the cart icon is visible and update the item count when products are added.
- **Sign In/Sign Up** ✅
  - Confirm sign-in/sign-up buttons work and lead to the correct pages.
- **Breadcrumbs** ✅
  - Ensure breadcrumbs on category/product pages reflect the correct navigation path.
- **Footer & Social Links** ✅
  - Check footer links (contact, policies) and social icons direct to valid pages.
- **Error Messages & Loaders** ✅
  - Validate 404 pages, error messages, and loading spinners are displayed and styled correctly.

#### 2.2 Basic Functional Tests (Core Store Functions)

- **Add to Cart Button** ✅
  - Check items can be added to the cart from product listing and detail pages.
- **Cart Icon** ✅
  - Clicking the cart icon opens the cart page.
- **Checkout Access**
  - From the cart, ensure users can proceed to checkout.

---

### 3. Critical Path Tests – Full Purchase Flow (E2E)

**Purpose**: Verify that a user can complete a purchase from product selection to order confirmation without any errors.

- **Product Page & Details**
  - Confirm clicking a product leads to correct details (price, description, images).
- **Add to Cart & Update Quantities**
  - Validate adding items to the cart and modifying quantity.
- **Cart Review**
  - Ensure the cart page lists correct products, prices, and totals.
- **Checkout Process**
  - Fill in shipping/billing details, select delivery and payment method, confirm order.
- **Order Confirmation Page**
  - Check for an order confirmation message post-purchase.
- **Form Validation**
  - Verify correct error handling for missing or invalid inputs.
- **Payment Gateway Integration**
  - Test payment flow, ensuring correct success/failure page redirects.

---

### 4. Regression UI Tests – Deeper Functionality Check

**Purpose**: Validate additional site features and edge cases beyond the critical purchase path.

- **Filtering & Sorting** ✅
  - Verify filtering by categories, price, availability, plus sorting by price, rating, popularity.
- **Advanced Search**
  - Check accurate search results based on keywords or filters.
- **Product Recommendations**
  - Ensure “Related Products” or “You May Also Like” sections display relevant items.
- **Promo Codes & Discounts**
  - Test applying promo codes and validating discount calculations.
- **Out-of-Stock Notifications**  ✅
  - Confirm users can sign up for notifications on out-of-stock products.
- **Review & Rating Display**
  - Check product reviews/ratings are visible and correctly aggregated.

---

### 5. Load/Performance Testing (Optional)

**Purpose**: Assess website performance under heavy traffic (e.g., Black Friday).

- **Concurrent Users**
  - Simulate multiple users browsing, adding items, and checking out simultaneously.
- **Performance Monitoring**
  - Measure page load times, server response, and checkout speed under load.
- **Cart & Checkout Resilience**
  - Confirm the site doesn’t slow down or crash during peak usage.

---

### 6. Visual Testing (Optional: Percy, Applitools)

**Purpose**: Detect visual regressions and layout shifts that affect user experience.

- **Visual Comparisons**
  - Compare new UI changes against baseline screenshots for unexpected differences.
- **Responsive Layout**
  - Validate design consistency across desktop, tablet, and mobile breakpoints.
- **Hero Images & Banners**
  - Check that images and banners render correctly on all devices.

---

### 7. User Account Functionality (Order History, Addresses, Settings)

**Purpose**: Validate user-specific features, including registration, login, and profile management.

- **Registration & Login**
  - Confirm users can register, log in/out, and handle wrong credentials.
- **Profile & Address Management**
  - Ensure users can update personal information and add/edit shipping addresses.
- **Order History & Tracking**
  - Check past orders display correctly, with trackable order status.
- **Password Recovery**
  - Test “Forgot Password” flow and email reset link functionality.

---

### 8. Customer Service (Support & Contact)

**Purpose**: Ensure all support channels are accessible and functional.

- **Contact Forms**
  - Check form submission for support requests; validate success message or email.
- **FAQ & Help Pages** ✅
  - Ensure they load correctly and cover key questions.
- **Live Chat (if applicable)**
  - Validate that chat is available and responsive.
- **Order Tracking from Support**
  - Confirm users can track orders directly from help pages (if implemented).

---

## Test Reports

After running the tests, you can view the **Allure Report** using:

```bash
npx allure serve allure-results
```

## Contributing

Contributions are welcome! Please follow our existing coding conventions and testing standards. If you add or revise
tests, remember to update this coverage list (or any separate documentation) to keep everything in sync.

## License

This project is licensed under the **MIT License**.
