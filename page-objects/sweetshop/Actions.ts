import { expect, type Locator, type Page } from '@playwright/test';

export class Actions {
    readonly page;
    readonly browseSweetsButton;
    readonly navigateToBasketButton;
    readonly numberOfItems;
    readonly basket;
    readonly itemPick;
    readonly basketItem;
    readonly deleteButton;
    constructor(page: Page) {
        this.page = page;
        this.navigateToBasketButton = this.page.getByRole('link', { name: 'Basket' });
        this.numberOfItems = this.page.locator('#basketCount');
        this.basket = this.page.locator('#basketItems');
        this.itemPick = (itemName: string) => this.page.locator('div.card').locator('div.card-footer').locator(`[data-name="${itemName}"]`);
        this.basketItem = (itemName: string) => this.basket.locator('li').getByText(`${itemName}`);
        this.deleteButton = (itemName: string) => this.page.getByRole('listitem').filter({ hasText: `${itemName}` }).getByRole('link');


    }
    async addItemsToBag(itemName: string, clicks: number) {
        let item = this.itemPick(itemName);
        for (let i = 0; i < clicks; i++) {
            await item.click();
        }
    }
    async numberOfItemsInBasket(number: string) {
        await expect(this.numberOfItems).toHaveText(number);
    }
    async navigateToBasket() {
        await expect(this.navigateToBasketButton).toBeAttached();
        await this.navigateToBasketButton.click()
    }
    async verifyItemsInBasket(itemName) {
        await expect(this.basket).toContainText(itemName);
    }
    async removeItemFromBasket(itemName: string) {
        let itemToDelete = this.basketItem(itemName);
        await expect(itemToDelete).toBeVisible();
        let itemToDeleteButton = this.deleteButton(itemName)
        await itemToDeleteButton.dblclick(); //workaround - the tests are very flaky with one click
    }
    async acceptRemoval() {
        this.page.on('dialog', async dialog => {
            await dialog.message();
            console.log(dialog.message());
            await dialog.accept();
        })
    }
}