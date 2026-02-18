import {test, expect} from '@playwright/test';
import {HomePage} from '../../src/pages/home.page';
import {PlpPage} from '../../src/pages/plp.page';
import {PdpPage} from '../../src/pages/pdp.page';
import {CartPage} from '../../src/pages/cart.page';

test('@ci-smoke search product, add to cart, verify cart item', async ({page}) => {
    const home = new HomePage(page);
    const plp = new PlpPage(page);
    const pdp = new PdpPage(page);
    const cart = new CartPage(page);

    await test.step('Search for product', async () => {
        await home.open();
        await home.header.search('iphone');
    });

    await test.step('Open first product from results', async () => {
        await plp.selectFirstProduct();
        await pdp.waitLoaded();
    });

    const productTitle = (await pdp.productTitle.textContent())?.trim() ?? '';
    expect(productTitle).not.toBe('');

    await test.step('Add to cart and navigate to cart', async () => {
        await pdp.addToCart();
        await pdp.header.goToCart();
        await cart.waitLoaded();
    });

    await test.step('Verify cart has correct item', async () => {
        await expect(cart.cartItems).toHaveCount(1);
        await expect(cart.itemNames.first()).toContainText(productTitle);
    });
});