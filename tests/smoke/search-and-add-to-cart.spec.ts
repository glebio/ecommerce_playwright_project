import {test} from '@playwright/test';
import {HomePage} from '../../src/pages/home.page';
import {PlpPage} from '../../src/pages/plp.page';
import {PdpPage} from '../../src/pages/pdp.page';
import {CartPage} from '../../src/pages/cart.page';

test('@ci-smoke search product, add to cart, verify cart item', async ({page}) => {
    const home = new HomePage(page);
    const plp = new PlpPage(page);
    const pdp = new PdpPage(page);
    const cart = new CartPage(page);

    await home.open();
    await home.header.search('iphone');

    await plp.selectFirstProduct();
    await pdp.waitLoaded();

    await pdp.addToCart();
    await pdp.header.goToCart();
    await cart.waitLoaded();
});