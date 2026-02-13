import {HomePage} from '../pages/HomePage';
import {ProductPage} from '../pages/ProductPage';

export const searchAndAddProductToCart = async (homePage: HomePage, productPage: ProductPage, productName: string) => {
    await homePage.navigateTo('/');
    await homePage.closePopupIfAppears();
    await homePage.searchProduct(productName);
    await productPage.selectFirstProduct();
    await productPage.addToCart();
    await productPage.navigateToCart();
};