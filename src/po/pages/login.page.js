const { BasePage } = require("./base.page");

class LoginPage extends BasePage {
  constructor(url) {
    super(url);
  }
  get email() {
    return $("input#email");
  }
  get password() {
    return $("input#password");
  }
  get loginButton() {
    return $("input.btnSubmit");
  }
  get registerAccount() {
    return $("a[data-test='register-link']");
  }
  get errorBlock() {
    return $(".help-block");
  }
}

module.exports = { LoginPage };
