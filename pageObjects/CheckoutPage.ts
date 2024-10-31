import {Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class CheckoutPage {
    constructor(private page: Page) {
    }

    async proceedToCheckout() {
        await this.page.click(selectors.cartPage.checkoutButton);
    }

    async selectGuestCheckout() {
        await this.page.click(selectors.checkoutPage.guestCheckoutRadio);
        await this.page.click(selectors.checkoutPage.continueAccountButton);
    }

    async selectPaymentMethod() {
        await this.page.click(selectors.checkoutPage.termAndConditionsCheckbox);
        await this.page.click(selectors.checkoutPage.paymentMethodButton);
    }

    async fillAddressForm(addressData: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        address: string,
        city: string,
        postalCode: string,
        country: string,
        region: string
    }) {
        await this.page.fill(selectors.checkoutPage.firstNameInput, addressData.firstName);
        await this.page.fill(selectors.checkoutPage.lastNameInput, addressData.lastName);
        await this.page.fill(selectors.checkoutPage.lastNameInput, addressData.email);
        await this.page.fill(selectors.checkoutPage.lastNameInput, addressData.phone);
        await this.page.fill(selectors.checkoutPage.addressInput, addressData.address);
        await this.page.fill(selectors.checkoutPage.cityInput, addressData.city);
        await this.page.fill(selectors.checkoutPage.postalCodeInput, addressData.postalCode);
        await this.page.selectOption(selectors.checkoutPage.countrySelect, addressData.country);
        await this.page.selectOption(selectors.checkoutPage.regionSelect, addressData.region);
        await this.page.click(selectors.checkoutPage.continueBillingButton);
    }
}