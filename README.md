# 🛒 E-Commerce Playwright Demo

> Modern TypeScript E-Commerce web application integrated with **[Smart Regression Agent](https://github.com/Ujjwal-S-S/smart-regression-agent)** for AI-powered regression test selection.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Application Locally
```bash
npm run dev
# Starts modern web server on http://localhost:3000
```

### 3. Run Playwright E2E Tests
```bash
# Run all tests headlessly
npm run test:e2e

# Run with interactive UI
npm run test:e2e:ui
```

### 4. Run Smart Regression Agent
```bash
# Analyze impact using Gemini 3.5 Flash Lite
npm run test:smart

# Execute only AI-selected impact tests
npm run test:smart:run
```

---

## 📁 Project Structure

```
ecommerce-playwright-demo/
├── .github/workflows/
│   └── smart-regression.yml       # GitHub Actions CI with AI Test Selection
├── app/
│   ├── public/                    # Web UI (HTML, Modern CSS Design System)
│   └── src/
│       ├── components/            # TypeScript E-Commerce Business Logic
│       │   ├── cart.component.ts
│       │   ├── checkout.component.ts
│       │   ├── payment.component.ts
│       │   └── profile.component.ts
│       └── server.ts              # Pure TypeScript HTTP Server (tsx)
├── playwright/
│   └── e2e/
│       ├── pages/                 # Page Object Models (POM)
│       │   ├── base.page.ts
│       │   ├── cart.page.ts
│       │   ├── checkout.page.ts
│       │   ├── payment.page.ts
│       │   └── profile.page.ts
│       └── tests/                 # Playwright Test Specs
│           ├── cart.spec.ts
│           ├── checkout.spec.ts
│           ├── payment.spec.ts
│           └── profile.spec.ts
├── playwright.config.ts           # Playwright Test & WebServer Config
├── smart-regression.config.json   # AI Agent Mapping & Safety Rules
└── tsconfig.json                  # TypeScript Compiler Configuration
```
