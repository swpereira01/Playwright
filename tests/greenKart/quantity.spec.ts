import { test } from '@playwright/test';
import { Catalog } from '../../page-objects/greenKart/Catalog';
import { Homepage } from '../../page-objects/greenKart/Homepage';

test.describe('Test will verify that user can increase and decrease quantity of a product', () => {
    let homepage: Homepage;
    let catalog: Catalog;
    test.beforeEach(async ({ page }) => {
        catalog = new Catalog(page);
        homepage = new Homepage(page);
        await homepage.goto();
    });

    test('User will add 3 Tomates to the cart', async () => {
        await catalog.increaseQuantity('Tomato', 3);
        await catalog.addProductToCart('Tomato');
    });
    test('User will decrease quantity of a product before adding it to the cart', async () => {
        await catalog.increaseQuantity('Carrot', 3);
        await catalog.decreaseQuantity('Carrot', 1);
        await catalog.addProductToCart('Carrot');
    });

})
