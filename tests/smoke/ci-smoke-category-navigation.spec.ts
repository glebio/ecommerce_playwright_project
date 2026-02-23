import {test, expect} from '@playwright/test';
import {HomePage} from '../../src/pages/home.page';
import {CategoryPage} from '../../src/pages/category.page';

const categories = [
    {name: 'Best Offers', urlPart: '/best-offers'},
    {name: 'Smartphones & Accessories', urlPart: '/smartphones-and-accessories'},
];

test.describe('@ci-smoke Category Navigation', () => {
    for (const category of categories) {
        test(`navigate to ${category.name}`, async ({page}) => {
            const home = new HomePage(page);
            const categoryPage = new CategoryPage(page);

            await home.open();

            await test.step(`Open category: ${category.name}`, async () => {
                await home.categoryMenu.openTopCategory(category.name);
            });

            await test.step('Verify navigation', async () => {
                await expect(page).toHaveURL(new RegExp(`${category.urlPart}.*`));

                await categoryPage.waitLoaded();

                await expect(categoryPage.products.first()).toBeVisible();
            });
        });
    }
});