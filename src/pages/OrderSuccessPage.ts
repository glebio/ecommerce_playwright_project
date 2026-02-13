import {Page, expect} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class OrderSuccessPage {
    constructor(private page: Page) {
    }

    async verifyOrderSuccessMessage() {
        const successMessage = this.page.locator(selectors.orderSuccessPage.successMessage);
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('Your order has been successfully processed!');
    }
}