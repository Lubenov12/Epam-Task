// Step definitions for login.feature
const { Given, When, Then } = require('@wdio/cucumber-framework');
const { pages } = require('../../po/index.js');
Given('I am on the {string} page', async (nameOfPage) => {
  if (nameOfPage == 'login') {
    await pages('login').open();
  }
  return;
});

When('I enter {string} credentials and submit the form', async (credentials) => {
  if (credentials == 'valid') {
    await pages('login').email.setValue('customer@practicesoftwaretesting.com');
    await pages('login').password.setValue('welcome01');
    await pages('login').loginButton.click();
  }
  await pages('login').email.setValue('test123@gmail.com');
  await pages('login').password.setValue('test123');
  await pages('login').loginButton.click();
});

Then('I should see my account dashboard and url', async () => {
  const accountDashboard = $('.btn-group-vertical');
  await accountDashboard.waitForDisplayed({ timeout: 3000 });
});

Then('I should see an error message {string}', async (errorMessage) => {
  await expect(pages('login').errorBlock).toBeDisplayed();
  await expect(pages('login').errorBlock).toHaveText(errorMessage);
});

Then('I should remain on the login page', async () => {
  await expect(browser).toHaveUrl(browser.options.baseUrl + pages('login').url);
});
