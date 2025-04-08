import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';
import {selectors} from '../../../selectors/selectors';

// Feature: Breadcrumbs Verification
// Ensures breadcrumbs are visible, reflect correct navigation paths, and are clickable.

test.describe('Breadcrumbs Verification @smoke', () => {
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

        // Step 1: Verify breadcrumbs container is visible
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
        await page.waitForURL(BASE_URL, {timeout: 5000}); // Wait for navigation with a timeout
        await expect(page).toHaveURL(BASE_URL);
        console.log('✅ Clicking on breadcrumb navigates to the correct page.');
    });

    test('Verify breadcrumbs are visible on product page and reflect correct navigation path', async ({page}) => {
        await page.goto(PRODUCT_PAGE);

        // Step 1: Verify breadcrumbs container is visible
        const breadcrumbs = page.locator(selectors.breadcrumbs.container);
        await expect(breadcrumbs).toBeVisible();
        console.log('✅ Breadcrumbs are visible on the product page.');

        // Step 2: Get breadcrumb items and ensure valid structure
        const breadcrumbItems = breadcrumbs.locator(selectors.breadcrumbs.items);
        const breadcrumbCount = await breadcrumbItems.count();
        expect(breadcrumbCount).toBeGreaterThan(1);
        console.log(`✅ Breadcrumbs contain ${breadcrumbCount} elements, confirming navigation path.`);

        // Step 3: Find the second breadcrumb (usually category) and click it
        const categoryBreadcrumb = breadcrumbItems.nth(2).locator('a');
        await expect(categoryBreadcrumb).toBeVisible();
        await categoryBreadcrumb.click();

        // Step 4: Verify navigation to category page
        await page.waitForURL(CATEGORY_PAGE, {timeout: 5000});
        await expect(page).toHaveURL(CATEGORY_PAGE);
        console.log('✅ Clicking category breadcrumb navigates correctly.');
    });
});