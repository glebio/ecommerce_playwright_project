import {Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class AdminPage {
    constructor(private page: Page) {
    }

    async navigateToAdminLogin() {
        await this.page.goto('/admin');
    }

    async loginAsAdmin(username: string, password: string) {
        await this.page.fill(selectors.adminPage.loginUsernameInput, username);
        await this.page.fill(selectors.adminPage.loginPasswordInput, password);
        await this.page.click(selectors.adminPage.loginButton);
    }

    async navigateToReviewsSection() {
        await this.page.click(selectors.adminPage.catalogDropdown);
        await this.page.click(selectors.adminPage.reviewsLink);
    }

    async approveReview(productName: string) {
        const reviewRow = this.page.locator(selectors.adminPage.reviewRow).filter({hasText: productName});
        await reviewRow.click();
        await this.page.check(selectors.adminPage.approveCheckbox);
        await this.page.click(selectors.adminPage.saveButton);
    }
}