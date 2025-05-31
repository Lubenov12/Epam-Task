// Step definitions for login.feature
import { Given, When, Then } from "@wdio/cucumber-framework";

Given("I am on the {string} page", async (page) => {
  if (page == "login") {
    await browser.url("/auth/login");
  }
  return;
});

When(
  "I enter {string} credentials and submit the form",
  async (credentials) => {
    if (credentials == "valid") {
      await $("input#email").setValue("customer@practicesoftwaretesting.com");
      await $("input#password").setValue("welcome01");
      await $("input.btnSubmit").click();
    }
    await $("input#email").setValue("test123@gmail.com");
    await $("input#password").setValue("test123");
    await $("input.btnSubmit").click();
  }
);

Then("I should see my account dashboard and url", async () => {
  const accountDashboard = $(".btn-group-vertical");
  await accountDashboard.waitForDisplayed({ timeout: 3000 });
});

Then("I should see an error message {string}", async (errorMessage) => {
  const errorBlock = $(".help-block");
  await expect(errorBlock).toBeDisplayed();
  await expect(errorBlock).toHaveText(errorMessage);
});

Then("I should remain on the login page", async () => {
  await expect(browser).toHaveUrl(/auth\/login/);
});
