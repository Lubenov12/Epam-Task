import { expect, assert, should } from "chai";

describe("expect interface example", () => {
  beforeEach(() => {
    browser.url("auth/login");
  });
  it("login with valid credentials", async () => {
    const emailInput = $("#email");
    const passwordInput = $("#password");
    const loginBtn = $("input.btnSubmit");
    const isDisplayed = await loginBtn.isDisplayed();
    expect(isDisplayed).to.be.true;
    await emailInput.setValue("admin@practicesoftwaretesting.com");
    await passwordInput.setValue("welcome01");
    await loginBtn.click();
    const chart = $(".chart");
    expect(await chart.waitForDisplayed({ timeout: 3000 })).to.be.true;
  });

  it("login with invalid credentials", async () => {
    const emailInput = $("#email");
    const passwordInput = $("#password");
    const loginBtn = $("input.btnSubmit");
    const isDisplayed = await loginBtn.isDisplayed();
    expect(isDisplayed).to.be.true;
    await emailInput.setValue("test123@gmail.com");
    await passwordInput.setValue("123");
    await loginBtn.click();
    const errorContainer = $("div[data-test='login-error']");
    await errorContainer.waitForDisplayed({ timeout: 2000 });
    const errorMessage = await errorContainer.getText();
    await expect(errorMessage).to.equal("Invalid email or password");
  });
});

describe("assert interface example", () => {
  beforeEach(() => {
    browser.url("auth/login");
  });
  it("login with valid credentials", async () => {
    const emailInput = $("#email");
    const passwordInput = $("#password");
    const loginBtn = $("input.btnSubmit");
    const isDisplayed = await loginBtn.isDisplayed();
    assert.equal(isDisplayed, true);
    await emailInput.setValue("admin@practicesoftwaretesting.com");
    await passwordInput.setValue("welcome01");
    await loginBtn.click();
    const chart = $(".chart");
    assert.isTrue(await chart.waitForDisplayed({ timeout: 3000 }));
  });

  it("login with invalid credentials", async () => {
    const emailInput = $("#email");
    const passwordInput = $("#password");
    const loginBtn = $("input.btnSubmit");
    const isDisplayed = await loginBtn.isDisplayed();
    assert.equal(isDisplayed, true);
    await emailInput.setValue("test123@gmail.com");
    await passwordInput.setValue("123");
    await loginBtn.click();
    const errorContainer = $("div[data-test='login-error']");
    await errorContainer.waitForDisplayed({ timeout: 2000 });
    const errorMessage = await errorContainer.getText();
    assert.include(errorMessage, "Invalid email or password");
  });
});

describe("should interface example", () => {
  should();
  beforeEach(() => {
    browser.url("auth/login");
  });
  it("login with valid credentials", async () => {
    const emailInput = $("#email");
    const passwordInput = $("#password");
    const loginBtn = $("input.btnSubmit");
    const isDisplayed = await loginBtn.isDisplayed();
    isDisplayed.should.equal(true);
    await emailInput.setValue("admin@practicesoftwaretesting.com");
    await passwordInput.setValue("welcome01");
    await loginBtn.click();
    const chart = $(".chart");
    const checkChart = await chart.waitForDisplayed({ timeout: 3000 });
    checkChart.should.be.true;
  });

  it("login with invalid credentials", async () => {
    const emailInput = $("#email");
    const passwordInput = $("#password");
    const loginBtn = $("input.btnSubmit");
    const isDisplayed = await loginBtn.isDisplayed();
    isDisplayed.should.equal(true);
    await emailInput.setValue("test123@gmail.com");
    await passwordInput.setValue("123");
    await loginBtn.click();
    const errorContainer = $("div[data-test='login-error']");
    await errorContainer.waitForDisplayed({ timeout: 2000 });
    const errorMessage = await errorContainer.getText();
    errorMessage.should.equal("Invalid email or password");
  });
});
