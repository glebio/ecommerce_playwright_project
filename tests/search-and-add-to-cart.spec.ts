import {test, expect} from '@playwright/test';
import {HomePage} from '../pageObjects/HomePage';
import {ProductPage} from '../pageObjects/ProductPage';
import {CheckoutPage} from '../pageObjects/CheckoutPage';
import {OrderSuccessPage} from '../pageObjects/OrderSuccessPage';
import {searchAndAddProductToCart} from '../utils/cartActions';
import {generateAddressData} from '../utils/addressUtils';
import {selectors} from '../selectors/selectors';

test('Smoke: Add product to the cart and proceed to checkout', async ({page}) => {
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
