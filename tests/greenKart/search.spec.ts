import { test } from '@playwright/test';
import { Search } from '../../page-objects/greenKart/Search';
import { Catalog } from '../../page-objects/greenKart/Catalog';
import { Homepage } from '../../page-objects/greenKart/Homepage';


test.describe('Test will verify that correct item is return when searched for', () => {
    let homepage: Homepage;
    let search: Search;
    let catalog: Catalog;

    test.beforeEach(async ({ page }) => {
        search = new Search(page);
        homepage = new Homepage(page);
        catalog = new Catalog(page);
        await homepage.goto();
    });

    test('User will search for a product and add it to cart', async () => {
        await search.searchForProduct('Cucumber');
        await search.verifySearchResults('Cucumber');
        await catalog.addProductToCart('Cucumber');
    })
})