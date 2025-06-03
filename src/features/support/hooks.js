import { Before } from "@wdio/cucumber-framework";

Before({ tags: "@cleanupBasket" }, async () => {
  await browser.url("/checkout");
  const basketItems = await $$("tbody tr");
  for (const item of basketItems) {
    const xmark = await item.$("a.btn-danger");
    if ((await xmark.isExisting()) && (await xmark.isDisplayed())) {
      await xmark.click();
    }
  }
});
