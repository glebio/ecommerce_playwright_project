import {Page, Locator} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class HeaderComponent {
    constructor(private page: Page) {
    }

    get searchBox(): Locator {
        return this.page.locator(selectors.homePage.searchBox);
    }

    get searchButton(): Locator {
        return this.page.locator(selectors.homePage.searchButton);
    }

    get cartButton(): Locator {
        return this.page.locator(selectors.productPage.cartButton);
    }
}