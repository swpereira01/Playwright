import { expect, Page } from '@playwright/test';
import { Homepage } from './Homepage';

export class Browse extends Homepage {
    readonly header;

    constructor(page: Page) {
        super(page)
        this.goToUrl = 'https://sweetshop.vivrichards.co.uk/sweets';
        this.header = this.page.locator('h1');
    }
    async goto() {
        await this.page.goto(this.goToUrl, { waitUntil: "networkidle" });
        await (this.header).waitFor({ state: 'attached' });
    }
    async verifyUrl() {
        await expect(this.page).toHaveURL('https://sweetshop.vivrichards.co.uk/sweets');
    }
    async verifyHeader() {
        await expect(this.header).toHaveText('Browse sweets')
    }
}