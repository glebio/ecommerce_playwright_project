import {Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import config from '../config.json';

export class AdminPage {
    constructor(private page: Page) {
    }

    async navigateToAdminLogin() {
        await this.page.goto('/admin');
    }

    async loginAsAdmin() {
        const {username, password} = config.admin;
        await this.page.goto(config.admin.loginUrl);
        await this.page.fill(selectors.adminPage.loginUsernameInput, username);
        await this.page.fill(selectors.adminPage.loginPasswordInput, password);
        await this.page.click(selectors.adminPage.loginButton);
    }

    async navigateToReviewsSectionAndEdit(authorName: string) {
        // Step 1: Navigate to the Reviews section
        await this.page.click(selectors.adminPage.catalogDropdown);
        await this.page.click(selectors.adminPage.reviewsLink);

        // Step 2: Locate the review by author name and click the edit button
        const editButtonSelector = selectors.adminPage.reviewEditButton.replace('{authorName}', authorName);
        await this.page.click(editButtonSelector);
    }

    async approveReview(productName: string) {
        const reviewRow = this.page.locator(selectors.adminPage.reviewRow).filter({hasText: productName});
        await reviewRow.click();
        await this.page.check(selectors.adminPage.approveCheckbox);
        await this.page.click(selectors.adminPage.saveButton);
    }
}