import {test} from '@playwright/test';
import {HomePage} from '../../../src/pages/HomePage';
import {FiltersPage} from '../../../src/pages/FiltersPage';

test.describe('Filtering and Sorting Functionality @regression', () => {

    test.describe('Category Filtering', () => {
        test('Filter by category: Verify only relevant products are displayed', async ({page}) => {
            const homePage = new HomePage(page);
            const filtersPage = new FiltersPage(page);

            await homePage.navigateTo('/');
            await homePage.navigateToSubCategory('Smartphones & Accessories', 'Apple Iphone');
            await filtersPage.verifyFilteredProducts(['Apple iPhone']);
        });
    });

    test.describe('Attribute Filtering', () => {
        test('Filter within category: Apply filter and verify results are narrowed down', async ({page}) => {
            const homePage = new HomePage(page);
            const filtersPage = new FiltersPage(page);

            await homePage.navigateTo('/smartphones/apple-iphone');
            await filtersPage.applyCategoryFilter('Color', 'Beige');
            await filtersPage.verifyFilteredProducts(['Apple iPhone', 'Desert Titanium']);
            await filtersPage.applyCategoryFilter('Internal Storage (GB)', '128');
            await filtersPage.verifyFilteredProducts(['Apple iPhone', 'Desert Titanium', '128GB']);
        });
    });

    test.describe('Sorting Functionality', () => {
        test('Sort products: Verify products are sorted correctly', async ({page}) => {
            const homePage = new HomePage(page);
            const filtersPage = new FiltersPage(page);

            await homePage.navigateTo('/smartphones/apple-iphone');

            await filtersPage.applySorting('p.price', 'asc');
            await filtersPage.verifySortingOrder('Price', 'asc');

            await filtersPage.applySorting('p.price', 'desc');
            await filtersPage.verifySortingOrder('Price', 'desc');

            await filtersPage.applySorting('pd.name', 'asc');
            await filtersPage.verifySortingOrder('Name', 'asc');

            await filtersPage.applySorting('pd.name', 'desc');
            await filtersPage.verifySortingOrder('Name', 'desc');
        });
    });

});