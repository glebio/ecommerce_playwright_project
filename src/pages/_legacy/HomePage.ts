import {Page} from '@playwright/test';
import {selectors} from '../../selectors/selectors';

export class HomePage {
    constructor(private page: Page) {
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async navigateToSubCategory(categoryName: string, subCategoryName: string) {
        const categoryLink = selectors.homePage.categoryLink(categoryName);
        await this.page.hover(categoryLink);

        const subCategoryLink = selectors.homePage.subCategoryLink(subCategoryName);
        await this.page.waitForSelector(subCategoryLink, {state: 'visible'});

        await this.page.click(subCategoryLink);
    }

    async closePopupIfAppears() {
        const popupCloseButton = selectors.popups.closeButton;
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
        await this.page.click(selectors.homePage.accountButton);
        await this.page.click(selectors.homePage.registerButton);

        // Wait for the registration popup to appear
        const registrationPopup = selectors.popups.registerPopup.popupContainer;
        await this.page.waitForSelector(registrationPopup);

        // Fill out the registration form
        await this.page.fill(selectors.popups.registerPopup.firstNameInput, userData.firstName);
        await this.page.fill(selectors.popups.registerPopup.lastNameInput, userData.lastName);
        await this.page.fill(selectors.popups.registerPopup.emailInput, userData.email);
        await this.page.fill(selectors.popups.registerPopup.phoneInput, userData.phone);
        await this.page.fill(selectors.popups.registerPopup.passwordInput, userData.password);
        await this.page.fill(selectors.popups.registerPopup.confirmPasswordInput, userData.password);
        await this.page.check(selectors.popups.registerPopup.privacyPolicyCheckbox);
        await this.page.click(selectors.popups.registerPopup.submitButton);

        // Handle the success registration popup
        const successPopupSelector = selectors.popups.registerPopup.successPopup;
        await this.page.waitForSelector(successPopupSelector);
        await this.page.click(selectors.popups.registerPopup.continueButton);
    }

    async navigateToLogout() {
        // Click the Logout button on the homepage
        await this.page.click(selectors.homePage.accountButton);
        await this.page.click(selectors.homePage.logoutButton);
    }

    async navigateToLogin() {
        // Click the Login button on the homepage
        await this.page.click(selectors.homePage.accountButton);
        await this.page.click(selectors.homePage.loginButton);
        await this.page.waitForSelector(selectors.loginPage.loginForm);
    }

    async navigateToRegister() {
        // Click the Register button on the homepage
        await this.page.click(selectors.homePage.accountButton);
        await this.page.click(selectors.homePage.registerButton);
        await this.page.waitForSelector(selectors.registerPage.registerForm);
    }

    async loginUser(userData: { email: string, password: string }) {
        // Fill out the login form
        await this.page.fill(selectors.popups.loginPopup.emailInput, userData.email);
        await this.page.fill(selectors.popups.loginPopup.passwordInput, userData.password);
        await this.page.click(selectors.popups.loginPopup.submitButton);
    }
}
