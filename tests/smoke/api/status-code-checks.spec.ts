import {test, expect} from '@playwright/test';

test.describe('Smoke Tests for Status Codes @smoke', () => {
    test('Verify status codes for key pages @smoke', async ({request, baseURL}) => {
        test.info().annotations.push({type: 'tag', description: 'smoke'});
        if (!baseURL) {
            throw new Error('Base URL is not defined in Playwright config.');
        }

        // Define pages to check
        const urlsToCheck = [
            {url: `${baseURL}/`, name: 'Homepage', expectedStatus: 200},
            {url: `${baseURL}/smartphones-and-accessories/smartphones`, name: 'Category Page', expectedStatus: 200},
            {
                url: `${baseURL}/smartphones-and-accessories/smartphones/apple-iphone-16-pro-512gb-black-titanium`,
                name: 'Product Page',
                expectedStatus: 200
            },
            {url: `${baseURL}/index.php?route=checkout/cart`, name: 'Checkout Page', expectedStatus: 200},
            {
                url: `${baseURL}/index.php?route=product/product&product_id=51&search=iphone&category_id=0`,
                name: 'Search Page',
                expectedStatus: 200
            },
            {url: `${baseURL}/index.php?route=information/contact`, name: 'Contact Page', expectedStatus: 200},
            {url: `${baseURL}/privacy`, name: 'Privacy Policy Page', expectedStatus: 200},
            {url: `${baseURL}/non-existing-page`, name: '404 Page', expectedStatus: 404},
        ];

        let hasFailures = false;

        for (const {url, name, expectedStatus} of urlsToCheck) {
            console.log(`Checking URL: ${url} (${name})`);
            const response = await request.get(url);

            try {
                expect(response.status()).toBe(expectedStatus);
                console.log(`✅ ${name} (${url}) returned status code: ${response.status()}`);
            } catch (error) {
                hasFailures = true;
                console.error(`❌ ${name} (${url}) failed with status code: ${response.status()} (Expected: ${expectedStatus})`);
            }
        }

        // Fail the test if any URL failed
        if (hasFailures) {
            throw new Error('One or more URLs failed status code checks.');
        }
    });
});