export const selectors = {
    homePage: {
        logo: '#logo a',
        logoImage: '#logo img',
        searchBox: '#text-search',
        searchButton: '#sp-btn-search',
        accountButton: 'a.dropdown-toggle[title="My Account"]',
        registerButton: '#pt-register-link',
        loginButton: '#pt-login-link',
        logoutButton: '#pt-logout-link',
        browseCategoriesButton: 'div[class="oc-menu-bar"]',
        categoryLink: (categoryName: string) => `a:has-text("${categoryName}")`,
        subCategoryLink: (subCategoryName: string) => `a:has-text("${subCategoryName}")`,
        menuContainer: 'div.vertical-menu .ul-top-items',
        menuItems: 'div.vertical-menu .ul-top-items li.li-top-item',
        menuItemByText: (text: string) =>
            `div.vertical-menu .ul-top-items li.li-top-item:has-text("${text}")`,
        menuLinks: 'div.vertical-menu .ul-top-items li.li-top-item a',
    },

    productPage: {
        listViewButton: '#list-view',
        productItem: '.product-item h4',
        productPrice: 'p[class="price"]',
        addToCartButton: '#button-cart',
        cartButton: '#cart',
        viewCartButton: '//p[@class="text-right"]/a[1]',
        // filterOption: (filterValue: string) => `input[type="checkbox"][value="${filterValue}"]`,
        sortingDropdown: 'select#input-sort',
        // sortingOption: (sortingValue: string) => `option[value="${sortingValue}"]`,
        reviewTab: 'a[href="#tab-review"]',
        reviewNameInput: '#input-name',
        reviewTextInput: '#input-review',
        reviewRatingInput: (ratingValue: string) => `input[name="rating"][value="${ratingValue}"]`,
        reviewSubmitButton: '#button-review',
        productList: '.product-list',
        cartItemCountSelector: '#cart-total',
        productName: '.product-layout .caption h4 a',
        reviewForm: 'form#form-review',
        reviewSuccessMessage: 'div.alert-success',
        relatedProductsSection: '.related-products',
        productItemLink: '.product-item a',
        productTitle: '.inner h1',
        approvedReview: '//td[@colspan="2"]/p[contains(text(),"This is an excellent product! Highly recommended.")]',
        outOfStockMessage: '.out-of-stock-notice',
        notifyMeButton: '.notify-me-button',
        notifyMeEmailInput: 'input[name="notify-email"]',
        notifyMeSubmitButton: 'button.notify-submit',
        notifyMeSuccessMessage: '.notify-success-message',
    },

    cartPage: {
        root: '#checkout-cart',
        cartItem: 'div[class="table-responsive"] tbody tr',
        cartItemName: 'div[class="table-responsive"] tbody td.text-left a',

        checkoutButton: 'a[class="btn btn-primary"]',
        couponCodeInput: '#input-coupon',
        applyCouponButton: 'input[value="Apply Coupon"]',
        discountRow: '//td[@class="text-right" and strong[contains(text(), "Coupon (NY20)")]]/following-sibling::td[contains(text(), "$-199.80")]',
        couponCodeSection: '//div[contains(@class, "panel-heading")]//a[contains(text(), "Use Coupon Code")]',
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

    categoryMenu: {
        openButton: 'div[class="oc-menu-bar"]',
        container: 'div.vertical-menu .ul-top-items',
        itemLink: 'div.vertical-menu .ul-top-items li.li-top-item a',
    },

    categoryPage: {
        root: '#content',
        productCard: '.product-layout',
    },

    orderSuccessPage: {
        successMessage: '//div[@id="content"]/p[1]',
    },

    popups: {
        closeButton: '#popup2 > span > span',
        registerPopup: {
            popupContainer: 'div[class="account-register"]',
            firstNameInput: '#input-firstname',
            lastNameInput: '#input-lastname',
            emailInput: '#input-register-email',
            phoneInput: '#input-telephone',
            passwordInput: '#input-register-password',
            confirmPasswordInput: '#input-confirm',
            privacyPolicyCheckbox: 'input[name="agree"]',
            submitButton: 'input.btn.btn-primary[value="Continue"]',
            successPopup: '//div[@class="account-success"]',
            continueButton: '(//button[@class="button" and span[text()="Continue"]])[1]',
        },
        loginPopup: {
            popupContainer: 'div[class="login-form-content"]',
            emailInput: '#input-email',
            passwordInput: '#input-password',
            submitButton: 'button.button.btn:has-text("Login")',
        },
    },

    loginPage: {
        loginForm: 'form[action*="/login"]',
        emailField: 'input[id="input-email"]',
        passwordField: 'input[type="password"]',
        submitButton: 'input[type="submit"]',
    },

    registerPage: {
        registerForm: 'form[action*="/register"]',
        firstNameField: '#input-firstname',
        lastNameField: '#input-lastname',
        emailField: '#input-email',
        telephoneField: '#input-telephone',
        passwordField: '#input-password',
        confirmPasswordField: '#input-confirm',
        submitButton: 'input[value="Continue"]',
        privacyCheckbox: 'input[name="agree"]'
    },

    filtersPage: {
        categoryLink: (categoryName: string) => `a[href*="${categoryName}"]`,
        categoryHeader: (categoryName: string) => `h1:has-text("${categoryName}")`,
        filterDropdown: (filterName: string) => `div.filter-dropdown[data-filter="${filterName}"]`,
        productItem: 'h4[class="product-name"]',
        sortingDropdown: 'select#input-sort',
        // sortingOption: (sortBy: string, order: string) => `select#input-sort option[value*="sort=${sortBy}&order=${order}"]`,
        // filterOption: (filterName: string, filterOption: string) =>
        //     `div[data-filter="${filterName}"] input[value="${filterOption}"]`,
        // getFilterBlock: (filterName: string) =>
        //     `div.list-group-item.ocfilter-option:has-text("${filterName}")`,
        getFilterOption: (filterName: string, filterOption: string) =>
            `div.list-group-item.ocfilter-option:has-text("${filterName}") .ocf-option-values label:has-text("${filterOption}")`,
        showProductsPopup: 'div.popover-content > button.btn.btn-primary:not(.disabled):has-text("Show")',
    },

    adminPage: {
        loginUsernameInput: '#input-username',
        loginPasswordInput: '#input-password',
        loginButton: 'button[type="submit"]',
        navigationMenu: 'nav#menu',
        catalogMenu: 'a:has-text("Catalog")',
        reviewsMenu: 'a:has-text("Reviews")',
        reviewApproveButton: 'button[data-original-title="Approve"]',
        catalogDropdown: '#menu-catalog',
        reviewsLink: '//li/a[text()="Reviews"]',
        reviewEditButton: (authorName: string) =>
            `//tr[td[text()="${authorName}"]]//td[@class="text-right"]/a[contains(@class, "btn-primary")]`,
    },
    breadcrumbs: {
        container: '.breadcrumbs',
        items: 'ul.breadcrumb li',
        links: 'ul.breadcrumb li a',
    },
    footer: {
        links: 'footer a',
        socialMediaIcons: '.social a',
        copyright: 'p.text-powered',
        companyDetails: 'p.txt_info',
        paymentIcons: '.footer-copyright .payment img',
    },
    errorPage: {
        errorMessage: '#content p',
        continueButton: '#content .buttons .btn-primary',
        notFoundMessage: 'h1:has-text("Page Not Found")',
        errorContainer: '.error-container',
    },
    loaders: {
        generalLoader: '.grid-style .swiper-lazy-preloader',
        spinner: '.loading-spinner',
        progressBar: '.progress-bar',
    },

    common: {
        addToCartButton: '#button-cart',
    },
};