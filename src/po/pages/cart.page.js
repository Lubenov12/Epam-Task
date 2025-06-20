const { BasePage } = require("./base.page");

class CartPage extends BasePage {
  constructor() {
    super("/checkout");
  }
  get items() {
    return $("tbody");
  }
  get removeItemBtn() {
    return $("a.btn-danger");
  }
}

module.exports = { CartPage };
