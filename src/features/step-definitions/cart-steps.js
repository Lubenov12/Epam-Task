// Step definitions for cart.feature
import { Given, When, Then } from "@wdio/cucumber-framework";

Given("I am on the home page", async () => {
  await browser.url("/");
});

When("I search for a product", async () => {
  await $("#search-query").setValue("Hammer");
  await $("button[data-test='search-submit']").click();
});

Then("I open the product page", async () => {
  const card = $("div[data-test='search_completed'] a.card");
  await card.click();
});

Then("I add it to the cart", async () => {
  const cartBtn = $("#btn-add-to-cart");
  await expect(cartBtn).toBeDisplayed();
  await cartBtn.click();
});

Then("The cart logo shouldn't be hidden", async () => {
  const cart = $("a[aria-label='cart']");
  const itemCount = $("#lblCartCount");
  await expect(cart).toBeDisplayed();
  await expect(itemCount).toHaveText("1");
});

Given("I have a product in my cart", async () => {
  await browser.url("/");
  await $("#search-query").setValue("Drill");
  await $("button[data-test='search-submit']").click();
  const card = $("div[data-test='search_completed'] a.card");
  await card.click();
});

When("I remove the product from the cart", async () => {
  await browser.url("/checkout");
  const removeItemBtn = $("svg[data-icon='xmark']");
  await expect(removeItemBtn).toBeDisplayed();
  await removeItemBtn.click();
});

Then("The cart icon should be hidden", async () => {
  const cart = $("a[aria-label='cart']");
  await browser.pause(2000);
  const exists = await cart.isExisting();
  expect(exists).toBe(false);
});

When("I search for a product that is out of stock and open it", async () => {
  const outOfStockLabel = await $("span[data-test='out-of-stock']");
  await expect(outOfStockLabel).toHaveText("Out of stock");
  const link = outOfStockLabel.parentElement().parentElement();
  const expectedUrl = await link.getAttribute("href");
  await link.click();
  await expect(browser).toHaveUrl(expect.stringContaining(expectedUrl));
});

When("Add to cart button should be disabled", async () => {
  const cartBtn = $("#btn-add-to-cart");
  await expect(cartBtn).toBeDisplayed();
  await expect(cartBtn).toHaveAttribute("disabled");
});
