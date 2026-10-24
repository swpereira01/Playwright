import { test } from '@playwright/test';
import { Search } from '../../page-objects/greenKart/Search';
import { Homepage } from '../../page-objects/greenKart/Homepage';

test.describe('Test will verify that correct item is return when searched for', () => {
    let homepage: Homepage;
    let search: Search;

    test.beforeEach(async ({ page }) => {
        search = new Search(page);
        homepage = new Homepage(page);
        await homepage.goto();
    });

    test('User will search for a product', async () => {
        await search.searchForProduct();
        await search.verifySearchResults();
    })
})