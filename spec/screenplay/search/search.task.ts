import { notes, Task, the, Wait } from "@serenity-js/core";
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
import { Ensure, equals } from "@serenity-js/assertions";

export const Search = {
	for: {
		Products: (searchTerm: string) =>
			Task.where(
				the`#actor attempts to search for a product with search term ${searchTerm}`,
				Wait.until(_pages.Product.PRODUCT_SEARCH_INPUT(), isEnabled()),
				Clear.theValueOf(_pages.Product.PRODUCT_SEARCH_INPUT()),
				Enter.theValue(searchTerm).into(_pages.Product.PRODUCT_SEARCH_INPUT()),
        Ensure.that(Value.of(_pages.Product.PRODUCT_SEARCH_INPUT()), equals(searchTerm))
			),
	},
};
