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
      default:
        throw new Error("Unknown link");
    }
  }
  open() {
    browser.url(this.url);
  }
}

module.exports = { BasePage };
