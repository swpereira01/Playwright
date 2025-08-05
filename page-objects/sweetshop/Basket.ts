import { expect, type Locator, type Page } from '@playwright/test';
import { Homepage } from './Homepage';

export class Basket extends Homepage {
    readonly header;

    constructor(page: Page) {
        super(page)
        this.goToUrl = 'https://sweetshop.vivrichards.co.uk/basket';
        this.header = this.page.locator('h1');
    }
    async goto() {
        await this.page.goto(this.goToUrl, { waitUntil: "networkidle" });
        await (this.header).waitFor({ state: 'attached' });
    }
    async verifyUrl() {
        await expect(this.page).toHaveURL('https://sweetshop.vivrichards.co.uk/basket');
    }
    async verifyHeader() {
        await expect(this.header).toHaveText('Your Basket');
    }
}