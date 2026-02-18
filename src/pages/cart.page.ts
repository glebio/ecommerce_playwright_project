import {Page, Locator} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import {HeaderComponent} from '../components/header.component';

export class CartPage {
    readonly header: HeaderComponent;

    constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
    }

    get root(): Locator {
        return this.page.locator(selectors.cartPage.root);
    }

    get cartItems(): Locator {
        return this.root.locator(selectors.cartPage.cartItem);
    }

    get itemNames(): Locator {
        return this.root.locator(selectors.cartPage.cartItemName);
    }

    getItemByName(name: string): Locator {
        return this.cartItems.filter({hasText: name});
    }

    async waitLoaded(): Promise<void> {
        await this.root.waitFor({state: 'visible'});
    }
}