import {Page, Locator} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import {HeaderComponent} from '../components/header.component';

export class PlpPage {
    readonly header: HeaderComponent;

    constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
    }

    get listViewButton(): Locator {
        return this.page.locator(selectors.productPage.listViewButton);
    }

    get productLinks(): Locator {
        return this.page.locator(selectors.productPage.productItemLink);
    }

    async open(category: string = '/smartphones-and-accessories') {
        await this.page.goto(category);
    }

    async selectFirstProduct() {
        if (await this.listViewButton.isVisible()) {
            await this.listViewButton.click();
        }
        await this.productLinks.first().click();
    }
}