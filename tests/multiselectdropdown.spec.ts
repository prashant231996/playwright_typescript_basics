import { test, expect, Locator } from "@playwright/test";

test("Multiselect dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Select dropdown option
    await page.locator("#colors").selectOption(["Red", "Blue", "Green"]); //Select option by viible text

    await page.locator("#colors").selectOption(["red", "green"]); //Select options using value attribute

    await page.locator("#colors").selectOption([{ label: "Red" }, { label: "Green" }]); //Select options using label

    await page.locator("#colors").selectOption([{ index: 0 }, { index: 3 }]);  //Select options using index

    //Check number of options from dropdown

    const colorOptions: string[] = (await page.locator("#colors>option").allTextContents()).map(option => option.trim());
    expect(colorOptions).toHaveLength(7);

    //Check otipn is present in dropdown or not
    expect(colorOptions).toContain("Red");

    //Print all opions
    for (const option of colorOptions) {
        console.log(option);
    }


});