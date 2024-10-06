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
        const popupExists = await this.page.locator('#popup2 > span > span').count();

        if (popupExists > 0) {
            await this.page.click('#popup2 > span > span');
        } else {
            await this.page.waitForTimeout(500);

            const popupExistsRetry = await this.page.locator('#popup2 > span > span').count();
            if (popupExistsRetry > 0) {
                await this.page.click('#popup2 > span > span');
            }
        }
    }

    async searchProduct(keyword: string) {
        await this.page.fill(selectors.homePage.searchBox, keyword);
        await clickElement(this.page, selectors.homePage.searchButton);
    }
}