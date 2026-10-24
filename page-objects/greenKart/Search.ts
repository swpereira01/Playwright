import { expect, type Locator, type Page } from '@playwright/test';
import { Homepage } from './Homepage';

export class Search extends Homepage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchText: string;
    readonly searchResults: Locator;

    constructor(page: Page) {
        super(page)
        this.searchInput = this.page.getByRole('searchbox', { name: 'Search for Vegetables and' });
        this.searchButton = this.page.locator('.search-button');
        this.searchText = "Cucumber";
        this.searchResults = this.page.getByRole('heading').filter({ hasText: this.searchText });

    }

    async searchForProduct() {
        await this.searchInput.click();
        await this.searchInput.fill(this.searchText);
        await this.searchButton.click();
    }
    async verifySearchResults() {
        await expect(this.searchResults).toContainText(this.searchText);
    }
}