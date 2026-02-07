import {test, expect} from '@playwright/test';
import {selectors} from '../../../selectors/selectors';

test.describe('CI Smoke tests for Search Bar Visibility @ci-smoke', () => {

    const pages = [
        {name: 'Home Page', url: '/'},
        {name: 'Product Listing Page', url: '/smartphones-and-accessories'},
    ];

    for (const p of pages) {
        test(`search box visible on ${p.name}`, async ({page}) => {
            await page.goto(p.url);
            await expect(page.locator(selectors.homePage.searchBox)).toBeVisible();
        });
    }
});