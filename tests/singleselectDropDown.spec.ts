import { expect, test, Locator } from "@playwright/test";

test("Single select dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    //Select option from dropdown

    await page.locator("#country").selectOption("Japan"); //Select dropdown option by visible text

    await page.locator("#country").selectOption({ value: "usa" });  //Select drop down option by using value attribte

    await page.locator("#country").selectOption({ label: "Germany" })  //Select option by using label

    await page.locator("#country").selectOption({ index: 2 });  //Select option by index

    //Check number of options present in dropdown

    const droperDownOptions: Locator = page.locator("#country>option");
    await expect(droperDownOptions).toHaveCount(10);

    //Check option is present in dropdown or not
    const options: string[] = await droperDownOptions.allTextContents();
    const trimmerdOptions: string[] = options.map(option => option.trim());
    console.log("Trimmed Options are " + trimmerdOptions);
    expect(trimmerdOptions).toContain("Japan");

    //Printing options from dropdown
    for (const option of trimmerdOptions) {
        console.log(option);

    }
});