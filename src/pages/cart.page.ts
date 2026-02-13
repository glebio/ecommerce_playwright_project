import {Page, Locator} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import {HeaderComponent} from '../components/header.component';

export class CartPage {
    readonly header: HeaderComponent;

    constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
    }

    get cartItems(): Locator {
        return this.page.locator(selectors.cartPage.cartItem);
    }

    async waitLoaded() {
        await this.cartItems.first().waitFor({state: 'visible'});
    }

}