import {test, expect} from '@playwright/test';
import {HomePage} from '../pageObjects/HomePage';
import {ProductPage} from '../pageObjects/ProductPage';
import {addProductToCart} from '../utils/cartActions';
import {selectors} from '../selectors/selectors';

test('Smoke: Add product to the cart', async ({page}) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await addProductToCart(homePage, productPage, 'iphone');
    const cartItem = page.locator(selectors.cartPage.cartItem);
    await expect(cartItem).toBeVisible();
});