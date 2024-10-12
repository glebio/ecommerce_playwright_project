import {expect, Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';
import {waitForElement} from '../utils/viewUtils';

export class CartPage {
    constructor(private page: Page) {
    }

    async verifyProductInCart(productName: string) {
        await waitForElement(this.page, selectors.cartPage.cartItem);

        const cartItem = this.page.locator(selectors.cartPage.cartItem).filter({hasText: productName});

        const cartItemText = await cartItem.innerText();
        console.log(`Product in cart: ${cartItemText}`);

        await expect(cartItem).toBeVisible();
    }

    async getCartItemCount(): Promise<number> {
        await waitForElement(this.page, selectors.cartPage.cartItem);
        return await this.page.locator(selectors.cartPage.cartItem).count();
    }


    async removeProductFromCart(productName: string) {
        const cartItem = this.page.locator(selectors.cartPage.cartItem).filter({hasText: productName});
        // const removeButton = cartItem.locator(selectors.cartPage.removeButton);
        // await removeButton.click();
    }
}
