// Step definitions for registration.feature
import { Given, When, Then } from "@wdio/cucumber-framework";

Given("I am on the registration page", async () => {
  await browser.url("/auth/register");
});

function generateUniqueEmail() {
  const randomSuffix = Math.random().toString(36).substring(2, 6); // random 4 chars
  return `testuser${randomSuffix}@example.com`;
}

const fillForm = async (isRegistered) => {
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
  const uniqueEmail = isRegistered
    ? "customer@practicesoftwaretesting.com"
    : generateUniqueEmail();
  await form.$("#email").setValue(uniqueEmail); // add another number to create a new account
  await form.$("#password").setValue("abC123@d");
  await form.$("button[data-test='register-submit']").click();
};

When("I fill in valid user details and submit the form", async () => {
  await fillForm(false);
});

When(
  "I fill in an email that is already registered and submit the form",
  async () => {
    await fillForm(true);
  }
);

Then("I should be redirected to the login page", async () => {
  const form = $("div.auth-form");
  await form.waitForDisplayed({ timeout: 3000 });
  await expect(browser).toHaveUrl(/auth\/login/);
});

Then("I should see an error message", async () => {
  const errorMessage = $("div[data-test='register-error']");
  await expect(errorMessage).toHaveText(
    "A customer with this email address already exists."
  );
});

Then("I should remain on the registration page", async () => {
  await expect(browser).toHaveUrl(/auth\/register/);
});
