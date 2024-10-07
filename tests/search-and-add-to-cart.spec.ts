import {test, expect} from '@playwright/test';
import {HomePage} from '../pageObjects/HomePage';
import {ProductPage} from '../pageObjects/ProductPage';
import {waitForElement} from '../utils/viewUtils';
import {selectors} from '../selectors/selectors';

test('Smoke: Add product to the cart', async ({page}) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // Step 1: Navigate to the website
    await homePage.navigate();

    // Step 1.1: Close Popup If it Appears
    await homePage.closePopupIfAppears();

    // Step 2: Search for the product
    await homePage.searchProduct('iphone');

    // Step 3: Select the first product
    await productPage.selectFirstProduct();

    // Step 4: Add the product to the cart
    await productPage.addToCart();

    // Step 5: Navigate to the cart
    await productPage.navigateToCart();

    // Step 6: Verify the product is in the cart
    await waitForElement(page, selectors.cartPage.cartItem);
    const cartItem = page.locator(selectors.cartPage.cartItem);
    await expect(cartItem).toBeVisible();
});