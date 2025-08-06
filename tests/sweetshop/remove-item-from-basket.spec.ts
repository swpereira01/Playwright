import { test } from '@playwright/test';
import { Basket } from '../../page-objects/sweetshop/Basket';
import { Actions } from '../../page-objects/sweetshop/Actions';
import { Browse } from '../../page-objects/sweetshop/Browse';

test.describe('User should be able to add an item to the basket', () => {
    let basket;
    let actions;
    let browse;
    test.beforeEach(async ({ page }) => {
        basket = new Basket(page);
        actions = new Actions(page);
        browse = new Browse(page);
        await browse.goto();
        await actions.addItemsToBag('Nerds', 1);
        await basket.goto();
    });
    test('Should open the Browse Sweets page', async () => {
        await basket.verifyUrl();
        await basket.verifyHeader();
    });
});