import {test, expect} from '@playwright/test';
import config from '../../../playwright.config';
import {selectors} from '../../../src/selectors/selectors';

// Feature: Product Recommendations Verification
// Verify that the "Related Products" or "You May Also Like" sections display appropriate items.

test.describe('Product Recommendations Verification @regression', () => {
    const BASE_URL = config.use?.baseURL || 'https://shop.qaresults.com';

    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
    });

    test('Verify "Related Products" section is visible and populated', async ({page}) => {
        // Navigate to a product page
        await page.goto(`${BASE_URL}/smartphones/apple-iphone/apple-iphone-16-pro-128gb-black-titanium`);

        // Locate the "Related Products" section
        const relatedProductsSection = page.locator(selectors.productPage.relatedProductsSection);

        // Verify the section is visible
        await expect(relatedProductsSection).toBeVisible();

        // Verify that it contains at least one product
        const relatedProducts = relatedProductsSection.locator(selectors.productPage.productItem);
        const count = await relatedProducts.count();
        expect(count).toBeGreaterThan(0);

        console.log(`✅ Related Products section contains ${count} items.`);
    });

    test('Verify recommended products are clickable and lead to product pages', async ({page}) => {
        await page.goto(`${BASE_URL}/smartphones/apple-iphone/apple-iphone-16-pro-128gb-black-titanium`);

        // Locate recommended products
        const recommendedProducts = page.locator(selectors.productPage.relatedProductsSection)
            .locator(selectors.productPage.productItemLink);

        const count = await recommendedProducts.count();
        expect(count).toBeGreaterThan(0);

        // Click the first recommended product
        const firstProduct = recommendedProducts.first();
        const productName = await firstProduct.innerText();
        await firstProduct.click();

        // Verify navigation to the clicked product page
        await expect(page).toHaveURL(/.*\/smartphones\/apple-iphone\/.*/);
        const productTitle = page.locator(selectors.productPage.productTitle);
        await expect(productTitle).toContainText(productName);

        console.log(`✅ Clicking on recommended product navigates correctly to: ${productName}`);
    });
});