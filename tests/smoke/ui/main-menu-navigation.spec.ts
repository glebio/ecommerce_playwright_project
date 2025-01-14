import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';

test.describe('Main Menu (Navigation)', () => {
    const baseURL = config.use?.baseURL || '';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    test.beforeEach(async ({page}) => {
        await page.goto(baseURL);
    });

    test('Verify main menu is visible', async ({page}) => {
        // Verify the main menu is visible
        const mainMenu = page.locator('nav'); // Adjust selector to target your main menu
        await expect(mainMenu).toBeVisible({timeout: 5000}); // Set explicit timeout
    });

    test('Verify categories navigation', async ({page}) => {
        // Click on a category and verify it navigates to the correct page
        const categoryLink = page.locator('a', {hasText: 'Smartphones & Accessories'});
        await categoryLink.click();

        // Verify the URL changes to the category page
        await expect(page).toHaveURL(/.*smartphones-and-accessories/, {timeout: 5000});

        // Verify the category page header
        const categoryHeader = page.locator('h1');
        await expect(categoryHeader).toHaveText('Smartphones & Accessories', {timeout: 5000});
    });

    test('Verify account menu navigation', async ({page}) => {
        // Click on the account menu
        const accountMenu = page.locator('a', {hasText: 'My Account'});
        await accountMenu.click();

        // Verify dropdown is visible
        const accountDropdown = page.locator('.dropdown-menu');
        await expect(accountDropdown).toBeVisible({timeout: 5000});

        // Click on Login option
        const loginOption = accountDropdown.locator('a', {hasText: 'Login'});
        await loginOption.click();

        // Verify the URL and page content
        await expect(page).toHaveURL(/.*route=account\/login/, {timeout: 5000});
        const loginHeader = page.locator('h1');
        await expect(loginHeader).toHaveText('Account Login', {timeout: 5000});
    });

    test('Verify cart navigation', async ({page}) => {
        // Click on the cart link
        const cartLink = page.locator('a', {hasText: 'Cart'});
        await cartLink.click();

        // Verify the URL and page content
        await expect(page).toHaveURL(/.*route=checkout\/cart/, {timeout: 5000});
        const cartHeader = page.locator('h1');
        await expect(cartHeader).toHaveText('Shopping Cart', {timeout: 5000});
    });
});