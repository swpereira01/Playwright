import { Page, test } from '@playwright/test';
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
        await actions.addItemsToBag('Swansea Mixture', 1);
        await basket.goto();
    });
    test('Should open the Basket page', async () => {
        await basket.verifyUrl();
        await basket.verifyHeader();
    });
    test('Should remove item from cart', async ({ page }) => {
        await actions.numberOfItemsInBasket('2');
        await actions.removeItemFromBasket('Nerds');
        await actions.acceptRemoval();
        await actions.numberOfItemsInBasket('1');
    })
})