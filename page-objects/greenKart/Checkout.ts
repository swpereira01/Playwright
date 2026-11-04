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
    async validateCartItems(expectedItem: string) {
        let expectedItems = this.cartItems.filter({ hasText: expectedItem });
        await expect(expectedItems).toBeVisible();
    }
    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
    async validateOrderTable(expectedItem: string) {
        const expectedItems = this.orderTable.filter({ hasText: expectedItem });
        await expect(expectedItems).toBeVisible();
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