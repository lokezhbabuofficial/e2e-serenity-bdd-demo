import { notes, Task, the, Wait } from "@serenity-js/core";
import { By, Click, isClickable, Navigate, PageElement, Text } from "@serenity-js/web";

import * as _pages from "../pages/index";
import * as _notes from "../notes/index";

export const SideNav = {
	goTo: {
		ProductListPage: () =>
			Task.where(
				the`#actor navigates to product list page from side nav`,
        Navigate.to('/'),
				Wait.until(_pages.Product.PAGE_LINK(), isClickable()),
				Click.on(PageElement.located(By.id("PRODUCTS__menu__link"))),
				notes<_notes.ProductNotes>().set(
					"menu",
					Text.of(_pages.Product.PAGE_LINK())
				)
			),
	},
};
