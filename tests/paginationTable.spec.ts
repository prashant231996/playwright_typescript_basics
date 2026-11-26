import { test, expect, Locator } from "@playwright/test";

test("Read data from table pages", async ({ page }) => {
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");
    let hasmorePages = true;

    while (hasmorePages) {
        const rows: Locator[] = await page.locator("#example tbody tr").all();
        for (let row of rows) {
            console.log(await row.innerText());
        }

        const nextBtn: Locator = page.locator("button[aria-label='Next']");
        const isDisabled: string | null = await nextBtn.getAttribute("class");

        if (isDisabled?.includes("disabled")) {
            hasmorePages = false;
        }
        else {
            await nextBtn.click();
        }
    }


});

test("Filter rows and check rows count", async ({ page }) => {
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");
    const dropdown: Locator = page.locator("#dt-length-0");
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption({ value: "25" });
    //Approch 01
    const rows: Locator = page.locator("#example tbody tr");
    await expect(rows).toHaveCount(25);
    //Approch 02
    const rowsArray: Locator[] = await page.locator("#example tbody tr").all();
    expect(rowsArray).toHaveLength(25);

});

test.only("Search in specific data from table", async ({ page }) => {
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");
    const searchBox: Locator = page.locator("#dt-search-0");
    await searchBox.fill("Vivian Harrell");
    const rows: Locator[] = await page.locator("#example tbody tr").all();

    if (rows.length > 0) {
        let matchFound: boolean = false;
        for (let row of rows) {
            const text: String = await row.innerText();
            if (text.includes("Vivian Harrell")) {
                matchFound = true;
                break;
            }
        }

        if (matchFound) {
            console.log("Record is exist.");
        }

        expect(matchFound).toBeTruthy();

    }
    else {
        console.log("No Records Available.");

    }

});