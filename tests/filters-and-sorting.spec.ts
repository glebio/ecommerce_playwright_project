import {test} from '@playwright/test';
import {HomePage} from '../pageObjects/HomePage';
import {FiltersPage} from '../pageObjects/FiltersPage';

test('Filter by category: Verify only relevant products are displayed', async ({page}) => {
    const homePage = new HomePage(page);
    const filtersPage = new FiltersPage(page);

    await homePage.navigateTo('/');
    await homePage.navigateToSubCategory('Mobile & Accessories', 'Mobile Phones');
    await filtersPage.verifyFilteredProducts(['Apple iPhone']);
});