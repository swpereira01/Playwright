import { expect, type Locator, type Page } from "@playwright/test";
import { Homepage } from "./Homepage";

export class Checkout extends Homepage {
    readonly cartButton: Locator;
    readonly cartItems: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly orderTable: Locator;
    readonly totalAmount: Locator;
    readonly placeOrderButton: Locator;
    readonly countryDropdown: Locator;
    readonly agreeTermsCheckbox: Locator;
    readonly proceedButton: Locator;
    readonly thankYouMessage: Locator;
    //readonly SuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.cartButton = this.page.locator('.cart-icon');
        this.cartItems = this.page.getByRole('listitem');
        this.proceedToCheckoutButton = this.page.getByRole('button', { name: 'PROCEED TO CHECKOUT' });
        this.orderTable = this.page.locator('[id = "productCartTables"]');
        this.totalAmount = this.page.locator('.totAmt');
        this.placeOrderButton = this.page.getByRole('button', { name: 'PLACE ORDER' });
        this.countryDropdown = this.page.getByRole('combobox');
        this.agreeTermsCheckbox = this.page.locator('.chkAgree');
        this.proceedButton = this.page.getByRole('button', { name: 'Proceed' });
        this.thankYouMessage = this.page.getByText('Thank you, your order has');

    }

    async openCart() {
        await this.cartButton.click();
    }
    async validateCartItems(expectedItems: string[]) {
        for (const item of expectedItems) {
            const cartItem = this.cartItems.filter({ hasText: item });
            await expect(cartItem).toBeVisible();
        }
    }
    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
    async validateOrderTable(row: number, expectedItem: string, expectedQuantity: string, expectedPrice: number, expectedTotal: number) {
        const orderRow = this.orderTable.locator('tr').nth(row);
        const expectedItems = orderRow.locator('td').nth(1).filter({ hasText: expectedItem });
        const expectedQuantities = orderRow.locator('td').nth(2).filter({ hasText: expectedQuantity });
        const expectedPrices = orderRow.locator('td').nth(3).filter({ hasText: expectedPrice.toString() });
        const expectedTotals = orderRow.locator('td').nth(4).filter({ hasText: expectedTotal.toString() });
        await expect(expectedItems).toBeVisible();
        await expect(expectedQuantities).toBeVisible();
        await expect(expectedPrices).toBeVisible();
        await expect(expectedTotals).toBeVisible();
    }
    async validateTotalAmount(expectedAmount: string) {
        await expect(this.totalAmount).toHaveText(expectedAmount);
    }
    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }
    async selectCountry(countryName: string) {
        await this.countryDropdown.click();
        await this.countryDropdown.selectOption(countryName);
    }
    async agreeToTerms() {
        await this.agreeTermsCheckbox.check();
    }
    async clickProceed() {
        await this.proceedButton.click();
    }
    async validateThankYouMessage() {
        await expect(this.thankYouMessage).toBeVisible();
    }


}