import {Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import {clickElement} from '../utils/viewUtils';

export class HomePage {
    constructor(private page: Page) {
    }

    async navigate() {
        await this.page.goto('/');
    }

    async closePopupIfAppears() {
        const popupCloseButton = selectors.popup.closeButton;
        const popupExists = await this.page.locator(popupCloseButton).count();

        if (popupExists > 0) {
            await this.page.click(popupCloseButton);
        } else {
            await this.page.waitForTimeout(500);

            const popupExistsRetry = await this.page.locator(popupCloseButton).count();
            if (popupExistsRetry > 0) {
                await this.page.click(popupCloseButton);
            }
        }
    }

    async searchProduct(keyword: string) {
        await this.page.fill(selectors.homePage.searchBox, keyword);
        await clickElement(this.page, selectors.homePage.searchButton);
    }
}