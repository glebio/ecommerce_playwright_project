import {expect, test} from '@playwright/test';
import {HomePage} from '../../../pageObjects/HomePage';

test.describe('Product Search Functionality', () => {

    test('Search for product: Verify only relevant products are displayed', async ({page}) => {
        const homePage = new HomePage(page);

        await homePage.navigateTo('/');
        await homePage.searchProduct('iPhone');

        // Verify that the search results contain only "iPhone" products
        const products = page.locator('.product-item h4');
        const productsCount = await products.count();

        for (let i = 0; i < productsCount; i++) {
            const productText = await products.nth(i).innerText();
            expect(productText).toMatch(/iphone/i); // Assuming the product title contains "iPhone"
        }

        // Verify that at least one product is displayed
        expect(productsCount).toBeGreaterThan(0);
    });

    test('Search for product: Verify partial match results are displayed', async ({page}) => {
        const homePage = new HomePage(page);

        await homePage.navigateTo('/');
        await homePage.searchProduct('Phone');

        // Verify that the search results contain products with "Phone" in their name
        const products = page.locator('.product-item h4');
        const productsCount = await products.count();

        for (let i = 0; i < productsCount; i++) {
            const productText = await products.nth(i).innerText();
            expect(productText).toMatch(/phone/i); // Assuming the product title contains "Phone"
        }

        // Verify that at least one product is displayed
        expect(productsCount).toBeGreaterThan(0);
    });

    test('Search for product: Verify empty search result', async ({page}) => {
        const homePage = new HomePage(page);

        await homePage.navigateTo('/');
        await homePage.searchProduct('NonExistingProduct');

        // Verify that no products are displayed
        const products = page.locator('.product-item h4');
        const productsCount = await products.count();

        // Expecting no products to be found
        expect(productsCount).toBe(0);

        // Verify that the "Product Compare" element is not present, indicating no products were found
        const compareTotal = page.locator('#compare-total');
        await expect(compareTotal).toBeHidden(); // Expect the element to be hidden or not present
    });

});