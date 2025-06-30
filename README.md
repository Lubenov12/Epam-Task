# WebDriverIO + Allure Report

## How to Run Tests and Generate Report

Install Allure CLI globally:

```bash
npm install -g allure-commandline --save-dev

1. Run the tests:

```bash
npm run wdio               #Runs spec and html reports
npm run allure:generate   # Generates the HTML report from test results
npm run allure:open       # Opens the generated report in the browser
