import { BasePage } from "./base.page";

class HomePage extends BasePage {
  constructor(url) {
    super(url);
  }
  filterOptions(option) {
    option = option.toLowerCase();
    const filters = $("#filters");
    switch (option) {
      case "search":
        return filters.$(".input-group");
      default:
        throw new Error("Incorrect filter");
    }
  }
  async searchOptions(option) {
    const searchDiv = this.filterOptions("search");
    switch (option) {
      case "type":
        return searchDiv.$("#search-query");
      case "reset":
        return searchDiv.$("button[data-test='search-reset']");
      case "search":
        return searchDiv.$("button[data-test='search-submit']");
      default:
        throw new Error("Unknown command");
    }
  }
}

module.exports = { HomePage };
