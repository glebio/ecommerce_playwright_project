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

// New test to verify searching with partial match
test('Search for product: Verify partial match results are displayed', async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.navigateTo('/');
    await homePage.searchProduct('Phone');

    // Verify that the search results contain products with "Phone" in their name
    const products = page.locator('h4[class="product-name"]');
    const productsCount = await products.count();

    for (let i = 0; i < productsCount; i++) {
        const productText = await products.nth(i).innerText();
        expect(productText).toMatch(/phone/i); // Assuming the product title contains the word "Phone"
    }

    // Verify that at least one product is displayed
    expect(productsCount).toBeGreaterThan(0);
});

// New test to verify search with no results
test('Search for product: Verify empty search result', async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.navigateTo('/');
    await homePage.searchProduct('NonExistingProduct');

    // Verify that no products are displayed
    const products = page.locator('h4[class="product-name"]');
    const productsCount = await products.count();

    // Expecting no products to be found
    expect(productsCount).toBe(0);

    // Verify that an appropriate message is displayed
    const noResultsMessage = page.locator('text=No products found');
    await expect(noResultsMessage).toBeVisible();
});
