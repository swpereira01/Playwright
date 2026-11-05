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
    test('User will add 3 products to cart and checkout', async () => {
        await catalog.addProductToCart('Cucumber');
        await catalog.addProductToCart('Carrot');
        await catalog.addProductToCart('Beetroot');
        await checkout.openCart();
        await checkout.validateCartItems(['Cucumber', 'Carrot', 'Beetroot']);
        await checkout.proceedToCheckout();
        await checkout.validateOrderTable(1, 'Cucumber', '1');
        await checkout.validateOrderTable(2, 'Carrot', '1');
        await checkout.validateOrderTable(3, 'Beetroot', '1');
        await checkout.validateTotalAmount('136');
        await checkout.clickPlaceOrder();
        await checkout.selectCountry('India');
        await checkout.agreeToTerms();
        await checkout.clickProceed();
        await checkout.validateThankYouMessage();
    })

})