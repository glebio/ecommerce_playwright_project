import {Page} from '@playwright/test';
import {selectors} from '../../selectors/selectors';

export class ReviewPage {
    constructor(private page: Page) {
    }

    async submitReview(reviewData: { name: string; review: string; rating: number }) {
        await this.page.fill(selectors.productPage.reviewNameInput, reviewData.name);
        await this.page.fill(selectors.productPage.reviewTextInput, reviewData.review);

        const ratingInput = selectors.productPage.reviewRatingInput(reviewData.rating.toString());
        await this.page.waitForSelector(ratingInput, {state: 'visible'});
        await this.page.check(ratingInput);

        await this.page.click(selectors.productPage.reviewSubmitButton);
    }

    async verifyReviewSubmission() {
        const successMessage = this.page.locator(selectors.productPage.reviewSuccessMessage);
        await successMessage.waitFor({state: 'visible'});
    }
}
