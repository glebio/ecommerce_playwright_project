import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';

test.describe('Search Bar Visibility', () => {
    const baseURL = config.use?.baseURL || '';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    const pages = [
        {name: 'Home Page', url: baseURL},
        {name: 'Product Listing Page', url: `${baseURL}/smartphones-and-accessories`},
        {name: 'Cart Page', url: `${baseURL}/cart`},
        {name: 'Account Page', url: `${baseURL}/account`},
    ];

    const searchBarLocator = '#text-search';

    for (const pageConfig of pages) {
        test(`Verify search bar visibility on the ${pageConfig.name}`, async ({page}) => {
            await page.goto(pageConfig.url);
            const searchBar = page.locator(searchBarLocator);
            await expect(searchBar).toBeVisible();
        });
    }
});