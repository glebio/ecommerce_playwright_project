export const selectors = {
    homePage: {
        searchBox: '#text-search',
        searchButton: '#sp-btn-search',
        registerButton: '#a-register-link', // Selector for the Register button on the homepage
    },
    productPage: {
        listViewButton: '#list-view',
        productItem: 'h4[class="product-name"]',
        addToCartButton: '#button-cart',
        cartButton: '#cart',
        viewCartButton: 'p.cart-button a:nth-of-type(1)',
    },
    cartPage: {
        cartItem: 'div[class="table-responsive"]',
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
    },
    common: {
        addToCartButton: '#button-cart',
    }
};
