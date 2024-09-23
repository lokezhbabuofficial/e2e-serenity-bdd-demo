import { By, Click, Navigate, Page, PageElement, PageElements } from '@serenity-js/web';

export const Product = {
  PAGE_LINK: () => PageElement.located(By.id('PRODUCTS__menu__link')).describedAs('Product Page Menu Item'),
  HEADING: () => PageElement.located(By.id('PRODUCT__header')).describedAs('Product Page Heading'),
  PRODUCT_SEARCH_INPUT: () => PageElement.located(By.id('PRODUCT_SEARCH__input')).describedAs('Product Search Input'),
  PRODUCT_DATA_VIEW: {
    GRID_VIEW_CONTENT: () => PageElements.located(By.css('.p-dataview-content .font-bold')),
    FIRST_STOCK_PRODUCT: () => PageElement.located(By.id('PRODUCT_0__invetory_status')),
    FIRST_STOCK_ADD_TO_CART_BUTTON: () => PageElement.located(By.css('#PRODUCT_0__ADD_TO_CART__button button'))
  }
}