import { expect, type Locator, Page } from '@playwright/test';

export class Homepage {
    readonly page: Page;
    goToUrl: string = 'https://rahulshettyacademy.com/seleniumPractise/#/';

    constructor(page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto(this.goToUrl);
    }
}