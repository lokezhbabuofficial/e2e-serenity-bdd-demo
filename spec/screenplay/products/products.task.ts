import { Check, notes, Task, the, Wait } from "@serenity-js/core";
import {
	By,
	Clear,
	Click,
	Enter,
	isClickable,
	isEnabled,
	Navigate,
	PageElement,
	Text,
  Value,
} from "@serenity-js/web";

import * as _pages from "../pages/index";
import * as _notes from "../notes/index";
import { Ensure, equals, isPresent, not } from "@serenity-js/assertions";

export const Product = {
	check: {
		stock: (stockStatus: 'INSTOCK' | 'OUTOFSTOCK') =>
			Task.where(
				the`#actor attempts to check current product status as ${stockStatus}`,
				Check.whether(stockStatus, equals('INSTOCK')).andIfSo(
          Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_PRODUCT(), isPresent()),
          Ensure.that(Text.of(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_PRODUCT()), equals(stockStatus)),
          Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_ADD_TO_CART_BUTTON(), isEnabled()),
          Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_ADD_TO_CART_BUTTON(), isClickable())
        )
        .otherwise(
          Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_PRODUCT(), isPresent()),
          Ensure.that(Text.of(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_PRODUCT()), equals(stockStatus)),
          Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_ADD_TO_CART_BUTTON(), not(isEnabled())),
          Ensure.that(_pages.Product.PRODUCT_DATA_VIEW.FIRST_STOCK_ADD_TO_CART_BUTTON(), not(isClickable()))
        )
			),
	},
};
