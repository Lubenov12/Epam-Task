const { BasePage } = require("./base.page");

class RegisterPage extends BasePage {
  constructor(url) {
    super(url);
  }
  inputOptions(option) {
    option = option.toLowerCase();
    switch (option) {
      case "firstName":
        return $("#first_name");
      case "lastName":
        return $("#last_name");
      case "dateOfBirth":
        return $("#dob");
      case "street":
        return "#street";
      case "postalCode":
        return "#postal_code";
      case "city":
        return "#city";
      case "country":
        return "#country";
      case "phone":
        return "#phone";
      case "email":
        return "#email";
      case "password":
        return "#password";
      default:
        throw new Error("Unknown or invalid input");
    }
  }
  get registerButton() {
    return $("button.btnSubmit");
  }
}

module.exports = { RegisterPage };
