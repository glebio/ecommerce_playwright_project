import {expect, Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class FiltersPage {
    constructor(private page: Page) {
    }

    async navigateToCategory(categoryName: string) {
        const categoryLink = selectors.filtersPage.categoryLink.replace('{categoryName}', categoryName);
        await this.page.click(categoryLink);
        await this.page.waitForSelector(selectors.filtersPage.categoryHeader.replace('{categoryName}', categoryName));
    }

    async applyCategoryFilter(filterName: string, filterOption: string) {
        // Open the filter dropdown and select the appropriate filter option
        const filterDropdown = selectors.filtersPage.filterDropdown.replace('{filterName}', filterName);
        await this.page.click(filterDropdown);
        const filterOptionSelector = selectors.filtersPage.filterOption.replace('{filterOption}', filterOption);
        await this.page.click(filterOptionSelector);
        await this.page.waitForLoadState('networkidle');
    }

    async verifyFilteredProducts(productNames: string[]) {
        for (const productName of productNames) {
            const productItems = this.page.locator(selectors.productPage.productItem).filter({hasText: productName});
            await expect(productItems.first()).toBeVisible({timeout: 10000});
            const productsCount = await productItems.count();
            expect(productsCount).toBeGreaterThan(0);
            for (let i = 0; i < productsCount; i++) {
                await expect(productItems.nth(i)).toBeVisible();
            }
        }
    }

    async applySorting(sortingOption: string) {
        const sortingDropdown = selectors.filtersPage.sortingDropdown;
        await this.page.click(sortingDropdown);
        const sortingOptionSelector = selectors.filtersPage.sortingOption.replace('{sortingOption}', sortingOption);
        await this.page.click(sortingOptionSelector);
        await this.page.waitForLoadState('networkidle');
    }

    async verifySortingOrder(attribute: string, order: 'asc' | 'desc') {
        const productPrices = await this.page.locator(selectors.productPage.productPrice).allTextContents();
        const prices = productPrices.map(price => parseFloat(price.replace(/[^\d.]/g, '')));
        const sortedPrices = [...prices].sort((a, b) => (order === 'asc' ? a - b : b - a));
        expect(prices).toEqual(sortedPrices);
    }
}