import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';

test.describe('Promotional Banners/Pop-ups Verification @smoke', () => {
    const baseURL = config.use?.baseURL || '';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    test.beforeEach(async ({page}) => {
        await page.goto(baseURL);
    });

    test.skip('Verify promotional banner is displayed', async ({page}) => {
        // Locate the promotional banner
        const promoBanner = page.locator('.promo-banner, .promotional-popup');

        // Verify the banner is visible
        await expect(promoBanner).toBeVisible();
        console.log('Promotional banner is visible.');
    });

    test.skip('Verify promotional pop-up can be dismissed', async ({page}) => {
        // Locate the promotional pop-up
        const promoPopup = page.locator('.promotional-popup');

        if (await promoPopup.isVisible()) {
            console.log('Promotional pop-up is displayed.');

            // Locate the close button for the pop-up
            const closeButton = promoPopup.locator('.close-button');
            await expect(closeButton).toBeVisible();

            await closeButton.click();

            // Verify the pop-up is no longer visible
            await expect(promoPopup).not.toBeVisible();
            console.log('Promotional pop-up was dismissed successfully.');
        } else {
            console.log('No promotional pop-up displayed.');
        }
    });

    test.skip('Verify promotional banner links are functional', async ({page}) => {
        // Locate links within the promotional banner
        const bannerLinks = page.locator('.promo-banner a');

        // Ensure at least one link is present
        const linkCount = await bannerLinks.count();
        expect(linkCount).toBeGreaterThan(0);

        // Verify each link is functional
        for (let i = 0; i < linkCount; i++) {
            const link = bannerLinks.nth(i);
            const href = await link.getAttribute('href');

            expect(href).toBeTruthy(); // Ensure href attribute exists
            console.log(`Verifying link: ${href}`);

            // Click the link and verify navigation
            await Promise.all([
                page.waitForNavigation(),
                link.click(),
            ]);

            const currentURL = page.url();
            expect(currentURL).toContain(href);
            console.log(`Successfully navigated to ${currentURL}.`);

            await page.goto(baseURL);
        }
    });
});