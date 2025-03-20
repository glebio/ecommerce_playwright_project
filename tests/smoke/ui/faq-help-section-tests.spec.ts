import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';

// Feature: FAQ and Help Section Verification
// Ensures the FAQ and Help pages load correctly and display relevant information.

test.describe('FAQ and Help Section Verification', () => {
    const BASE_URL = config.use?.baseURL || 'https://shop.qaresults.com';
    if (!BASE_URL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    const FAQ_PAGE = `${BASE_URL}/faq`; // Update with actual FAQ page URL
    const HELP_PAGE = `${BASE_URL}/help`; // Update with actual Help page URL

    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
    });

    test('Verify FAQ page loads correctly and contains expected content', async ({page}) => {
        await page.goto(FAQ_PAGE);

        // Check if the FAQ header is visible
        const faqHeader = page.locator('h1');
        await expect(faqHeader).toBeVisible();
        await expect(faqHeader).toHaveText(/FAQ|Frequently Asked Questions/i);
        console.log('✅ FAQ page header is visible and correct.');

        // Check if at least one FAQ entry exists
        const faqEntries = page.locator('.faq-item'); // Update selector if needed
        const count = await faqEntries.count();
        expect(count).toBeGreaterThan(0);
        console.log('✅ FAQ page contains relevant entries.');
    });

    test('Verify Help page loads correctly and provides useful information', async ({page}) => {
        await page.goto(HELP_PAGE);

        // Check if the Help page header is visible
        const helpHeader = page.locator('h1');
        await expect(helpHeader).toBeVisible();
        await expect(helpHeader).toHaveText(/Help|Support/i);
        console.log('✅ Help page header is visible and correct.');

        // Check if at least one help topic exists
        const helpTopics = page.locator('.help-topic'); // Update selector if needed
        await expect(helpTopics).toHaveCountGreaterThan(0);
        console.log('✅ Help page contains relevant topics.');
    });
});