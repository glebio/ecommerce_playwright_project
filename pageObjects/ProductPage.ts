import {Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import {clickElement, waitForElement} from '../utils/viewUtils';

export class ProductPage {
    constructor(private page: Page) {
    }

    async selectFirstProduct() {
        await clickElement(this.page, selectors.productPage.listViewButton);
        await waitForElement(this.page, selectors.productPage.productListItem);
        await this.page.locator(selectors.productPage.productListItem).first().click();
    }

    async addToCart() {
        await clickElement(this.page, selectors.productPage.addToCartButton);
    }

    async navigateToCart() {
        await clickElement(this.page, selectors.productPage.cartLink);
    }
}