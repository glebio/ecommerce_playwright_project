import {Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class ProductPage {
    constructor(private page: Page) {
    }

    async selectFirstProduct() {
        await this.page.click(selectors.productPage.listViewButton);
        await this.page.locator(selectors.productPage.productItem).first().click();
    }

    async addToCart() {
        await this.page.click(selectors.productPage.addToCartButton);
    }

    async navigateToCart() {
        await this.page.click(selectors.productPage.cartButton);
        await this.page.click(selectors.productPage.viewCartButton);
    }
}