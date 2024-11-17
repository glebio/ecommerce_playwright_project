import {expect, test} from '@playwright/test';
import {HomePage} from '../pageObjects/HomePage';
import {ProductPage} from '../pageObjects/ProductPage';
import {ReviewPage} from '../pageObjects/ReviewPage';
import {AdminPage} from '../pageObjects/AdminPage';

// Test to verify adding a review for a product
test('Add a review: Verify the review submission process', async ({page}) => {
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
    await expect(successMessage).toContainText(" Thank you for your review. It has been submitted to the webmaster for approval.");

    // Navigate to the admin page to approve the review
    await adminPage.navigateToAdminLogin();
    await adminPage.loginAsAdmin();
    await adminPage.navigateToReviewsSectionAndEdit(reviewData.name);
    await adminPage.approveReview();

    // Navigate back to the product page and verify the review is visible
    await homePage.navigateTo('/');
    await homePage.searchProduct('iPhone');
    await productPage.selectFirstProduct();
    await productPage.openReviewTab();
    await productPage.approvedReviewCheck()
});