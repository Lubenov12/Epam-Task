// Step definitions for registration.feature
const { Given, When, Then } = require("@wdio/cucumber-framework");
const { pages } = require("../../po/index.js");

Given("I am on the registration page", async () => {
  await browser.url(pages("register").url);
});

function generateUniqueEmail() {
  const randomSuffix = Math.random().toString(36).substring(2, 6); // random 4 chars
  return `testuser${randomSuffix}@example.com`;
}

const fillForm = async (isRegistered) => {
  await pages("register").inputOptions("firstName").waitForDisplayed();
  await pages("register").inputOptions("firstName").setValue("John");
  await pages("register").inputOptions("lastName").setValue("Doe");
  const dobInput = await pages("register").inputOptions("dateOfBirth");
  await browser.execute((el) => {
    el.value = "2004-03-13";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }, dobInput);

  await pages("register").inputOptions("street").setValue("Test 2");
  await pages("register").inputOptions("postalCode").setValue("1222");
  await pages("register").inputOptions("city").setValue("Test");
  await pages("register").inputOptions("state").setValue("Test");
  const country = await pages("register").inputOptions("country");
  await country.selectByAttribute("value", "US");
  await pages("register").inputOptions("phone").setValue("1234567890");
  const uniqueEmail = isRegistered
    ? "customer@practicesoftwaretesting.com"
    : generateUniqueEmail();
  await pages("register").inputOptions("email").setValue(uniqueEmail); // add another number to create a new account
  await pages("register").inputOptions("password").setValue("abC123@d");
  await pages("register").registerButton.click();
};

When("I fill in valid user details and submit the form", async () => {
  await fillForm(false);
});

When(
  "I fill in an email that is already registered and submit the form",
  async () => {
    await fillForm(true);
  },
);

Then("I should be redirected to the login page", async () => {
  const form = $("div.auth-form");
  await form.waitForDisplayed({ timeout: 3000 });
  const regex = new RegExp(pages("login").url.replaceAll("/", "\\/"));
  await expect(browser).toHaveUrl(regex);
});

Then("I should see an error message", async () => {
  await expect(pages("register").errorMessage).toHaveText(
    "A customer with this email address already exists.",
  );
});

Then("I should remain on the registration page", async () => {
  const regex = new RegExp(pages("register").url.replaceAll("/", "\\/"));
  await expect(browser).toHaveUrl(regex);
});
