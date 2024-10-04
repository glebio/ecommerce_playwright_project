import {Page} from '@playwright/test';

export async function waitForElement(page: Page, selector: string) {
    await page.waitForSelector(selector);
}

export async function clickElement(page: Page, selector: string) {
    await waitForElement(page, selector);
    await page.locator(selector).click();
}