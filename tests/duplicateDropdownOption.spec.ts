import { test, expect, Locator } from "@playwright/test";

test("Verify duplicate dropdown option", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dropdownOptions: Locator = page.locator("#colors>option");
    const options: string[] = (await dropdownOptions.allTextContents()).map(option => option.trim());
    const mySet = new Set<String>();
    const duplicates: string[] = [];

    for (const option of options) {
        if (mySet.has(option)) {
            duplicates.push(option);
        }
        else {
            mySet.add(option);
        }
    }

    console.log("Duplicate options are " + duplicates);
    if (duplicates.length > 0) {
        console.log("Duplicate options are found " + duplicates);
    }
    else {
        console.log("No duplicate options found");

    }
    expect(duplicates.length).toBe(2);
});