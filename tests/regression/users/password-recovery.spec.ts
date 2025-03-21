import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';

test.describe('Password Recovery Functionality', () => {
    const BASE_URL = config.use?.baseURL || 'https://shop.qaresults.com';
    const recoveryPageURL = `${BASE_URL}/index.php?route=account/forgotten`;
    const recoveryEmail = 'testuser@example.com'; //use valid email

    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
    });

    test('Verify "Forgot Password" link is present and navigates correctly', async ({page}) => {
        const loginLink = page.locator('a', {hasText: 'Sign In'});
        await loginLink.click();

        const forgotPasswordLink = page.locator('a', {hasText: 'Forgotten Password'});
        await expect(forgotPasswordLink).toBeVisible();

        await forgotPasswordLink.click();
        await expect(page).toHaveURL(recoveryPageURL);
        console.log('✅ Navigated to the password recovery page.');
    });

    test('Verify recovery form accepts email and displays confirmation', async ({page}) => {
        await page.goto(recoveryPageURL);

        const emailInput = page.locator('input[name="email"]');
        const continueButton = page.locator('input[type="submit"][value="Continue"]');

        await expect(emailInput).toBeVisible();
        await emailInput.fill(recoveryEmail);
        await continueButton.click();

        const alertSuccess = page.locator('.alert-success');
        await expect(alertSuccess).toBeVisible();
        await expect(alertSuccess).toContainText('An email with a confirmation link has been sent');
        console.log('✅ Password recovery email submitted successfully.');
    });
});