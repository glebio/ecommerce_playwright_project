import {expect, test} from '@playwright/test';
import {HomePage} from '../pageObjects/HomePage';

// New test to verify searching for a product
test('Search for product: Verify only relevant products are displayed', async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.navigateTo('/');
    await homePage.searchProduct('iPhone');

    // Verify that the search results contain only "iPhone" products
    const products = page.locator('h4[class="product-name"]');
    const productsCount = await products.count();

    for (let i = 0; i < productsCount; i++) {
        const productText = await products.nth(i).innerText();
        expect(productText).toMatch(/iphone/i); // Assuming the product title contains the word "iPhone"
    }

    // Verify that at least one product is displayed
    expect(productsCount).toBeGreaterThan(0);
});