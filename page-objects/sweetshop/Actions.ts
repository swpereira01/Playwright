import { expect, type Locator, type Page } from '@playwright/test';

export class Actions {
    readonly page;
    readonly browseSweetsButton;
    readonly navigateToBasketButton;
    readonly basket;
    readonly basketItems;
    readonly itemPick;
    readonly name1
    constructor(page: Page) {
        this.page = page;
        this.navigateToBasketButton = this.page.getByRole('link', { name: 'Basket' });
        this.basket = this.page.locator('[id="basketItems"]');;
        this.itemPick = (itemName: string) => this.page.locator('div.card').locator('div.card-footer').locator(`[data-name="${itemName}"]`);


    }
    async addItem(itemName: string) {
        let item = this.itemPick(itemName);
        await item.click();
    }
    async navigateToBasket() {
        await expect(this.navigateToBasketButton).toBeAttached();
        await this.navigateToBasketButton.click()
    }
    async verifyItemsInBasket(itemName) {
        await expect(this.basket).toContainText(itemName);
    }
}