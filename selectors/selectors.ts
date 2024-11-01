export const selectors = {
    homePage: {
        searchBox: '#text-search',
        searchButton: '#sp-btn-search',
        registerButton: '#a-register-link',
        loginButton: '#a-login-link',
    },
    productPage: {
        listViewButton: '#list-view',
        productItem: 'h4[class="product-name"]',
        addToCartButton: '#button-cart',
        cartButton: '#cart',
        viewCartButton: 'p.cart-button a:nth-of-type(1)',
    },
    cartPage: {
        cartItem: 'div[class="table-responsive"] tbody tr',
        checkoutButton: 'a[class="btn btn-primary"]',
    },
    checkoutPage: {
        guestCheckoutRadio: 'input[value="guest"]',
        continueAccountButton: '#button-account',
        firstNameInput: '#input-payment-firstname',
        lastNameInput: '#input-payment-lastname',
        emailInput: '#input-payment-email',
        phoneInput: '#input-payment-telephone',
        addressInput: '#input-payment-address-1',
        cityInput: '#input-payment-city',
        postalCodeInput: '#input-payment-postcode',
        countrySelect: '#input-payment-country',
        regionSelect: '#input-payment-zone',
        continueBillingButton: '#button-guest',
        termAndConditionsCheckbox: 'input[name="agree"]',
        paymentMethodButton: '#button-payment-method',
        deliveryMethodButton: '#button-shipping-method',
        confirmOrderButton: '#button-confirm',
    },
    popup: {
        closeButton: '#popup2 > span > span',
    },
    registerPopup: {
        popupContainer: 'div[class="register-form-content"]',
        firstNameInput: '#input-firstname',
        lastNameInput: '#input-lastname',
        emailInput: '#input-register-email',
        phoneInput: '#input-telephone',
        passwordInput: '#input-register-password',
        confirmPasswordInput: '#input-confirm',
        privacyPolicyCheckbox: 'input[name="agree"]',
        submitButton: 'input[onclick="ocajaxlogin.registerAction();"]',
        successPopup: '//div[@class="account-success"]',
        continueButton: '(//button[@class="button" and span[text()="Continue"]])[1]',
    },
    loginPopup: {
        popupContainer: 'div[class="login-form-content"]',
        emailInput: '#input-login-email',
        passwordInput: '#input-login-password',
        submitButton: '#login-submit',
    },
    common: {
        addToCartButton: '#button-cart',
    }
};

