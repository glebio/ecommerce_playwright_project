export const selectors = {
    homePage: {
        searchBox: '#text-search',
        searchButton: '#sp-btn-search',
    },
    productPage: {
        listViewButton: "#list-view",
        productListItem: "div[class='custom-category'] div[class='row']",
        addToCartButton: 'button.add-to-cart',
        cartLink: 'a[href="/cart"]',
    },
    cartPage: {
        cartItem: '.cart-item:has-text("laptop")',
    },
    popup: {
        closeButton: '#popup2 > span > span',
    },
};