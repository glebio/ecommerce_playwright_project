import {test, expect} from '@playwright/test';
import {HomePage} from '../pageObjects/HomePage';
import {ProductPage} from '../pageObjects/ProductPage';
import {waitForElement} from '../utils/viewUtils';
import {selectors} from '../selectors/selectors';

test('Smoke: Add product to the cart', async ({page}) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.navigate();
    await homePage.closePopupIfAppears();
    await homePage.searchProduct('iphone');
    await productPage.selectFirstProduct();
    await productPage.addToCart();
    await productPage.navigateToCart();
    await waitForElement(page, selectors.cartPage.cartItem);
    const cartItem = page.locator(selectors.cartPage.cartItem);
    await expect(cartItem).toBeVisible();
});