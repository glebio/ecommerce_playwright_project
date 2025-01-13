import {test, expect} from '@playwright/test';
import config from "../../../playwright.config";

test.describe('Logo Display Verification', () => {
    const baseURL = config.use?.baseURL || '';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }
    const pages = [
        {name: 'Home Page', url: baseURL},
        {name: 'Category Page', url: `${baseURL}/smartphones/apple-iphone`},
        {name: 'Product Page', url: `${baseURL}/smartphones/apple-iphone/apple-iphone-16-pro-128gb-black-titanium`}
    ];

    for (const pageConfig of pages) {
        test(`Verify logo on ${pageConfig.name}`, async ({page}) => {
            // Navigate to the page
            await page.goto(pageConfig.url);

            // Locate the logo
            const logo = page.locator('header div#logo > a > img'); // Adjusted selector for the logo
            await expect(logo).toBeVisible(); // Ensure the logo is visible

            // Get the logo's parent link
            const logoLink = page.locator('header div#logo > a'); // Adjusted selector for the clickable link
            await expect(logoLink).toHaveAttribute('href', `${baseURL}/`); // Ensure it redirects to the home page

            // Click the logo and verify redirection to the home page
            await logoLink.click();
            await page.waitForURL(baseURL, {timeout: 8000});
            expect(page.url()).toBe(baseURL); // Final assertion for URL
        });
    }
});