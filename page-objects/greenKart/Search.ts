import { expect, type Locator, type Page } from '@playwright/test';
import { Homepage } from './Homepage';

export class Search extends Homepage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page)
        this.searchInput = this.page.getByRole('searchbox', { name: 'Search for Vegetables and' });
        this.searchButton = this.page.locator('.search-button');
    }

    async searchForProduct(searchText: string) {
        await this.searchInput.click();
        await this.searchInput.fill(searchText);
        await this.searchButton.click();

    }
    async verifySearchResults(searchText: string) {
        let searchResults = this.page.getByRole('heading').filter({ hasText: searchText });
        await expect(searchResults).toContainText(searchText);
    }
}