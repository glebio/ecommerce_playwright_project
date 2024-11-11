import {expect, test} from '@playwright/test';
import {HomePage} from '../pageObjects/HomePage';
import {FiltersPage} from '../pageObjects/FiltersPage';

// Test to verify filtering by category
test('Filter by category: Verify only relevant products are displayed', async ({page}) => {
    const homePage = new HomePage(page);
    const filtersPage = new FiltersPage(page);

    await homePage.navigateTo('/');
    await homePage.navigateToSubCategory('Mobile & Accessories', 'Mobile Phones');
    await filtersPage.verifyFilteredProducts(['Apple iPhone']);
});

// New test to verify filtering within the category by attributes like color or memory size
test('Filter within category: Apply filter and verify results are narrowed down', async ({page}) => {
    const homePage = new HomePage(page);
    const filtersPage = new FiltersPage(page);

    await homePage.navigateTo('/mobile-accessories/cell-phones-service');

    await filtersPage.applyCategoryFilter('Color', 'Desert Titanium');
    await filtersPage.verifyFilteredProducts(['Apple iPhone Desert Titanium']);

    await filtersPage.applyCategoryFilter('Memory', '128GB');
    await filtersPage.verifyFilteredProducts(['Apple iPhone 128GB Desert Titanium']);

    await filtersPage.applyCategoryFilter('Brand', 'Iphone');
    await filtersPage.verifyFilteredProducts(['Apple iPhone 128GB Desert Titanium']);
});

// New test to verify sorting within a category
test('Sort products: Verify products are sorted correctly', async ({page}) => {
    const homePage = new HomePage(page);
    const filtersPage = new FiltersPage(page);

    await homePage.navigateTo('/mobile-accessories/cell-phones-service');

    await filtersPage.applySorting('Price: Low to High');
    await filtersPage.verifySortingOrder('Price', 'asc');

    await filtersPage.applySorting('Price: High to Low');
    await filtersPage.verifySortingOrder('Price', 'desc');

    await filtersPage.applySorting('Name: A to Z');
    await filtersPage.verifySortingOrder('Name', 'asc');

    await filtersPage.applySorting('Name: Z to A');
    await filtersPage.verifySortingOrder('Name', 'desc');
});

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