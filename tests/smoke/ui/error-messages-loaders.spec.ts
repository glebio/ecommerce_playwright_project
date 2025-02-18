import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';
import {selectors} from '../../../selectors/selectors';

// Feature: Error Messages and Loaders Verification
// Ensures proper display of error messages and loaders for invalid links and slow-loading pages

test.describe('Error Messages and Loaders Verification', () => {
    const BASE_URL = config.use?.baseURL || 'https://shop.qaresults.com';
    if (!BASE_URL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    test('Verify 404 error message for invalid links', async ({page}) => {
        await page.goto(`${BASE_URL}/non-existent-page`, {waitUntil: 'domcontentloaded'});

        // Verify the error message is displayed
        const errorMessage = page.locator(selectors.errorPage.errorMessage);
        await expect(errorMessage).toBeVisible();
        console.log('✅ 404 error message is displayed correctly.');

        // Verify the error message text
        await expect(errorMessage).toHaveText(/Page not found|404/i);
    });

    test('Verify loader is visible on slow-loading pages', async ({page}) => {
        await page.goto(BASE_URL);

        // Simulate a slow network condition
        await page.route('**/*', (route) => {
            if (route.request().resourceType() === 'document') {
                setTimeout(() => route.continue(), 3000); // Simulate a 3s delay
            } else {
                route.continue();
            }
        });

        // Reload the page to trigger loader
        await page.reload();

        // Verify loader is visible
        const loader = page.locator(selectors.loaders.generalLoader);
        await expect(loader).toBeVisible();
        console.log('✅ Loader is displayed correctly on slow-loading pages.');

        // Wait for the loader to disappear
        await expect(loader).toBeHidden();
        console.log('✅ Loader disappears after page fully loads.');
    });
});