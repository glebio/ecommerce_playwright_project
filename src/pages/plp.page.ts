import {Page} from '@playwright/test';
import {HeaderComponent} from '../components/header.component';

export class PlpPage {
    readonly header: HeaderComponent;

    constructor(private page: Page) {
        this.header = new HeaderComponent(page);
    }

    async open(category: string = '/smartphones-and-accessories') {
        await this.page.goto(category);
    }
}