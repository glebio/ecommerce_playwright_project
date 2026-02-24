import {test, expect} from '@playwright/test';
import {HomePage} from '../../src/pages/home.page';

test.describe('@ci-smoke Sign In / Sign Up', () => {
    test('account dropdown shows login and register links', async ({page}) => {
        const home = new HomePage(page);
        await home.open();

        await test.step('Open account dropdown', async () => {
            await home.header.openAccountDropdown();
        });

        await test.step('Verify login and register links visible', async () => {
            await expect(home.header.loginLink).toBeVisible();
            await expect(home.header.registerLink).toBeVisible();
        });
    });

    test('login link navigates to login page', async ({page}) => {
        const home = new HomePage(page);
        await home.open();

        await home.header.openAccountDropdown();
        await home.header.loginLink.click();

        await expect(page).toHaveURL(/\/login/);
    });

    test('register link navigates to register page', async ({page}) => {
        const home = new HomePage(page);
        await home.open();

        await home.header.openAccountDropdown();
        await home.header.registerLink.click();

        await expect(page).toHaveURL(/\/register/);
    });
});