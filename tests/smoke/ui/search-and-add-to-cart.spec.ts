import {test, expect} from '@playwright/test';
import {HomePage} from '../../../src/pages/HomePage';
import {ProductPage} from '../../../src/pages/ProductPage';
import {CheckoutPage} from '../../../src/pages/CheckoutPage';
import {OrderSuccessPage} from '../../../src/pages/OrderSuccessPage';
import {searchAndAddProductToCart} from '../../../src/utils/cartActions';
import {generateAddressData} from '../../../src/utils/addressUtils';
import {selectors} from '../../../src/selectors/selectors';

test('Smoke: Add product to the cart and proceed to checkout @smoke', async ({page}) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderSuccessPage = new OrderSuccessPage(page);

    await searchAndAddProductToCart(homePage, productPage, 'iphone');

    const cartItem = page.locator(selectors.cartPage.cartItem);
    await expect(cartItem).toBeVisible();

    await checkoutPage.proceedToCheckout();
    await checkoutPage.selectGuestCheckout();
    const addressData = generateAddressData();
    await checkoutPage.fillAddressForm(addressData);
    await checkoutPage.selectDeliveryMethod();
    await checkoutPage.selectPaymentMethod();
    await checkoutPage.confirmMethod();

    await orderSuccessPage.verifyOrderSuccessMessage();
});
