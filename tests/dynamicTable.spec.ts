import { test, expect, Locator } from "@playwright/test";

test("Verify chrome CPU load from dynamic table", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table: Locator = page.locator("table.table tbody");
    await expect(table).toBeVisible();

    //For Chrome process get value of  CPU load.
    const rows: Locator[] = await table.locator("tr").all();
    const rownumber: number = rows.length;
    console.log("Number of rows in table " + rownumber);
    expect(rows).toHaveLength(4);

    let cpuLoad: string = '';

    for (const row of rows) {
        const processName: string = await row.locator("td").nth(0).innerText();
        if (processName === "Chrome") {
            //cpuLoad=await row.locator('td:has-text("%")').innerText();
            cpuLoad = await row.locator('td', { hasText: '%' }).innerText();
            console.log("CPU load of chrome " + cpuLoad);
            break;
        }
    }

    //Compare it with value in the yellow label.

    const yellowBoxText: string = await page.locator("#chrome-cpu").innerText();
    console.log("Chrome CPU load from yellow box is " + yellowBoxText);

    if (yellowBoxText.includes(cpuLoad)) {
        console.log("CPU LOAD IS EQUAL")
    }
    else {
        console.log("CPU LOAD IS NOT EQUAL")

    }
    expect(yellowBoxText).toContain(cpuLoad);

    /*
       ******SOLVE REMAINING CASES OF DYNAMIC TABLE FROM BELOW URL
       https://testautomationpractice.blogspot.com/
    */
});