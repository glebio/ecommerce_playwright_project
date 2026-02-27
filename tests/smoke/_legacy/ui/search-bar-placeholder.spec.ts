import {test, expect} from '@playwright/test';
import config from '../../../../playwright.config';

test.describe('Search Bar Placeholder Verification @smoke', () => {
    const baseURL = config.use?.baseURL || '';
    if (!baseURL) {
        throw new Error('Base URL is not defined in the Playwright configuration.');
    }

    test('Verify placeholder text is present and correct', async ({page}) => {
        await page.goto(baseURL);
        const searchBar = page.locator('#text-search');
        const placeholderText = await searchBar.getAttribute('placeholder');
        console.log('Placeholder Text:', placeholderText);
        expect(placeholderText).toBe('Search entire store here ...'); // Update this with the actual expected placeholder text
    });

    test('Verify placeholder text styling', async ({page}) => {
        await page.goto(baseURL);
        const placeholderStyles = await page.evaluate(() => {
            const input = document.querySelector('#text-search') as HTMLElement | null;
            if (!input) {
                throw new Error('Search bar not found on the page');
            }
            const styles = window.getComputedStyle(input, '::placeholder');
            return {
                fontSize: styles.fontSize,
                color: styles.color,
            };
        });

        console.log('Placeholder Font Size:', placeholderStyles.fontSize);
        console.log('Placeholder Color:', placeholderStyles.color);

        // Validate styling
        expect(placeholderStyles.fontSize).toBe('14px');
        expect(placeholderStyles.color).toBe('rgb(177, 177, 177)');
    });
});