import {expect, Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import config from '../../playwright.config';

export class FiltersPage {
    constructor(private page: Page) {
    }

    async navigateToCategory(categoryName: string) {
        const categoryLink = selectors.filtersPage.categoryLink(categoryName);

        // Ensure the category link is visible before clicking
        await this.page.waitForSelector(categoryLink, {state: 'visible'});
        await this.page.click(categoryLink);

        const categoryHeader = selectors.filtersPage.categoryHeader(categoryName);

        // Wait for the category header to confirm navigation
        await this.page.waitForSelector(categoryHeader, {state: 'visible'});
    }

    async applyCategoryFilter(filterName: string, filterOption: string) {
        const filterOptionSelector = selectors.filtersPage.getFilterOption(filterName, filterOption);
        await this.page.click(filterOptionSelector);
        const showProductsPopup = selectors.filtersPage.showProductsPopup;
        await this.page.waitForSelector(showProductsPopup, {
            state: 'visible',
            timeout: 8000,
        });
        await this.page.click(showProductsPopup);
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

    async applySorting(sortBy: string, order: string) {
        const sortingDropdown = selectors.filtersPage.sortingDropdown;
        const baseURL = config.use?.baseURL || '';
        const sortingValue = `${baseURL}/smartphones/apple-iphone?sort=${sortBy}&order=${order.toUpperCase()}`;
        await this.page.waitForSelector(sortingDropdown, {timeout: 8000});
        await this.page.selectOption(sortingDropdown, {value: sortingValue});
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector(selectors.productPage.productList, {timeout: 8000});
    }

    async verifySortingOrder(attribute: 'Price' | 'Name', order: 'asc' | 'desc') {
        let values: (string | number)[];
        if (attribute === 'Price') {
            const productPrices = await this.page.locator(selectors.productPage.productPrice).allTextContents();
            values = productPrices.map(price => parseFloat(price.replace(/[^\d.]/g, ''))).filter(price => !isNaN(price));
        } else if (attribute === 'Name') {
            values = await this.page.locator(selectors.productPage.productName).allTextContents();
        } else {
            throw new Error(`Unsupported attribute: ${attribute}`);
        }
        const sortedValues = [...values].sort((a, b) => {
            if (typeof a === 'string' && typeof b === 'string') {
                return order === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
            }
            return order === 'asc' ? (a as number) - (b as number) : (b as number) - (a as number);
        });
        expect(values).toEqual(sortedValues);
    }
}