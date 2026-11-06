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
        await checkout.validateOrderTable(1, 'Cucumber', '1', 48, 48);
        await checkout.validateOrderTable(2, 'Carrot', '1', 56, 56);
        await checkout.validateOrderTable(3, 'Beetroot', '1', 32, 32);
        await checkout.validateTotalAmount('136');
        await checkout.clickPlaceOrder();
        await checkout.selectCountry('India');
        await checkout.agreeToTerms();
        await checkout.clickProceed();
        await checkout.validateThankYouMessage();
    });

    test('User will add multiple quantities of a product to cart and checkout', async () => {
        await catalog.increaseQuantity('Corn', 3);
        await catalog.addProductToCart('Corn');
        await catalog.increaseQuantity('Banana', 2);
        await catalog.addProductToCart('Banana');
        await checkout.openCart();
        await checkout.validateCartItems(['Corn', 'Banana']);
        await checkout.proceedToCheckout();
        await checkout.validateOrderTable(1, 'Corn', '4', 75, 300);
        await checkout.validateOrderTable(2, 'Banana', '3', 45, 135);
        await checkout.validateTotalAmount('435');
        await checkout.clickPlaceOrder();
        await checkout.selectCountry('India');
        await checkout.agreeToTerms();
        await checkout.clickProceed();
        await checkout.validateThankYouMessage();

    })

})