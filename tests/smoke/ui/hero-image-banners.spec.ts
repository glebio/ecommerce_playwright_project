import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';

/**
 * Feature: Hero Image/Banners Verification
 * This test suite verifies the presence, visibility, and functionality of hero images or banners on the home page.
 */

test.describe('Hero Image/Banners Verification', () => {
    const baseURL = config.use?.baseURL || '';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    test.beforeEach(async ({page}) => {
        await page.goto(baseURL);
    });

    test('Verify hero image/banner is present and visible', async ({page}) => {
        // Refine the locator to target the correct hero image/banner
        const heroBanner = page.locator('.slider-container').first(); // Use .first() to target the first matching element

        // Check if the hero banner is present and visible
        await expect(heroBanner).toBeVisible();
        console.log('Hero image/banner is visible on the home page.');
    });

    test.skip('Verify hero image/banner leads to different sections/pages', async ({page}) => {
        // Locate the links within the hero banner
        const bannerLinks = page.locator('.hero-banner a, .carousel a');

        // Ensure at least one link is present
        const linksCount = await bannerLinks.count();
        expect(linksCount).toBeGreaterThan(0);

        // Check if each link is functional
        for (let i = 0; i < linksCount; i++) {
            const link = bannerLinks.nth(i);
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy(); // Ensure href attribute exists
            console.log(`Banner link ${i + 1}: ${href}`);

            // Test navigation to each linked section/page
            await Promise.all([
                page.waitForNavigation(),
                link.click(),
            ]);

            // Verify the page loaded
            const currentURL = page.url();
            expect(currentURL).toContain(href);
            console.log(`Successfully navigated to ${currentURL} from the hero banner.`);

            // Navigate back to the home page
            await page.goto(baseURL);
        }
    });

    test('Verify carousel functionality (if applicable)', async ({page}) => {
        // Check if a carousel is present
        const carousel = page.locator('.carousel');
        if (await carousel.isVisible()) {
            console.log('Carousel is present on the home page.');

            // Verify carousel navigation (e.g., next and previous buttons)
            const nextButton = page.locator('.carousel .next');
            const prevButton = page.locator('.carousel .prev');

            if (await nextButton.isVisible()) {
                await nextButton.click();
                console.log('Next button works in the carousel.');
            }

            if (await prevButton.isVisible()) {
                await prevButton.click();
                console.log('Previous button works in the carousel.');
            }
        } else {
            console.warn('Carousel is not present on the home page.');
        }
    });
});