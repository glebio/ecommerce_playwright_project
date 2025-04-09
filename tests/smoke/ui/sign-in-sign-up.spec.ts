import {test, expect} from '@playwright/test';
import {HomePage} from '../../../pageObjects/HomePage';
import config from '../../../playwright.config';
import {selectors} from '../../../selectors/selectors';

// Feature: Sign In/Sign Up Verification
// This test suite ensures that both Sign In and Sign Up functionalities are visible and functioning properly on the home page.

test.describe('Sign In/Sign Up Options Verification @smoke', () => {
    const baseURL = config.use?.baseURL || 'https://shop.qaresults.com';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    test.beforeEach(async ({page}) => {
        await page.goto(baseURL);
    });

    test('Verify Sign In button is visible and navigates to the login page', async ({page}) => {
        const homePage = new HomePage(page);

        await test.step('Navigate to Login', async () => {
            await homePage.navigateToLogin();
        });

        await test.step('Verify Login URL and visibility', async () => {
            await expect(page).toHaveURL(`${baseURL}/login`);
            console.log('✅ Sign In button navigates to the Login page.');
        });
    });

    test('Verify Sign Up button is visible and navigates to the register page', async ({page}) => {
        const homePage = new HomePage(page);

        await test.step('Navigate to Register', async () => {
            await homePage.navigateToRegister();
        });

        await test.step('Verify Register URL and visibility', async () => {
            await expect(page).toHaveURL(`${baseURL}/register`);
            console.log('✅ Sign Up button navigates to the Register page.');
        });
    });

    test('Verify both Sign In and Sign Up buttons are present in the account dropdown', async ({page}) => {
        await test.step('Open Account Dropdown', async () => {
            await page.click(selectors.homePage.accountButton);
        });

        await test.step('Check Sign In and Sign Up buttons visibility', async () => {
            const signInButton = page.locator(selectors.homePage.loginButton);
            const signUpButton = page.locator(selectors.homePage.registerButton);

            await expect(signInButton).toBeVisible();
            await expect(signUpButton).toBeVisible();
            console.log('✅ Both Sign In and Sign Up buttons are visible on the home page.');
        });
    });
});