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

    async registerUser(userData: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        password: string
    }) {
        // Click the Register button on the homepage
        await this.page.click(selectors.homePage.registerButton);

        // Wait for the registration popup to appear
        const registrationPopup = selectors.registerPopup.popupContainer;
        await this.page.waitForSelector(registrationPopup);

        // Fill out the registration form
        await this.page.fill(selectors.registerPopup.firstNameInput, userData.firstName);
        await this.page.fill(selectors.registerPopup.lastNameInput, userData.lastName);
        await this.page.fill(selectors.registerPopup.emailInput, userData.email);
        await this.page.fill(selectors.registerPopup.phoneInput, userData.phone);
        await this.page.fill(selectors.registerPopup.passwordInput, userData.password);
        await this.page.fill(selectors.registerPopup.confirmPasswordInput, userData.password);
        await this.page.click(selectors.registerPopup.submitButton);
    }
}
