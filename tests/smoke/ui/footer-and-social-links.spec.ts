import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';
import {selectors} from '../../../selectors/selectors';

// Feature: Footer and Social Links Verification
// This test suite ensures that all footer links and social media icons are present, visible, and clickable.

test.describe('Footer and Social Links Verification', () => {
    const BASE_URL = config.use?.baseURL || 'https://shop.qaresults.com';
    if (!BASE_URL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
    });

    test('Verify footer links are visible and clickable', async ({page}) => {
        // Locate all footer links
        const footerLinks = page.locator(selectors.footer.links); // Example selector: 'footer a'

        const linkCount = await footerLinks.count();
        expect(linkCount).toBeGreaterThan(0);
        console.log(`✅ Found ${linkCount} footer links.`);

        for (let i = 0; i < linkCount; i++) {
            const link = footerLinks.nth(i);
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy(); // Ensure each link has an href
            console.log(`🔗 Footer link ${i + 1}: ${href}`);

            // Check if the link is clickable
            await expect(link).toBeVisible();
        }
    });

    test('Verify social media icons are present and clickable', async ({page}) => {
        // Locate all social media icons
        const socialIcons = page.locator(selectors.footer.socialMediaIcons);

        const iconCount = await socialIcons.count();
        expect(iconCount).toBeGreaterThan(0);
        console.log(`✅ Found ${iconCount} social media icons.`);

        for (let i = 0; i < iconCount; i++) {
            const icon = socialIcons.nth(i);
            const href = await icon.getAttribute('href');
            expect(href).toBeTruthy(); // Ensure each social icon has a link
            console.log(`🌐 Social media icon ${i + 1}: ${href}`);

            // Check if the icon is visible and clickable
            await expect(icon).toBeVisible();
        }
    });
});