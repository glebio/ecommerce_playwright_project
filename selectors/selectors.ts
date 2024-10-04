export const selectors = {
    homePage: {
        searchBox: 'input[name="q"]',
        searchButton: 'button[type="submit"]',
    },
    productPage: {
        productListItem: '.product-list-item',
        addToCartButton: 'button.add-to-cart',
        cartLink: 'a[href="/cart"]',
    },
    cartPage: {
        cartItem: '.cart-item:has-text("laptop")',
    },
};