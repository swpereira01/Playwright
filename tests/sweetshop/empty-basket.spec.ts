import { expect, Page, test } from '@playwright/test';
import { Basket } from '../../page-objects/sweetshop/Basket';
import { Actions } from '../../page-objects/sweetshop/Actions';
import { Browse } from '../../page-objects/sweetshop/Browse';


test.describe.serial('User should be able to empty the basket', () => {
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
    test.skip('Should open the Basket page', async ({ page }) => {
        await basket.verifyUrl();
        await basket.verifyHeader();

    });
    //very flaky test, playwright does not seem to accept the dialogue even though
    //it uses the same workflow as remove-item-from-basket.
    //If I ran into this issue for a different website I would check the api calls and
    //try to incorporate that into the test.
    test('Should empty cart when empty cart is clicked', async ({ page }) => {
        await actions.numberOfItemsInBasket('2');
        await actions.emptyBasket();
        await actions.acceptRemoval();
        await actions.verifyEmptyBasketButtonWasClicked();
    });
})


