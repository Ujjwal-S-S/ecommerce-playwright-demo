# 🛒 E-Commerce React Storefront & Playwright Demo

> Production-grade React 18 + TypeScript storefront with **Vitest unit tests**, **Playwright Page Object Model (POM) E2E suite**, and automated **[Smart Regression Agent](https://github.com/Ujjwal-S-S/smart-regression-agent)** for AI-powered regression test selection in GitHub Actions CI.

---

## ⚡ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript (Strict Mode), Vite 6
- **Unit Testing**: Vitest 5, `@testing-library/react`, `@testing-library/jest-dom`
- **End-to-End Testing**: Playwright Test with Page Object Models (`playwright/e2e/pages/`)
- **AI Regression Agent**: Smart Regression Agent CLI (`smart-test`) with Gemini 3.5 Flash Lite
- **Continuous Integration**: GitHub Actions multi-stage CI pipeline (UT & Build &rarr; AI Impact &rarr; E2E Run)

---

## 📂 Project Structure

```
ecommerce-playwright-demo/
├── .github/workflows/
│   └── smart-regression.yml         # CI Pipeline: Lint & UT & Build -> AI E2E Selection
├── src/
│   ├── components/                  # React Components
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Payment.tsx
│   │   ├── Profile.tsx
│   │   └── __tests__/               # Vitest Unit Tests (UT)
│   │       ├── Cart.test.tsx
│   │       ├── Checkout.test.tsx
│   │       ├── Payment.test.tsx
│   │       └── Profile.test.tsx
│   ├── test/
│   │   └── setup.ts                 # Vitest test setup with @testing-library/jest-dom
│   ├── App.tsx                      # Storefront Tab Navigation & State
│   ├── App.css                      # Modern Design System (Inter, cards, badges)
│   ├── main.tsx                     # React DOM Root
│   └── types.ts                     # Domain TypeScript interfaces
├── playwright/
│   └── e2e/
│       ├── pages/                   # Page Object Models (POM)
│       │   ├── base.page.ts
│       │   ├── cart.page.ts
│       │   ├── checkout.page.ts
│       │   ├── payment.page.ts
│       │   └── profile.page.ts
│       └── tests/                   # Playwright E2E Specs
│           ├── cart.spec.ts
│           ├── checkout.spec.ts
│           ├── payment.spec.ts
│           └── profile.spec.ts
├── playwright.config.ts             # Playwright Config with Vite WebServer
├── smart-regression.config.json     # Component Mappings & Gemini 3.5 Flash Lite
├── vite.config.ts                   # Vite bundler configuration
├── vitest.config.ts                 # Vitest configuration (jsdom environment)
└── tsconfig.json                    # TypeScript strict compiler config
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
# Starts modern React storefront on http://localhost:3000
```

### 3. Run Unit Tests (UT)
```bash
# Run Vitest unit tests in one shot
npm run test:unit

# Run in watch mode during development
npm run test:unit:watch
```

### 4. Build for Production
```bash
npm run build
```

### 5. Run Playwright E2E Tests
```bash
# Headless test run
npm run test:e2e

# Interactive UI Mode
npm run test:e2e:ui
```

### 6. Run AI Smart Regression Selection
```bash
# Analyze PR diff using Gemini 3.5 Flash Lite
npm run test:smart

# Execute only AI-selected impacted tests
npm run test:smart:run
```
