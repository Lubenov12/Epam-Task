import { BasePage } from "./base.page";

class HomePage extends BasePage {
  constructor() {
    super("/");
  }
  filterOptions(option) {
    option = option.toLowerCase();
    const filters = $("#filters");
    switch (option) {
      case "search":
        return filters.$$(".input-group")[2];
      default:
        throw new Error("Incorrect filter");
    }
  }
  searchOptions(option) {
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
  get firstProduct() {
    return $("div[data-test='search_completed'] a.card");
  }
  get noResults() {
    return $("div[data-test='no-results']");
  }
  get outOfStock() {
    return $("span[data-test='out-of-stock']");
  }
}

module.exports = { HomePage };
