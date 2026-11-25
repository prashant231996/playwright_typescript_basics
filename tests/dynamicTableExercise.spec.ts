import { test, expect, Locator } from "@playwright/test";

test("Verify dynamic table details", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table: Locator = page.locator("#taskTable tbody");
    await expect(table).toBeVisible();

    const rows: Locator[] = await table.locator("tr").all();

    //CPU load of Chrome process: 8.6%

    let cpuLoad: string = '';
    for (let row of rows) {
        const processname: string = await row.locator('td').nth(0).innerText();
        if (processname === "Chrome") {
            cpuLoad = await row.locator("td", { hasText: "%" }).innerText();
            break;
        }
    }
    console.log("CPU Load of chrome from table is " + cpuLoad);

    const chromeCpuLoad: string = await page.locator("(//*[@id='displayValues']//strong)[1]").innerText();
    expect(cpuLoad).toBe(chromeCpuLoad);

});