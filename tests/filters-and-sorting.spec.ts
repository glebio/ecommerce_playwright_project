import {test} from '@playwright/test';
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

    // Step 1: Navigate to homepage and then to subcategory
    await homePage.navigateTo('/');
    await homePage.navigateToSubCategory('Mobile & Accessories', 'Mobile Phones');

    // Step 2: Apply filter by color (e.g., Black) and verify the results
    await filtersPage.applyCategoryFilter('Color', 'Desert Titanium');
    await filtersPage.verifyFilteredProducts(['Apple iPhone Desert Titanium']);

    // Step 3: Apply additional filter by memory size (e.g., 128GB) and verify the results
    await filtersPage.applyCategoryFilter('Memory', '128GB');
    await filtersPage.verifyFilteredProducts(['Apple iPhone 128GB Desert Titanium']);

    // Step 3: Apply additional filter by memory size (e.g., 128GB) and verify the results
    await filtersPage.applyCategoryFilter('Brand', 'Iphone');
    await filtersPage.verifyFilteredProducts(['Apple iPhone 128GB Desert Titanium']);
});
