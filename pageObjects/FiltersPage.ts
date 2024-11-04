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
        // Verify that only filtered products are visible on the page
        for (const productName of productNames) {
            const productItem = this.page.locator(selectors.productPage.productItem).filter({hasText: productName});
            await expect(productItem).toBeVisible();
        }
    }
}