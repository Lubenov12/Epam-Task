Feature: Shopping Cart

  Scenario: Add product to cart
    Given I am on the home page
    When I search for a product 
    Then I open the product page
    And I add it to the cart
    Then The cart logo shouldn't be hidden

  Scenario: Remove product from cart
    Given I have a product in my cart
    When I remove the product from the cart
    Then The cart icon should be hidden

    Scenario: Product is out of stock
      Given I am on the home page
      When I search for a product that is out of stock and open it
      And Add to cart button should be disabled 
