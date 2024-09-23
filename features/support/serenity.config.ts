import { AfterAll, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { configure, Duration } from "@serenity-js/core";
import path from "path";
import * as playwright from "playwright";

import * as _screenplay from '../../spec/screenplay/index';

const timeouts = {
	cucumber: {
		step: Duration.ofSeconds(30), // how long to wait for a Cucumber step to complete
	},
	playwright: {
		defaultNavigationTimeout: Duration.ofSeconds(10), // how long to wait for a page to load
		defaultTimeout: Duration.ofSeconds(5), // how long to wait for an element to show up
	},
	serenity: {
		cueTimeout: Duration.ofSeconds(5), // how long to wait for Serenity/JS to complete any post-test activities, like saving screenshots and reports
	},
};

let browser: playwright.Browser;
let page: playwright.Page;
let baseURL: string

const browserName = process.env.BROWSER || 'chromium';
const testEnv = process.env.TEST_ENV || 'dev';

// Configure default Cucumber step timeout
setDefaultTimeout(timeouts.cucumber.step.inMilliseconds());

BeforeAll(async () => {
	// Launch the browser once before all the tests
	// Serenity/JS will take care of managing Playwright browser context and browser tabs.

    if (browserName === 'chromium') {
        browser = await playwright.chromium.launch({
            headless: true,
        });
    }

    if (browserName === 'firefox') {
        browser = await playwright.firefox.launch({
            headless: true,
        });
    }

    if (testEnv === 'dev') {
        baseURL = 'http://localhost:4200/'
    }

    const context = await browser.newContext({
        baseURL,
        viewport: {
            height: 1600,
            width: 1920
        }
    })

    page = await context.newPage();

    console.log(`Browser Name: ${browserName} \nVersionL ${browser.version()}`);
    console.log(`App Base URL: ${baseURL}`);

	// Configure Serenity/JS
	configure({
		// Configure Serenity/JS actors to use Playwright browser
		actors: new _screenplay.Actors(page, {
			baseURL: "https://sakai.primeng.org/",
			defaultNavigationTimeout:
				timeouts.playwright.defaultNavigationTimeout.inMilliseconds(),
			defaultTimeout: timeouts.playwright.defaultTimeout.inMilliseconds(),
		}),

		// Configure Serenity/JS reporting services
		crew: [
			["@serenity-js/console-reporter", { theme: "auto" }],
			[
				"@serenity-js/web:Photographer",
				{
					strategy: 'TakePhotosOfInteractions',    // capture screenshots of all the interactions; slower but more comprehensive
					// strategy: "TakePhotosOfFailures", // capture screenshots of failed interactions; much faster
				},
			],
			[
				"@serenity-js/core:ArtifactArchiver",
				{
					outputDirectory: path.resolve(
						__dirname,
						"../../target/site/serenity"
					),
				},
			],
			[
				"@serenity-js/serenity-bdd",
				{
					specDirectory: path.resolve(__dirname, "../../features"),
					reporter: {
						includeAbilityDetails: true,
					},
				},
			],
		],

		cueTimeout: timeouts.serenity.cueTimeout,
	});
});

AfterAll(async () => {
	// Close the browser after all the tests are finished
	if (browser) {
		await browser.close();
	}
});
