import {test, expect} from '@playwright/test';
import {HomePage} from '../../../src/pages/home.page';

test.describe('@ci-smoke Logo', () => {
    test('logo is visible and navigates to home page', async ({page}) => {
        const home = new HomePage(page);
        await home.open();

        await expect(home.header.logoImage).toBeVisible();

        // Navigate away first, then click logo to verify it returns home
        await page.goto('/smartphones-and-accessories');
        await home.header.logo.click();

        await expect(page).toHaveURL(/\/$/);
    });
});