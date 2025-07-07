const { BasePage } = require('./base.page');

class ProductPage extends BasePage {
  constructor(path) {
    super(browser.options.url + path);
  }
  get addCartBtn() {
    return $('#btn-add-to-cart');
  }
}

module.exports = { ProductPage };
