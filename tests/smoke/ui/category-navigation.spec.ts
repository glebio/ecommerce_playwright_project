import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';

test.describe('Main Menu Navigation', () => {
    // Extract base URL from configuration
    const baseURL = config.use?.baseURL || '';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    test('Verify the home page contains a list of categories that lead to product listing pages', async ({page}) => {
        // Navigate to the home page
        await page.goto(baseURL);

        // Verify the main menu is visible
        const mainMenu = page.locator('nav.main-menu'); // Adjust the selector based on your menu structure
        await expect(mainMenu).toBeVisible({timeout: 5000});

        // Get the list of category links in the main menu
        const categoryLinks = mainMenu.locator('a.category-link'); // Adjust selector to match category links
        const categoryCount = await categoryLinks.count();

        // Ensure there are categories listed
        expect(categoryCount).toBeGreaterThan(0);

        // Verify each category link leads to a product listing page
        for (let i = 0; i < categoryCount; i++) {
            const category = categoryLinks.nth(i);
            const categoryName = await category.innerText();
            console.log(`Navigating to category: ${categoryName}`);

            // Click the category link and wait for navigation
            await Promise.all([
                page.waitForNavigation({timeout: 5000}),
                category.click(),
            ]);

            // Ensure the URL matches a product listing page pattern
            await expect(page).toHaveURL(new RegExp(`${baseURL}/category/|${baseURL}/products/|${baseURL}/shop/`), {timeout: 5000});

            // Verify the page has a product list
            const productList = page.locator('.product-list'); // Adjust selector for product list container
            await expect(productList).toBeVisible({timeout: 5000});

            // Ensure there are products in the list
            const productItems = productList.locator('.product-item'); // Adjust selector for individual product items
            const productCount = await productItems.count();
            expect(productCount).toBeGreaterThan(0);

            // Return to the home page
            await page.goto(baseURL);
        }
    });
});