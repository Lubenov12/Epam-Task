const { Given, When, Then } = require('@wdio/cucumber-framework');
const { pages } = require('../../po/index.js');

Given('I am on the home page', async () => {
  await browser.url(pages('home').url);
});
const existingProd = 'Pliers';
const nonExistingProd = 'Scissors';
When('I search for a product that exists', async () => {
  await pages('home').searchOptions('type').setValue(existingProd);
  await pages('home').searchOptions('search').click();
});

When('I search for a product that does not exist', async () => {
  await pages('home').searchOptions('type').setValue(nonExistingProd);
  await pages('home').searchOptions('search').click();
});

Then('I should see the product in the search results', async () => {
  await expect(pages('home').firstProduct).toBeDisplayed();
  const regex = new RegExp(existingProd, 'i');
  await expect(pages('home').firstProduct).toHaveText(regex);
});

Then('I should be able to view the product details', async () => {
  const card = pages('home').firstProduct;
  const expectedUrl = await card.getAttribute('href');
  await card.click();
  await expect(browser).toHaveUrl(expect.stringContaining(expectedUrl));
});

Then('I should see a message indicating no results found', async () => {
  await expect(pages('home').noResults).toBeDisplayed();
});
