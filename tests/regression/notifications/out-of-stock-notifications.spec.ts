import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';
import {selectors} from '../../../src/selectors/selectors';

test.describe('Out-of-Stock Notifications @regression', () => {
    const BASE_URL = config.use?.baseURL || 'https://shop.qaresults.com';

    if (!BASE_URL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    const OUT_OF_STOCK_PRODUCT_URL = `${BASE_URL}/out-of-stock-product`;

    test.beforeEach(async ({page}) => {
        await page.goto(OUT_OF_STOCK_PRODUCT_URL);
    });

    test('Verify "Out of Stock" message is displayed', async ({page}) => {
        const outOfStockMessage = page.locator(selectors.productPage.outOfStockMessage);
        await expect(outOfStockMessage).toBeVisible();
        await expect(outOfStockMessage).toContainText('Out of Stock');
        console.log('✅ "Out of Stock" message is correctly displayed.');
    });

    test('Verify "Notify Me" button is present and clickable', async ({page}) => {
        const notifyMeButton = page.locator(selectors.productPage.notifyMeButton);
        await expect(notifyMeButton).toBeVisible();
        await notifyMeButton.click();
        console.log('✅ "Notify Me" button is visible and clickable.');
    });

    test('Verify users can sign up for notifications', async ({page}) => {
        const emailInput = page.locator(selectors.productPage.notifyMeEmailInput);
        const submitButton = page.locator(selectors.productPage.notifyMeSubmitButton);

        // Enter email and submit
        await emailInput.fill('testuser@example.com');
        await submitButton.click();

        // Verify success message appears
        const successMessage = page.locator(selectors.productPage.notifyMeSuccessMessage);
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('You will be notified when this product is back in stock.');
        console.log('✅ User successfully signed up for out-of-stock notifications.');
    });
});