import { Actor, Cast, TakeNotes } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright, PlaywrightOptions } from '@serenity-js/playwright';
import { CallAnApi } from '@serenity-js/rest';
import * as playwright from 'playwright';

export class Actors implements Cast {
    constructor(
        private readonly page: playwright.Page,
        private readonly options: PlaywrightOptions,
    ) {
    }

    prepare(actor: Actor): Actor {
        return actor.whoCan(
            // BrowseTheWebWithPlaywright.using(this.browser, this.options),
            BrowseTheWebWithPlaywright.usingPage(this.page, this.options),
            CallAnApi.at(<string>this.options.baseURL),
            TakeNotes.usingAnEmptyNotepad(),
        );
    }
}
