import { test, expect, Locator } from "@playwright/test";

test("Sorted DropDown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const dropDownOptions: Locator = page.locator("#animals>option");
    const optionsText: string[] = (await dropDownOptions.allTextContents()).map(option => option.trim());
    const originalList: string[] = [...optionsText];
    const sortedist: string[] = [...optionsText].sort();
    console.log(originalList);
    console.log(sortedist);
    expect(originalList).toEqual(sortedist);
})