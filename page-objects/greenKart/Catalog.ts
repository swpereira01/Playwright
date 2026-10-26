import { expect, type Locator, type Page } from '@playwright/test';
import { Homepage } from './Homepage';

export class Catalog extends Homepage {
    readonly catalogItems: Locator;
    readonly increment: Locator;
    readonly decrement: Locator;
    readonly addToCart: Locator;

    constructor(page: Page) {
        super(page)
        this.catalogItems = this.page.locator('.product');
        this.increment = this.page.locator('.increment');
        this.decrement = this.page.locator('.decrement');
        this.addToCart = this.page.locator('.product-action button');

    }

    async increaseQuantity(productName: string, numberOfIncrements: number) {
        const product = this.catalogItems.filter({ hasText: productName });
        await expect(product).toBeVisible();
        const productIncrement = product.locator(this.increment);
        for (let i = 0; i < numberOfIncrements; i++) {
            await productIncrement.click();
        }
    }

    async decreaseQuantity(productName: string, numberOfDecrements: number) {
        const product = this.catalogItems.filter({ hasText: productName })
        await expect(product).toBeVisible();
        const productDecrement = product.locator(this.decrement)
        for (let i = 0; i < numberOfDecrements; i++) {
            await productDecrement.click();
        }
    }
    async addProductToCart(productName: string) {
        const product = this.catalogItems.filter({ hasText: productName });
        await expect(product).toBeVisible();
        const productAddToCart = product.locator(this.addToCart);
        await productAddToCart.click();
    }

}
