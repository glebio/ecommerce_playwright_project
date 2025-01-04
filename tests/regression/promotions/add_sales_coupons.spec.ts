import {test, expect} from '@playwright/test';
import {HomePage} from '../../../pageObjects/HomePage';
import {ProductPage} from '../../../pageObjects/ProductPage';
import {CheckoutPage} from '../../../pageObjects/CheckoutPage';
import {OrderSuccessPage} from '../../../pageObjects/OrderSuccessPage';
import {searchAndAddProductToCart} from '../../../utils/cartActions';
import {selectors} from '../../../selectors/selectors';

test('Smoke: Add sales coupon', async ({page}) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // Step 1: Search for product and add to cart
    await searchAndAddProductToCart(homePage, productPage, 'iphone');
    const cartItem = page.locator(selectors.cartPage.cartItem);
    await expect(cartItem).toBeVisible();

    // Step 2: Expand "Use Coupon Code" section
    await page.click(selectors.cartPage.couponCodeSection);

    // Step 3: Enter coupon code and apply
    await page.fill(selectors.cartPage.couponCodeInput, 'NY20');
    await page.click(selectors.cartPage.applyCouponButton);

    // Step 4: Verify discount is applied
    const discountRow = page.locator(selectors.cartPage.discountRow);
    await expect(discountRow).toBeVisible();
    await expect(discountRow).toContainText('$-199.80');
});