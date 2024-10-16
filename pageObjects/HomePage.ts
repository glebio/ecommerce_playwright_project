import {Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class HomePage {
    constructor(private page: Page) {
    }

    async navigate() {
        await this.page.goto('/');
    }

    async closePopupIfAppears() {
        const popupCloseButton = selectors.popup.closeButton;
        if (await this.page.locator(popupCloseButton).isVisible()) {
            await this.page.click(popupCloseButton);
        }
    }

    async searchProduct(keyword: string) {
        await this.page.fill(selectors.homePage.searchBox, keyword);
        await this.page.click(selectors.homePage.searchButton);
    }
}