Feature: User Registration

  Scenario: Successful user registration
    Given I am on the registration page
    When I fill in valid user details and submit the form
    And I should be redirected to the login page

  Scenario: Registration with existing email
    Given I am on the registration page
    When I fill in an email that is already registered and submit the form
    Then I should see an error message
    And I should remain on the registration page