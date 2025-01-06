import {test} from '@playwright/test';
import {HomePage} from '../../../pageObjects/HomePage';
import {FiltersPage} from '../../../pageObjects/FiltersPage';

// Test to verify filtering by category
test('Filter by category: Verify only relevant products are displayed', async ({page}) => {
    const homePage = new HomePage(page);
    const filtersPage = new FiltersPage(page);

    await homePage.navigateTo('/');
    await homePage.navigateToSubCategory('Smartphones & Accessories', 'Apple Iphone');
    await filtersPage.verifyFilteredProducts(['Apple iPhone']);
});

// New test to verify filtering within the category by attributes like color or memory size
test('Filter within category: Apply filter and verify results are narrowed down', async ({page}) => {
    const homePage = new HomePage(page);
    const filtersPage = new FiltersPage(page);

    await homePage.navigateTo('/smartphones/apple-iphone');

    await filtersPage.applyCategoryFilter('Color', 'Beige');
    await filtersPage.verifyFilteredProducts(['Apple iPhone', 'Desert Titanium']);

    await filtersPage.applyCategoryFilter('Internal Storage (GB)', '128');
    await filtersPage.verifyFilteredProducts(['Apple iPhone', 'Desert Titanium', '128GB']);
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
