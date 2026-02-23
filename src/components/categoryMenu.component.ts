import {Page, Locator, expect} from '@playwright/test';
import {selectors} from '../selectors/selectors';

export class CategoryMenuComponent {
    constructor(private readonly page: Page) {
    }

    private get openButton(): Locator {
        return this.page.locator(selectors.categoryMenu.openButton);
    }

    private get container(): Locator {
        return this.page.locator(selectors.categoryMenu.container);
    }

    async open(): Promise<void> {
        // Если меню уже видно — ничего не делаем
        if (await this.container.isVisible().catch(() => false)) return;

        await this.openButton.click();
        await expect(this.container).toBeVisible();
    }

    async openTopCategory(name: string): Promise<void> {
        await this.open();

        const link = this.page
            .locator(selectors.categoryMenu.itemLink)
            .filter({hasText: name})
            .first();

        await expect(link).toBeVisible();
        await link.click();
    }
}