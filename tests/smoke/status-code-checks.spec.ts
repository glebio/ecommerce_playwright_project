import {test, expect} from '@playwright/test';

test.describe('Smoke Tests for Status Codes', () => {
    test('Verify status codes for key pages', async ({request, baseURL}) => {
        if (!baseURL) {
            throw new Error('Base URL is not defined in Playwright config.');
        }

        // Define pages to check
        const urlsToCheck = [
            {url: `${baseURL}/`, name: 'Homepage'},
            {url: `${baseURL}/smartphones-and-accessories/smartphones`, name: 'Category Page'},
            {url: `${baseURL}/product-name`, name: 'Product Page'},
            {url: `${baseURL}/cart`, name: 'Cart Page'},
            {url: `${baseURL}/checkout`, name: 'Checkout Page'},
            {url: `${baseURL}/login`, name: 'Login Page'},
            {url: `${baseURL}/register`, name: 'Registration Page'},
            {url: `${baseURL}/search?query=example`, name: 'Search Page'},
            {url: `${baseURL}/contact`, name: 'Contact Page'},
            {url: `${baseURL}/privacy`, name: 'Privacy Policy Page'},
            {url: `${baseURL}/non-existing-page`, name: '404 Page'},
        ];

        for (const {url, name} of urlsToCheck) {
            const response = await request.get(url);

            if (name === '404 Page') {
                // Expect a 404 status for the 404 page
                expect(response.status()).toBe(404);
            } else {
                // Expect a 200 status for all other pages
                expect(response.status()).toBe(200);
            }

            console.log(`${name} (${url}) responded with status code: ${response.status()}`);
        }
    });
});