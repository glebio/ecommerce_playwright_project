import {expect, Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class CartPage {
    constructor(private page: Page) {
    }

    async verifyProductInCart(productName: string) {
        const cartItem = this.page.locator(selectors.cartPage.cartItem).filter({hasText: productName});
        await expect(cartItem).toBeVisible();

        const cartItemText = await cartItem.innerText();
        console.log(`Product in cart: ${cartItemText}`);
    }

    async getCartItemCount(): Promise<number> {
        return await this.page.locator(selectors.cartPage.cartItem).count();
    }

    async removeProductFromCart(productName: string) {
        const cartItem = this.page.locator(selectors.cartPage.cartItem).filter({hasText: productName});
        // const removeButton = cartItem.locator(selectors.cartPage.removeButton);
        // await removeButton.click();
    }

    async proceedToCheckout() {
        await this.page.click(selectors.cartPage.checkoutButton);
        await this.page.waitForSelector(selectors.checkoutPage.guestCheckoutRadio);
    }
}
