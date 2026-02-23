import {Page, Locator} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import {HeaderComponent} from '../components/header.component';

export class CategoryPage {
    readonly header: HeaderComponent;

    constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
    }

    get products(): Locator {
        return this.page.locator(selectors.categoryPage.productCard);
    }

    async waitLoaded(): Promise<void> {
        await this.page.locator(selectors.categoryPage.root).waitFor({state: 'visible'});
    }
}