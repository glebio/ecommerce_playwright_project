import {test, expect} from '@playwright/test';
import {HomePage} from '../../pageObjects/HomePage';
import {faker} from '@faker-js/faker';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

test.describe('Tests for User registration and login flow.', () => {
    test('User registration and login flow', async ({page}) => {
        const homePage = new HomePage(page);

        // Generate random user data using faker
        const userData: UserData = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: `user${faker.string.numeric(5)}@qaresults.com`,
            phone: faker.phone.number(),
            password: faker.internet.password()
        };

        // Step 1: Navigate to the homepage and register with the random user data
        await homePage.navigateTo('/');
        await homePage.registerUser(userData);

        // Step 2: Navigate to the login page and login with the generated credentials
        await homePage.navigateToLogin();
        await homePage.loginUser(userData);

        // Step 3: Verify that the user is successfully logged in
        await expect(page.locator('text=Welcome')).toBeVisible();
    });
});
