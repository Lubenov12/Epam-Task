// Step definitions for login.feature
import { Given, When, Then } from "@wdio/cucumber-framework";
import { page } from "../../po/index";
Given("I am on the {string} page", async (pages) => {
  if (pages == "login") {
    await page("login").open();
  }
  return;
});

When(
  "I enter {string} credentials and submit the form",
  async (credentials) => {
    if (credentials == "valid") {
      await page("login").email.setValue(
        "customer@practicesoftwaretesting.com"
      );
      await page("login").password.setValue("welcome01");
      await page("login").loginButton.click();
    }
    await page("login").email("test123@gmail.com");
    await page("login").password.setValue("test123");
    await page("login").loginButton.click();
  }
);

Then("I should see my account dashboard and url", async () => {
  const accountDashboard = $(".btn-group-vertical");
  await accountDashboard.waitForDisplayed({ timeout: 3000 });
});

Then("I should see an error message {string}", async (errorMessage) => {
  await expect(page("login").errorBlock).toBeDisplayed();
  await expect(page("login").errorBlock).toHaveText(errorMessage);
});

Then("I should remain on the login page", async () => {
  await expect(browser).toHaveUrl(page("login").url);
});
