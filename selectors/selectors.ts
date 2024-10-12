export const selectors = {
    homePage: {
        searchBox: '#text-search',
        searchButton: '#sp-btn-search',
    },
    productPage: {
        listViewButton: "#list-view",
        productItem: "h4[class='product-name']",
        addToCartButton: '#button-cart',
        cartButton: '#cart',
        viewCartButton: 'p.cart-button a:nth-of-type(1)',
    },
    cartPage: {
        cartItem: "div[class='table-responsive']",
    },
    popup: {
        closeButton: '#popup2 > span > span',
    },
};