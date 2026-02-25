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

    get accountButton(): Locator {
        return this.page.locator(selectors.homePage.accountButton);
    }

    get loginLink(): Locator {
        return this.page.locator(selectors.homePage.loginButton);
    }

    get registerLink(): Locator {
        return this.page.locator(selectors.homePage.registerButton);
    }

    async openAccountDropdown(): Promise<void> {
        await this.accountButton.click();
    }

    get logo(): Locator {
        return this.page.locator(selectors.homePage.logo);
    }

    get logoImage(): Locator {
        return this.page.locator(selectors.homePage.logoImage);
    }
}