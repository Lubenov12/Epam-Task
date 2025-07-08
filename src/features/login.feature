@ui-test
Feature: User Login

  Scenario: Successful login
    Given I am on the "login" page
    When I enter "valid" credentials and submit the form
    Then I should see my account dashboard and url

  Scenario: Login with invalid credentials
    Given I am on the 'login' page
    When I enter 'invalid' credentials and submit the form
    Then I should see an error message "Invalid email or password"
    And I should remain on the login page

