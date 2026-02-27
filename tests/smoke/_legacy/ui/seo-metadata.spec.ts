import {test, expect} from '@playwright/test';
import config from "../../../../playwright.config";

test.describe('SEO Metadata Verification @smoke', () => {
    // Extract baseURL from Playwright configuration
    const baseURL = config.use?.baseURL || '';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }
    test.beforeEach(async ({page}) => {
        await page.goto(baseURL); // Navigate to the page before each test
    });

    test('Verify page title', async ({page}) => {
        // Get the page title
        const pageTitle = await page.title();
        console.log('Page Title:', pageTitle);
        // Ensure the title exists and is not empty
        expect(pageTitle).toBeTruthy(); // Simplified null and empty check
        expect(pageTitle).toContain('shop.qaresults.com - Test E-commerce Store for Test Automation'); // Verify the title contains expected text
    });

    test('Verify meta description', async ({page}) => {
        // Get the meta description content
        const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
        console.log('Meta Description:', metaDescription);

        // Ensure the meta description exists and is not empty
        expect(metaDescription).toBeTruthy(); // Simplified null and empty check
        expect(metaDescription).toContain('Welcome to shop.qaresults.com — your test e-commerce store for automation. Use our site to validate and test UI, API, and other functionalities with ease.'); // Verify the description contains expected text
    });
    test('Verify meta keywords (if used)', async ({page}) => {
        // Get the meta keywords content
        const metaKeywords = await page.locator('meta[name="keywords"]').getAttribute('content');
        console.log('Meta Keywords:', metaKeywords);
        // Verify keywords are present and valid
        if (metaKeywords) {
            expect(metaKeywords).toBeTruthy(); // Simplified null and empty check
            expect(metaKeywords).toContain('test store, test automation, UI tests, API tests, shop.qaresults.com, e-commerce testing'); // Verify expected keyword
        } else {
            console.warn('Meta Keywords are not used on this page.'); // Log a warning if not present
        }
    });

    test('Verify base URL', async ({page}) => {
        await page.goto(baseURL);
        // Retrieve the 'href' attribute of the <base> tag
        const baseTagURL = await page.locator('base').getAttribute('href');
        console.log('Base Tag URL:', baseTagURL);
        // Ensure the base tag URL exists and normalize it
        expect(baseTagURL).toBeTruthy(); // Check that it is not null or empty
        // Normalize URLs by removing trailing slashes for comparison
        const normalizedBaseTagURL = baseTagURL?.replace(/\/+$/, '');
        const normalizedBaseURL = baseURL.replace(/\/+$/, '');
        expect(normalizedBaseTagURL).toBe(normalizedBaseURL); // Verify it matches the expected base URL
    });

    test.describe('SEO Metadata Verification @smoke', () => {
        test.skip('Verify canonical URL (skipped temporarily)', async ({page}) => {
            await page.goto(baseURL);
            // Attempt to retrieve the canonical URL
            const canonicalURL = await page.locator('link[rel="canonical"]').getAttribute('href', {timeout: 8000});
            if (!canonicalURL) {
                console.warn('Canonical URL is not defined on the page.');
                return; // Skip further checks if canonical URL is missing
            }
            console.log('Canonical URL:', canonicalURL);
            // Normalize URLs for comparison
            const normalizedCanonicalURL = canonicalURL.replace(/\/+$/, '');
            const normalizedBaseURL = baseURL.replace(/\/+$/, '');
            // Assert that the canonical URL matches the base URL
            expect(normalizedCanonicalURL).toBe(normalizedBaseURL);
        });
    });
});