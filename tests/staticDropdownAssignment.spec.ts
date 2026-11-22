import { test, expect, Locator } from "@playwright/test";

test("Static dropdown handling assignment", async ({ page }) => {
    await page.goto("https://bstackdemo.com/");

    //1) Interact with drop down element
    const priceSortDropDown: Locator = page.locator("//select");
    await priceSortDropDown.selectOption({ value: "lowestprice" });

    //2) Retrive & Print product Information
    const productNames: Locator = page.locator(".shelf-item__title");
    await productNames.first().waitFor();
    const names: string[] = (await productNames.allTextContents()).map(productname => productname.trim());
    console.log("Product names are: " + names);

    const prices: Locator = page.locator(".shelf-item__price>.val>b");
    await prices.first().waitFor();
    const productPrices: string[] = (await prices.allTextContents()).map(price => price.trim());
    console.log("prices are " + productPrices);

    const productCount: number = names.length;
    const pricesCount = productPrices.length;
    console.log("Product Count is " + productCount);
    console.log("Prices count is " + pricesCount);

    expect(productCount).toEqual(pricesCount);

    //Print each product name along with its price
    for (const [i, name] of names.entries()) {
        console.log(`${name} ${productPrices[i]}`);
    }

    //Identify and print the lowest product price
    const pricesInNum: number[] = productPrices.map(Number);
    console.log("Lowest product price is " + Math.min(...pricesInNum));

    //Identify and pring the highest product price
    console.log("Highest product price is " + Math.max(...pricesInNum));

    const products = names.map((product_title, i) => (
        {
            name: product_title.trim(),
            price: pricesInNum[i],
        }));

    const cheapest = products.reduce((min, p) => (p.price < min.price ? p : min));
    const costliest = products.reduce((max, p) => (p.price > max.price ? p : max));

    console.log('Lowest:', cheapest);
    console.log('Highest:', costliest);
});