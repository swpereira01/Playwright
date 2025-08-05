import { test } from '@playwright/test';
import { Browse } from '../../page-objects/sweetshop/Browse';
import { Actions } from '../../page-objects/sweetshop/Actions';

test.describe('User should be able to add an item to the basket', () => {
    let browse;
    let page;
    let actions;
    test.beforeEach(async ({ page }) => {
        browse = new Browse(page);
        actions = new Actions(page);
        await browse.goto();
    });
    test('Should open the Browse Sweets page', async () => {
        await browse.verifyUrl();
        await browse.verifyHeader();
    });
    test('Add one item to the basket', async () => {
        await actions.addItem('Strawberry Bon Bons');
        await actions.navigateToBasket();
        await actions.verifyItemsInBasket('Bon Bons')
    });



});