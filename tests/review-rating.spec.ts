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

    // Step 1: Navigate to homepage
    await homePage.navigateTo('/');

    // Step 2: Search for the product and navigate to the product page
    await homePage.searchProduct('iPhone');
    await productPage.selectFirstProduct();

    // Step 3: Navigate to the reviews tab
    await productPage.openReviewTab();

    // Step 4: Fill in the review details and submit
    await reviewPage.submitReview({
        name: 'John Doe',
        review: 'This is an excellent product! Highly recommended.',
        rating: 5
    });

    // Step 5: Verify the success message is displayed
    const successMessage = page.locator('div.alert-success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText(" Thank you for your review. It has been submitted to the webmaster for approval.");

    // Step 6: Navigate to the admin page to approve the review
    await adminPage.navigateToAdminLogin();
    await adminPage.loginAsAdmin('admin', 'password'); // Replace with actual credentials
    await adminPage.navigateToReviewsSection();
    await adminPage.approveReview('John Doe');

    // Step 7: Navigate back to the product page and verify the review is visible
    await homePage.navigateTo('/');
    await homePage.searchProduct('iPhone');
    await productPage.selectFirstProduct();
    await productPage.openReviewTab();

    const approvedReview = page.locator('div.review').filter({hasText: 'This is an excellent product! Highly recommended.'});
    await expect(approvedReview).toBeVisible();
});