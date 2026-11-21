import test from '@playwright/test';

test("Test 1", async ({ page }) => {
    await page.goto("https://askomdch.com/");
    console.log("Test 1 executed");
});

test("Test 2", async ({ page }) => {
    await page.goto("https://askomdch.com/");
    console.log("Test 2 executed");
});