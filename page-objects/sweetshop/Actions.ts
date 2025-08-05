import { expect, type Locator, type Page } from '@playwright/test';

export class Actions {
    readonly page;
    readonly browseSweetsButton;
    readonly addBonBons;
    readonly addJellies;
    readonly navigateToBasketButton;
    readonly basket;
    readonly basketItems;
    constructor(page: Page) {
        this.page = page;
        this.addBonBons = this.page.locator('div:nth-child(4) > .card > .card-footer > .btn').first();
        this.addJellies = this.page.locator('div:nth-child(3) > div > .card > .card-footer > .btn').first();
        this.navigateToBasketButton = this.page.getByRole('link', { name: 'Basket' });
        this.basket = this.page.locator('[id="basketItems"]');
        this.basketItems = this.basket.locator('li').locator('div').locator('h6')


    }
    async addItemToBasket(itemName) {
        if (itemName == 'Bon Bons') {
            await expect(this.addBonBons).toBeVisible();
            await this.addBonBons.click();
        } else if (itemName == 'Jellies') {
            await expect(this.addJellies).toBeVisible();
            await this.addJellies.click();
        }
    }
    async navigateToBasket() {
        await expect(this.navigateToBasketButton).toBeAttached();
        await this.navigateToBasketButton.click()
    }
    async verifyItemsInBasket(itemName) {
        await expect(this.basketItems).toContainText(itemName);
    }
}