const { RegisterPage } = require("./pages/register.page");
const { HomePage } = require("./pages/home.page");
const { LoginPage } = require("./pages/login.page");

/**
 * Description of what the function does.
 *
 * @param {"home" | "register" | "login" | "cart"} page
 */
const page = (page) => {
  page = page.toLowerCase();
  switch (page) {
    case "home":
      return new HomePage("/");
    case "register":
      return new RegisterPage("/auth/register");
    case "login":
      return new LoginPage("/auth/login");
  }
};

module.exports = { page };
