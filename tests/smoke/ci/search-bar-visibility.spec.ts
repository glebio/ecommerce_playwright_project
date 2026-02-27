import {test, expect} from '@playwright/test';
import {HomePage} from '../../../src/pages/home.page';
import {PlpPage} from '../../../src/pages/plp.page';

test.describe('CI Smoke: Search Bar Visibility @ci-smoke', () => {
    test('search box visible on Home Page', async ({page}) => {
        const home = new HomePage(page);
        await home.open();
        await expect(home.header.searchBox).toBeVisible();
    });

    test('search box visible on Product Listing Page', async ({page}) => {
        const plp = new PlpPage(page);
        await plp.open();
        await expect(plp.header.searchBox).toBeVisible();
    });
});