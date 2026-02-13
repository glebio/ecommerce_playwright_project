import {Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import config from '../../config.json';

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
        await this.page.waitForSelector(selectors.adminPage.catalogDropdown, {state: 'visible'});
        await this.page.click(selectors.adminPage.catalogDropdown);

        await this.page.waitForSelector(selectors.adminPage.reviewsLink, {state: 'visible'});
        await this.page.click(selectors.adminPage.reviewsLink);

        // Step 2: Locate and edit the review
        const editButtonSelector = selectors.adminPage.reviewEditButton(authorName);

        // Ensure the edit button is visible before clicking
        await this.page.waitForSelector(editButtonSelector, {state: 'visible'});
        await this.page.click(editButtonSelector);
    }

    async approveReview() {
        await this.page.selectOption('select[name="status"]', '1');
        await this.page.click('button[type="submit"][data-original-title="Save"]');
    }
}