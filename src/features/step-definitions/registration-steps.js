// Step definitions for registration.feature
import { Given, When, Then } from "@wdio/cucumber-framework";

Given("I am on the registration page", async () => {
  await browser.url("/auth/register");
});

const fillForm = async () => {
  const form = $("form[data-test='register-form']");
  await form.$("#first_name").setValue("John");
  await form.$("#last_name").setValue("Doe");
  await browser.execute(() => {
    const el = document.querySelector("#dob");
    el.value = "2004-03-13";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });

  await form.$("#street").setValue("Test 2");
  await form.$("#postal_code").setValue("1222");
  await form.$("#city").setValue("Test");
  await form.$("#state").setValue("Test");
  const country = await form.$("#country");
  await country.selectByAttribute("value", "US");
  await form.$("#phone").setValue("1234567890");
  await form.$("#email").setValue("abc6@abv.bg"); // add another number to create a new account
  await form.$("#password").setValue("7410258Asd!");
  await form.$("button[data-test='register-submit']").click();
};

When("I fill in valid user details and submit the form", async () => {
  await fillForm();
});

When(
  "I fill in an email that is already registered and submit the form",
  async () => {
    await fillForm();
  }
);

Then("I should be redirected to the login page", async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/auth/login"),
    {
      timeout: 2000,
      timeoutMsg: 'expected URL to contain "/auth/login" after 2s',
    }
  );
});

Then("I should see an error message", async () => {
  const errorMessage = $("div[data-test='register-error']");
  await expect(errorMessage).toHaveText(
    "A customer with this email address already exists."
  );
});

Then("I should remain on the registration page", async () => {
  const url = await browser.getUrl();
  if (url.includes("/auth/register")) {
    return;
  }
  throw new Error("You are in a different url" + url);
});
