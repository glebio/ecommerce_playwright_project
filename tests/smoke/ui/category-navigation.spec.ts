import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';
import {selectors} from '../../../selectors/selectors';

test.describe('Category Navigation @smoke', () => {
    // Extract base URL from Playwright configuration
    const baseURL = config.use?.baseURL || '';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    test('Verify home page has categories leading to product listings', async ({page}) => {
        // Navigate to the home page
        await page.goto(baseURL);

        // Verify the main menu container is visible
        await expect(page.locator(selectors.homePage.menuContainer)).toBeVisible();

        // Get all menu items in the vertical menu
        const menuItems = page.locator(selectors.homePage.menuItems);
        const itemCount = await menuItems.count();
        expect(itemCount).toBeGreaterThan(0);

        for (let i = 0; i < itemCount; i++) {
            // Select the current menu item
            const item = menuItems.nth(i);
            const name = (await item.innerText()).trim();
            console.log(`Navigating to category: ${name}`);

            // Click the link inside the menu item and wait for navigation
            await Promise.all([
                page.waitForNavigation({timeout: 5000}),
                item.locator('a').click(),
            ]);

            // Verify that the URL matches a product-listing pattern
            await expect(
                page,
                `URL did not match product-list pattern after clicking "${name}"`
            ).toHaveURL(
                new RegExp(`${baseURL}/(category|products|shop)/`),
                {timeout: 5000}
            );

            // Verify the product list is visible
            const productList = page.locator('.product-list');
            await expect(productList).toBeVisible({timeout: 5000});

            // Ensure there's at least one product in the list
            const productItems = productList.locator('.product-item');
            const productCount = await productItems.count();
            expect(
                productCount,
                `No products found in category "${name}"`
            ).toBeGreaterThan(0);

            // Return to the home page for the next category
            await page.goto(baseURL);
        }
    });
});