Feature: Products Search and Add to Cart

  Scenario: User loads Products page
    Given Alice starts with the "Products" page
    Then she verfies the title as "Product List MFE"

  Scenario Outline: Product Search
    When Alice enters "<search_term>" in the product search
    Then she expects total of "<total_products>" products in the product list
    And she clears the product search

    Examples: 
      | search_term  | total_products |
      | Bamboo Watch |              1 |
      | BL           |              3 |

  Scenario Outline: Product Add To Cart
    When Alice enters "<search_term>" in the product search
    Then she expects total of "<total_products>" products in the product list
    Then she confirms that product is "<stock_status>"
    And she "<cart_action>" the product

    Examples: 
      | search_term  | total_products | stock_status | cart_action |
      | Bamboo Watch |              1 | INSTOCK      | adds        |
      | Black Watch  |              1 | OUTOFSTOCK   | skips       |
