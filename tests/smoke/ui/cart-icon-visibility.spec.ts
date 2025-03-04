import {test, expect} from '@playwright/test';
import {HomePage} from '../../../pageObjects/HomePage';
import config from '../../../playwright.config';

// Constants for selectors and URLs
const SIGN_IN_BUTTON_SELECTOR = 'a:has-text("Sign In")';
const SIGN_UP_BUTTON_SELECTOR = 'a:has-text("Sign Up")';
const BASE_URL = config.use?.baseURL || 'https://shop.qaresults.com';

if (!BASE_URL) {
    throw new Error('Base URL is not defined in Playwright configuration.');
}

// Feature: Sign In/Sign Up Verification
test.describe('Sign In/Sign Up Options Verification @smoke', () => {

    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
    });

    test('Verify Sign In button is visible and clickable', async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.navigateToLogin();
        await page.waitForURL(`${BASE_URL}/sign-in`);
        expect(page.url()).toBe(`${BASE_URL}/sign-in`);
        console.log('✅ Sign In button is visible and navigates to the Sign In page.');
    });

    test('Verify Sign Up button is visible and clickable', async ({page}) => {
        const signUpButton = page.locator(SIGN_UP_BUTTON_SELECTOR);

        await expect(signUpButton).toBeVisible();
        await signUpButton.click();
        await page.waitForURL(`${BASE_URL}/sign-up`);
        expect(page.url()).toBe(`${BASE_URL}/sign-up`);
        console.log('✅ Sign Up button is visible and navigates to the Sign Up page.');
    });

    test('Verify both Sign In and Sign Up options are present on the home page', async ({page}) => {
        const signInButton = page.locator(SIGN_IN_BUTTON_SELECTOR);
        const signUpButton = page.locator(SIGN_UP_BUTTON_SELECTOR);

        await expect(signInButton).toBeVisible();
        await expect(signUpButton).toBeVisible();
        console.log('✅ Both Sign In and Sign Up options are visible on the home page.');
    });
});