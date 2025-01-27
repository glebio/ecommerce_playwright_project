import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';

// Feature: Sign In/Sign Up Verification
test.describe('Sign In/Sign Up Options Verification', () => {
    const baseURL = config.use?.baseURL || 'https://shop.qaresults.com';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    const signInButtonSelector = 'a:has-text("Sign In")'; // Update selector if needed
    const signUpButtonSelector = 'a:has-text("Sign Up")'; // Update selector if needed

    test.beforeEach(async ({page}) => {
        await page.goto(baseURL);
    });

    test('Verify Sign In button is visible and clickable', async ({page}) => {
        const signInButton = page.locator(signInButtonSelector);

        await expect(signInButton).toBeVisible();

        await signInButton.click();
        await page.waitForURL(`${baseURL}/sign-in`);
        expect(page.url()).toBe(`${baseURL}/sign-in`);
        console.log('✅ Sign In button is visible and navigates to the Sign In page.');
    });

    test('Verify Sign Up button is visible and clickable', async ({page}) => {
        const signUpButton = page.locator(signUpButtonSelector);

        await expect(signUpButton).toBeVisible();

        await signUpButton.click();
        await page.waitForURL(`${baseURL}/sign-up`);
        expect(page.url()).toBe(`${baseURL}/sign-up`);
        console.log('✅ Sign Up button is visible and navigates to the Sign Up page.');
    });

    test('Verify both Sign In and Sign Up options are present on the home page', async ({page}) => {
        const signInButton = page.locator(signInButtonSelector);
        const signUpButton = page.locator(signUpButtonSelector);

        await expect(signInButton).toBeVisible();
        await expect(signUpButton).toBeVisible();
        console.log('✅ Both Sign In and Sign Up options are visible on the home page.');
    });
});