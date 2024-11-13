import {Page} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class ReviewPage {
    constructor(private page: Page) {
    }

    async openReviewTab() {
        await this.page.click(selectors.productPage.reviewTab);
        await this.page.waitForSelector(selectors.productPage.reviewForm);
    }

    async fillReviewForm(name: string, review: string, rating: number) {
        await this.page.fill(selectors.productPage.reviewNameInput, name);
        await this.page.fill(selectors.productPage.reviewTextInput, review);
        await this.page.check(selectors.productPage.reviewRatingInput(rating));
    }

    async submitReview(reviewData: { name: string; review: string; rating: number }) {
        // Заполняем поле "Name"
        await this.page.fill(selectors.productPage.reviewNameInput, reviewData.name);

        // Заполняем поле "Your Review"
        await this.page.fill(selectors.productPage.reviewTextInput, reviewData.review);

        // Устанавливаем рейтинг
        await this.page.click(selectors.productPage.reviewRating.replace('{rating}', reviewData.rating.toString()));

        // Нажимаем на кнопку "Continue" для отправки отзыва
        await this.page.click(selectors.productPage.reviewSubmitButton);
    }


    async verifyReviewSubmission() {
        const successMessage = this.page.locator(selectors.productPage.reviewSuccessMessage);
        await successMessage.waitFor({state: 'visible'});
    }
}
