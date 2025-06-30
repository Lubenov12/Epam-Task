const { RegisterPage } = require("./register.page");
const { HomePage } = require("./home.page");
const { LoginPage } = require("./login.page");
const { CartPage } = require("./cart.page");
const { ProductPage } = require("./product.page");
/**
 * Description of what the function does.
 *
 * @param {"home" | "register" | "login" | "cart"| "product" } page
 */
function pages(name) {
  const items = {
    home: new HomePage(),
    login: new LoginPage(),
    register: new RegisterPage(),
    cart: new CartPage(),
    product: (url) => new ProductPage(url),
  };
  return items[name.toLowerCase()];
}

module.exports = {
  pages,
};
