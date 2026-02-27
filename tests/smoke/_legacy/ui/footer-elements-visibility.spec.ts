import {test, expect} from '@playwright/test';
import config from '../../../../playwright.config';
import {selectors} from '../../../../src/selectors/selectors';

// Feature: Footer Elements Verification
// This test suite ensures that essential footer elements (e.g., copyright, company details, and payment method icons) are present, visible, and styled correctly.

test.describe('Footer Elements Verification @smoke', () => {
    const BASE_URL = config.use?.baseURL || 'https://shop.qaresults.com';
    if (!BASE_URL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
    });

    test('Verify copyright information is visible and styled correctly', async ({page}) => {
        const copyrightInfo = page.locator(selectors.footer.copyright);
        await expect(copyrightInfo).toBeVisible();
        console.log('✅ Copyright information is visible.');

        const fontSize = await page.evaluate((element) => {
            if (element) {
                return window.getComputedStyle(element).fontSize;
            }
            return null;
        }, await copyrightInfo.elementHandle());

        if (fontSize) {
            expect(fontSize).toBe('14px');
            console.log(`✅ Copyright text has correct font size: ${fontSize}`);
        } else {
            throw new Error('❌ Failed to retrieve font size for copyright information.');
        }
    });

    test('Verify company details are visible in the footer', async ({page}) => {
        const companyDetails = page.locator(selectors.footer.companyDetails);
        await expect(companyDetails).toBeVisible();
        console.log('✅ Company details are visible in the footer.');
    });

    test('Verify payment method icons are present and visible', async ({page}) => {
        const paymentIcons = page.locator(selectors.footer.paymentIcons);
        const iconCount = await paymentIcons.count();
        expect(iconCount).toBeGreaterThan(0);
        console.log(`✅ Found ${iconCount} payment method icons.`);

        for (let i = 0; i < iconCount; i++) {
            const icon = paymentIcons.nth(i);
            await expect(icon).toBeVisible();
            console.log(`✅ Payment method icon ${i + 1} is visible.`);
        }
    });
});