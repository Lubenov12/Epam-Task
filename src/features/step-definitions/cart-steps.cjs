// Step definitions for cart.feature
const { Given, When, Then } = require('@wdio/cucumber-framework');
const { pages } = require('../../po/index.js');
Given('I am already on the home page', async () => {
  await browser.url(pages('home').url);
});

When('I search for a product', async () => {
  await pages('home').searchOptions('type').setValue('Hammer');
  await pages('home').searchOptions('search').click();
});

Then('I open the product page', async () => {
  await pages('home').firstProduct.click();
});

Then('I add it to the cart', async () => {
  const path = new URL(await browser.getUrl()).pathname.replace(/^\/+/, '');
  const product = pages('product')(path);
  await product.addCartBtn.waitForDisplayed({ timeout: 2000 });
  await product.addCartBtn.click();
});

Then("The cart logo shouldn't be hidden", async () => {
  await pages('home').navmenu('cart').waitForDisplayed({ timeout: 2000 });
});

Given('I have a product in my cart', async () => {
  await pages('home').open();
  await await pages('home').searchOptions('type').setValue('Drill');
  pages('home').searchOptions('search').click();
  await pages('home').firstProduct.click();
});

When('I remove the product from the cart', async () => {
  await pages('cart').open();
  await pages('cart').removeItemBtn.waitForDisplayed({ timeout: 5000 });
  await pages('cart').removeItemBtn.click();
});

Then('The cart icon should be hidden', async () => {
  await pages('cart').navmenu('cart').waitForExist({ timeout: 5000, reverse: true });
});

When('I search for a product that is out of stock and open it', async () => {
  await expect(pages('home').outOfStock).toHaveText('Out of stock');
  const link = pages('home').outOfStock.parentElement().parentElement();
  const expectedUrl = await link.getAttribute('href');
  await link.click();
  await expect(browser).toHaveUrl(expect.stringContaining(expectedUrl));
});

When('Add to cart button should be disabled', async () => {
  const path = new URL(await browser.getUrl()).pathname.replace(/^\/+/, '');
  const product = pages('product')(path);
  await expect(product.addCartBtn).toBeDisplayed();
  await expect(product.addCartBtn).toHaveAttribute('disabled');
});
