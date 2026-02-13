import {Page, Locator} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class HeaderComponent {
    constructor(private readonly page: Page) {
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

    get viewCartButton(): Locator {
        return this.page.locator(`xpath=${selectors.productPage.viewCartButton}`);
    }

    async search(keyword: string) {
        await this.searchBox.fill(keyword);
        await this.searchButton.click();
    }

    async goToCart() {
        await this.cartButton.click();
        await this.viewCartButton.click();
    }
}