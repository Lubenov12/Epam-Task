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
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/account"),
    {
      timeout: 2000,
      timeoutMsg: 'expected URL to contain "/account" after 2s',
    }
  );
  const accountDashboard = $(".btn-group-vertical");
  await expect(accountDashboard).toBeDisplayed();
});

Then("I should see an error message {string}", async (errorMessage) => {
  const errorBlock = $(".help-block");
  await expect(errorBlock).toBeDisplayed();
  await expect(errorBlock).toHaveText(errorMessage);
});

Then("I should remain on the login page", async () => {
  const url = await browser.getUrl();
  if (url.includes("/auth/login")) {
    return;
  }
  throw new Error("Inside the wrong url");
});
