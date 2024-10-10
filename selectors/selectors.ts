export const selectors = {
    homePage: {
        searchBox: '#text-search',
        searchButton: '#sp-btn-search',
    },
    productPage: {
        listViewButton: "#list-view",
        productItem: "h4[class='product-name']",
        addToCartButton: '#button-cart',
        cartLink: '#cart',
        cartLink2: 'html > body > div:nth-of-type(1) > header > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(3) > ul > li:nth-of-type(2) > p > a:nth-of-type(1)',
    },
    cartPage: {
        cartItem: '.cart-item:has-text("laptop")',
    },
    popup: {
        closeButton: '#popup2 > span > span',
    },
};