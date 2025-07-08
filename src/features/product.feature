@ui-test
Feature: Product Search

  Scenario: Search for an existing product
    Given I am on the home page
    When I search for a product that exists
    Then I should see the product in the search results
    And I should be able to view the product details

  Scenario: Search for a non-existing product
    Given I am on the home page
    When I search for a product that does not exist
    Then I should see a message indicating no results found