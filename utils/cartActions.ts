import {HomePage} from '../pageObjects/HomePage';
import {ProductPage} from '../pageObjects/ProductPage';

export const addProductToCart = async (homePage: HomePage, productPage: ProductPage, productName: string) => {
    await homePage.navigate();
    await homePage.closePopupIfAppears();
    await homePage.searchProduct(productName);
    await productPage.selectFirstProduct();
    await productPage.addToCart();
    await productPage.navigateToCart();
};