export const selectors = {
    homePage: {
        searchBox: '#text-search',
        searchButton: '#sp-btn-search',
    },
    productPage: {
        listViewButton: '#list-view',
        productItem: 'h4[class="product-name"]',
        addToCartButton: '#button-cart',
    },
    cartPage: {
        cartItem: 'div[class="table-responsive"] tbody tr',
        checkoutButton: 'a[class="btn btn-primary"]', // Селектор для кнопки "Checkout"
    },
    checkoutPage: {
        guestCheckoutRadio: '#guestCheckout', // Селектор для радиокнопки "Guest Checkout"
        continueButton: 'input[value="Continue"]', // Селектор для кнопки "Continue"
        firstNameInput: '#input-payment-firstname',
        lastNameInput: '#input-payment-lastname',
        addressInput: '#input-payment-address-1',
        cityInput: '#input-payment-city',
        postalCodeInput: '#input-payment-postcode',
        countrySelect: '#input-payment-country',
        regionSelect: '#input-payment-zone',
    }
};
