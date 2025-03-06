import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';

test.describe('Main Menu (Navigation) @smoke', () => {
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

    test('Verify register account menu navigation', async ({page}) => {
        const accountMenu = page.locator('a[title="My Account"]');
        await accountMenu.click();
        const accountDropdown = page.locator('.dropdown-menu');

        const registerOption = accountDropdown.locator('a:has-text("Register")');
        await registerOption.click();

        await expect(page).toHaveURL('https://shop.qaresults.com/register', {timeout: 5000});

        const registerHeader = page.locator('h1');
        await expect(registerHeader).toHaveText('Register Account', {timeout: 5000});
    });

    test('Verify login account menu navigation', async ({page}) => {
        const accountMenu = page.locator('a[title="My Account"]');
        await accountMenu.click();

        const accountDropdown = page.locator('.dropdown-menu');
        const loginOption = accountDropdown.locator('a:has-text("Or Sign In")');
        await loginOption.click();

        // Verify the URL for the login page
        await expect(page).toHaveURL('https://shop.qaresults.com/login', {timeout: 5000});

        // Locate the specific "Returning Customer" header
        const returningCustomerHeader = page.locator('h2', {hasText: 'Returning Customer'});
        await expect(returningCustomerHeader).toHaveText('Returning Customer', {timeout: 5000});
    });

    test('Verify cart navigation', async ({page}) => {
        // Click on the cart link
        const cartLink = page.locator('a', {hasText: 'Checkout'});
        await cartLink.click();

        // Verify the URL and page content
        await expect(page).toHaveURL(/.*route=checkout\/cart/, {timeout: 5000});
        const cartHeader = page.locator('h1');
        await expect(cartHeader).toHaveText('Shopping Cart', {timeout: 5000});
    });
});