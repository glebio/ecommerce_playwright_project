import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';
import {selectors} from "../../../selectors/selectors";

test.describe('Cart Icon Visibility and Dynamic Updates', () => {
    const baseURL = config.use?.baseURL || 'https://shop.qaresults.com';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    const addToCartButtonSelector = '.add-to-cart-button';
    const cartItemCountSelector = '.cart-item-count';

    test('Verify cart icon is always visible in the header', async ({page}) => {
        await page.goto(baseURL);
        const cartIcon = page.locator(selectors.productPage.cartButton);
        await expect(cartIcon).toBeVisible();
        console.log('✅ Cart icon is visible in the header.');
    });

    test('Verify cart dynamically updates when items are added', async ({page}) => {
        await page.goto(`${baseURL}/smartphones/apple-iphone/apple-iphone-16-pro-128gb-black-titanium`);

        const addToCartButton = page.locator(selectors.productPage.addToCartButton);
        await addToCartButton.click();

        const cartItemCount = page.locator(selectors.productPage.cartItemCountSelector);
        await expect(cartItemCount).toContainText('1');
        console.log('✅ Cart updated dynamically when an item was added.');

        await addToCartButton.click();
        await expect(cartItemCount).toContainText('2');
        console.log('✅ Cart updated dynamically to show 2 items.');
    });

    test('Verify cart count persists across pages', async ({page}) => {
        await page.goto(`${baseURL}/product-page`);
        const addToCartButton = page.locator(addToCartButtonSelector);
        await addToCartButton.click();

        await page.goto(`${baseURL}/another-page`);

        const cartItemCount = page.locator(cartItemCountSelector);
        await expect(cartItemCount).toHaveText('1');
        console.log('✅ Cart count persists across pages.');
    });
});