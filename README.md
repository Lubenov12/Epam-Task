# WebDriverIO + Allure Report

## Prerequisites

Install the Allure CLI globally to use the `allure` command:

```bash
npm install -g allure-commandline --save-dev
```

---

## How to Run Tests and Generate Report

### 1. Run the WebDriverIO Tests

```bash
npm run wdio
```
This runs the tests and generates raw Allure results in:


### 2. Generate and View the Allure HTML Report

Generate the report:

```bash
npm run allure:generate
```

Open the report in your default browser:

```bash
npm run allure:open
```

---

