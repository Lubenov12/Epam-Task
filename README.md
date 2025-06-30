# WebDriverIO + Allure Report

## How to Run Tests and Generate Report

Install Allure CLI globally:

npm install -g allure-commandline --save-dev

1. Run the tests:
npm run wdio               #Runs spec and html reports

2.Generate and view the Allure HTML report:
npm run allure:generate   # Generates the HTML report from test results
npm run allure:open       # Opens the generated report in the browser
