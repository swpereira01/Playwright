import { expect, Page, test } from '@playwright/test';
import { Basket } from '../../page-objects/sweetshop/Basket';
import { Card } from '../../page-objects/sweetshop/Card';
import { Browse } from '../../page-objects/sweetshop/Browse';


test.describe.serial('Validating the elements on the first card', () => {
    let basket;
    let card;
    let browse;
    test.beforeEach(async ({ page }) => {
        basket = new Basket(page);
        card = new Card(page);
        browse = new Browse(page);
        await browse.goto();
    });

    test('Should validate that all elements appear on the first card', async ({ page }) => {
        await card.verifyElementsInCard();
    });
})


