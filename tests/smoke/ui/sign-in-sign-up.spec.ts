import {test, expect} from '@playwright/test';
import {HomePage} from '../../../pageObjects/HomePage';
import config from '../../../playwright.config';
import {selectors} from "../../../selectors/selectors";

// Feature: Sign In/Sign Up Verification
test.describe('Sign In/Sign Up Options Verification @smoke', () => {
    const baseURL = config.use?.baseURL || 'https://shop.qaresults.com';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    test.beforeEach(async ({page}) => {
        await page.goto(baseURL);
    });

    test('Verify Sign In button is visible and clickable', async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.navigateToLogin();
        await page.waitForURL(`${baseURL}/login`);
        expect(page.url()).toBe(`${baseURL}/login`);
        console.log('✅ Sign In button is visible and navigates to the Sign In page.');
    });

    test('Verify Sign Up button is visible and clickable', async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.navigateToRegister();
        await page.waitForURL(`${baseURL}/register`);
        expect(page.url()).toBe(`${baseURL}/register`);
        console.log('✅ Sign Up button is visible and navigates to the Sign Up page.');
    });

    test('Verify both Sign In and Sign Up options are present on the home page', async ({page}) => {
        await page.click(selectors.homePage.accountButton);
        const signInButton = page.locator(selectors.homePage.loginButton);
        const signUpButton = page.locator(selectors.homePage.registerButton);

        await expect(signInButton).toBeVisible();
        await expect(signUpButton).toBeVisible();
        console.log('✅ Both Sign In and Sign Up options are visible on the home page.');
    });
});