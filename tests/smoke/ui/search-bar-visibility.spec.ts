import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';
import {selectors} from '../../../selectors/selectors';

test.describe('Search Bar Visibility @smoke', () => {
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

    for (const pageConfig of pages) {
        test(`Verify search bar visibility on the ${pageConfig.name}`, async ({page}) => {
            await page.goto(pageConfig.url);
            const searchBox = page.locator(selectors.homePage.searchBox);
            await expect(searchBox).toBeVisible();
        });
    }
});