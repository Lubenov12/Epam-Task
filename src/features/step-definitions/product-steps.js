// Step definitions for product.feature
import { Given, When, Then } from "@wdio/cucumber-framework";

Given("I am on the home page", async () => {
  await browser.url("/");
});
const existingProd = "Pliers";
const nonExistingProd = "Scissors";
When("I search for a product that exists", async () => {
  await $("#search-query").setValue(existingProd);
  await $("button[data-test='search-submit']").click();
});

When("I search for a product that does not exist", async () => {
  await $("#search-query").setValue(nonExistingProd);
  await $("button[data-test='search-submit']").click();
});

Then("I should see the product in the search results", async () => {
  const card = $("div[data-test='search_completed'] a.card");
  await expect(card).toBeDisplayed();
  const regex = new RegExp(existingProd, "i");
  await expect(card).toHaveText(regex);
});

Then("I should be able to view the product details", async () => {
  const card = $("div[data-test='search_completed'] a.card");
  const expectedUrl = await card.getAttribute("href");
  await card.click();
  await expect(browser).toHaveUrl(expect.stringContaining(expectedUrl));
});

Then("I should see a message indicating no results found", async () => {
  await expect($("div[data-test='no-results']")).toBeDisplayed();
});
