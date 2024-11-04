import {test} from '@playwright/test';
import {HomePage} from '../pageObjects/HomePage';
import {FiltersPage} from '../pageObjects/FiltersPage';

test('Filter by category: Verify only relevant products are displayed', async ({page}) => {
    const homePage = new HomePage(page);
    const filtersPage = new FiltersPage(page);

    await homePage.navigateTo('/');
    await filtersPage.navigateToCategory('Electronics');

    // Step 3: Apply filter by specific subcategory (e.g., Smartphones)
    await filtersPage.applyCategoryFilter('Category', 'Smartphones');

    // Step 4: Verify that the products displayed belong to the selected category
    await filtersPage.verifyFilteredProducts(['Smartphone']);
});