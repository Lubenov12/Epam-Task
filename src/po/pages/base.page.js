class BasePage {
  constructor(url) {
    this.url = url;
  }

  navmenu(item) {
    item = item.toLowerCase();
    const navbar = $("#navbarSupportedContent");
    switch (item) {
      case "home":
        return navbar.$("a[data-test='nav-home']");
      case "sign in":
        return navbar.$("a[data-test='nav-sign-in']");
      case "cart":
        return navbar.$("a[aria-label='cart']");
      default:
        throw new Error("Unknown link");
    }
  }
  open() {
    return browser.url(this.url);
  }
}

module.exports = { BasePage };
