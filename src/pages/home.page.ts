import {Page} from '@playwright/test';
import {HeaderComponent} from '../components/header.component';
import {CategoryMenuComponent} from '../components/categoryMenu.component';

export class HomePage {
    readonly header: HeaderComponent;
    readonly categoryMenu: CategoryMenuComponent;

    constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
        this.categoryMenu = new CategoryMenuComponent(page);
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }
}