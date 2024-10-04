import {Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import {clickElement} from '../utils/viewUtils';

export class HomePage {
    constructor(private page: Page) {
    }

    async navigate() {
        await this.page.goto('/');
    }

    async searchProduct(keyword: string) {
        await this.page.fill(selectors.homePage.searchBox, keyword);
        await clickElement(this.page, selectors.homePage.searchButton);
    }
}