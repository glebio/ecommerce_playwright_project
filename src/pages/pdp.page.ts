import {Page, Locator} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import {HeaderComponent} from '../components/header.component';

export class PdpPage {
    readonly header: HeaderComponent;

    constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
    }

    get addToCartButton(): Locator {
        return this.page.locator(selectors.productPage.addToCartButton);
    }

    get productTitle(): Locator {
        return this.page.locator(selectors.productPage.productTitle);
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async waitLoaded(): Promise<void> {
        await this.productTitle.waitFor({state: 'visible'});
    }

}