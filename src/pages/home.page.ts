import {Page} from '@playwright/test';
import {HeaderComponent} from '../components/header.component';

export class HomePage {
    readonly header: HeaderComponent;

    constructor(private page: Page) {
        this.header = new HeaderComponent(page);
    }

    async open() {
        await this.page.goto('/');
    }
}