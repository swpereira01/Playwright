import { expect, type Locator, type Page } from '@playwright/test';

export class Card {
    readonly page;
    readonly card;
    readonly cardBody;
    readonly cardImage;
    readonly cardTitle;
    readonly cardText;
    readonly cardPrice;
    readonly cardFooter;
    readonly addToBasketButton;
    constructor(page: Page) {
        this.page = page;
        this.card = this.page.locator('.card').first();
        this.cardBody = this.card.locator('.card-body');
        this.cardImage = this.card.locator('.card-img-top');
        this.cardTitle = this.cardBody.locator('.card-title');
        this.cardText = this.cardBody.locator('.card-text');
        this.cardPrice = this.cardBody.locator('.card-text');
        this.cardFooter = this.card.locator('.card-footer');
        this.addToBasketButton = this.cardFooter.locator('.btn');
    }
    async verifyElementsInCard() {
        await expect(this.card).toBeVisible();
        await expect(this.cardImage).toBeVisible();
        await expect(this.cardTitle).toBeVisible();
        await expect(this.cardText).toBeVisible();
        await expect(this.cardPrice).toBeVisible();
        await expect(this.addToBasketButton).toBeVisible();
    }

}