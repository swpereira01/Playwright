import { test, expect } from '@playwright/test';
import { Checkout } from '../../page-objects/greenKart/Checkout';
import { Catalog } from '../../page-objects/greenKart/Catalog';
import { Homepage } from '../../page-objects/greenKart/Homepage';

test.describe('GreenKart Checkout Flow', () => {
    let checkout: Checkout;
    let catalog: Catalog;
    let homepage: Homepage;

    test.beforeEach(async ({ page }) => {
        checkout = new Checkout(page);
        catalog = new Catalog(page);
        homepage = new Homepage(page);
        await homepage.goto();
    });
    test('User will search for a product, add it to cart and checkout', async () => {
        await catalog.addProductToCart('Cucumber');
        await checkout.openCart();
        await checkout.validateCartItems(['Cucumber']);
        await checkout.proceedToCheckout();
        await checkout.validateOrderTable(1, 'Cucumber', '1', 48, 48);
        await checkout.clickProceed();
        await checkout.validateThankYouMessage();
    })

})