import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';
import {selectors} from "../../../selectors/selectors";

// Feature: Breadcrumbs Verification
// Ensures breadcrumbs are visible, reflect correct navigation paths, and are clickable.

test.describe('Breadcrumbs Verification', () => {
    const BASE_URL = config.use?.baseURL || 'https://shop.qaresults.com';
    if (!BASE_URL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    const CATEGORY_PAGE = `${BASE_URL}/smartphones/apple-iphone`;
    const PRODUCT_PAGE = `${BASE_URL}/smartphones/apple-iphone/apple-iphone-16-pro-128gb-black-titanium`;

    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
    });

    test('Verify breadcrumbs are visible on category page and clickable', async ({page}) => {
        await page.goto(CATEGORY_PAGE);

        // Verify breadcrumbs are visible
        const breadcrumbs = page.locator(selectors.breadcrumbs.container);
        await expect(breadcrumbs).toBeVisible();
        console.log('✅ Breadcrumbs are visible on the category page.');

        // Verify breadcrumb structure
        const breadcrumbItems = breadcrumbs.locator(selectors.breadcrumbs.items);
        const breadcrumbCount = await breadcrumbItems.count();
        expect(breadcrumbCount).toBeGreaterThan(1);
        console.log(`✅ Breadcrumbs contain ${breadcrumbCount} elements, confirming navigation path.`);

        // Click on the "Home" breadcrumb and verify navigation
        const homeBreadcrumb = breadcrumbs.locator(selectors.breadcrumbs.links).first();
        await homeBreadcrumb.click();
        await page.waitForURL(BASE_URL); // Explicitly wait for navigation
        await expect(page).toHaveURL(BASE_URL);
        console.log('✅ Clicking on breadcrumb navigates to the correct page.');
    });

    test('Verify breadcrumbs are visible on product page and reflect correct navigation path', async ({page}) => {
        await page.goto(PRODUCT_PAGE);

        // Verify breadcrumbs are visible
        const breadcrumbs = page.locator(selectors.breadcrumbs.container);
        await expect(breadcrumbs).toBeVisible();
        console.log('✅ Breadcrumbs are visible on the product page.');

        // Verify breadcrumb structure
        const breadcrumbItems = breadcrumbs.locator(selectors.breadcrumbs.items);
        const breadcrumbCount = await breadcrumbItems.count();
        expect(breadcrumbCount).toBeGreaterThan(1);
        console.log(`✅ Breadcrumbs contain ${breadcrumbCount} elements, confirming navigation path.`);

        // Click on the category breadcrumb and verify navigation
        const categoryBreadcrumb = breadcrumbItems.nth(1).locator(selectors.breadcrumbs.links);
        await categoryBreadcrumb.click();
        await page.waitForURL(CATEGORY_PAGE); // Explicitly wait for navigation
        await expect(page).toHaveURL(CATEGORY_PAGE);
        console.log('✅ Clicking category breadcrumb navigates correctly.');
    });
});
