import {expect, test} from '@playwright/test';
import {HomePage} from '../../../src/pages/HomePage';
import {ProductPage} from '../../../src/pages/ProductPage';
import {ReviewPage} from '../../../src/pages/ReviewPage';
import {AdminPage} from '../../../src/pages/AdminPage';

test.describe('Product Review Submission and Approval @regression', () => {

    test('Add a review: Verify the review submission and approval process', async ({page}) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const reviewPage = new ReviewPage(page);
        const adminPage = new AdminPage(page);

        const reviewData = {
            name: 'John Doe',
            review: 'This is an excellent product! Highly recommended.',
            rating: 5
        };

        await homePage.navigateTo('/');
        await homePage.searchProduct('iPhone');
        await productPage.selectFirstProduct();
        await productPage.openReviewTab();
        await reviewPage.submitReview(reviewData);

        const successMessage = page.locator('div.alert-success');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText(
            "Thank you for your review. It has been submitted to the webmaster for approval."
        );

        await adminPage.navigateToAdminLogin();
        await adminPage.loginAsAdmin();
        await adminPage.navigateToReviewsSectionAndEdit(reviewData.name);
        await adminPage.approveReview();

        await homePage.navigateTo('/');
        await homePage.searchProduct('iPhone');
        await productPage.selectFirstProduct();
        await productPage.openReviewTab();
        await productPage.approvedReviewCheck();

        console.log('✅ Review successfully submitted, approved, and displayed on the product page.');
    });

});