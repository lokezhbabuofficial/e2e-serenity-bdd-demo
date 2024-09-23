import { Given, Then, When } from '@cucumber/cucumber';
import { Actor, Check, Duration, List, notes, TakeNotes, Wait, WaitUntil } from '@serenity-js/core';
import { By, Clear, Click, CssClasses, isClickable, isEnabled, Navigate, PageElement, Text, Value } from '@serenity-js/web';
import { Ensure, equals, isPresent, not } from '@serenity-js/assertions';

import * as _pages from '../../spec/screenplay/pages/index';
import * as _screenplay from '../../spec/screenplay/index';

interface ProdcutNotes {
    menu: string;
}
/**
 * Below step definitions use Cucumber Expressions
 * see: https://cucumber.io/docs/cucumber/cucumber-expressions/
 *
 * {actor} and {pronoun} are custom expressions defined under support/parameters.ts
 */
Given('{actor} starts with the {string} page', async (actor: Actor, exampleName: string) =>
    await actor.attemptsTo(
        /**
         * Multiple interations
         */
        // Wait.until(_pages.Product.PAGE_LINK(), isClickable()),
        // Click.on(PageElement.located(By.id('PRODUCTS__menu__link'))),
        // notes<ProdcutNotes>().set('menu', Text.of(_pages.Product.PAGE_LINK()))

        /**
         * Multiple interactions combined into
         */
        _screenplay.SideNav.goTo.ProductListPage()
    )
);

Then('{pronoun} verfies the title as {string}', async(actor: Actor, title: string) => {
    await actor.attemptsTo(
        Ensure.that(Text.of(_pages.Product.HEADING()), equals(title))
    )
});

When('{actor} enters {string} in the product search', async(actor: Actor, searchTerm: string) => {
    await actor.attemptsTo(
        _screenplay.Search.for.Products(searchTerm)
    )
});

Then('{pronoun} expects total of {string} products in the product list', async(actor: Actor, count: string) => {
    await actor.attemptsTo(
        Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.GRID_VIEW_CONTENT().count(), equals(Number(count)))
    )
});

Then('{pronoun} clears the product search', async(actor: Actor) => {
    await actor.attemptsTo(
        Clear.theValueOf(_pages.Product.PRODUCT_SEARCH_INPUT()),
        Ensure.that(Value.of(_pages.Product.PRODUCT_SEARCH_INPUT()), equals(''))
    )
});

Then('{pronoun} confirms that product is {string}', async(actor: Actor, stockStatus: 'INSTOCK' | 'OUTOFSTOCK') => {
    await actor.attemptsTo(
        _screenplay.Product.check.stock(stockStatus)
    )
});

Then('{pronoun} {string} the product', async(actor: Actor, cartAction: 'adds' | 'skips') => {
    await actor.attemptsTo(
        Check.whether(cartAction, equals('adds')).andIfSo(
            Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_ADD_TO_CART_BUTTON(), isEnabled()),
            Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_ADD_TO_CART_BUTTON(), isClickable()),
            Click.on(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_ADD_TO_CART_BUTTON())
          )
          .otherwise(
            Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_ADD_TO_CART_BUTTON(), not(isEnabled())),
            Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_ADD_TO_CART_BUTTON(), not(isClickable()))
          )
    )
});
