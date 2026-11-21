import {test,expect, Locator} from '@playwright/test';


test("Playwright locators", async ({ page }) => {

    await page.goto("https://demo.nopcommerce.com/");
    await page.waitForTimeout(10000);
    
    //page.getBYAltText()==>Identify images by alt attributes
    const logo:Locator =page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();

    //page.getByText()==>Identify elements by text. Find the element by its inner text.(Non interactive elements)
    const text: Locator=page.getByText("Welcome to our store");
    await expect(text).toBeVisible();
    await expect(page.getByText("Welcome to")).toBeVisible(); //SubString
    await expect(page.getByText("/Welcome\s+to\s+our\s+store/i")).toBeVisible(); //RegEx

    //page.getByRole()==>Identify elements by their ARIA role. Find the element by its ARIA role and accessible name.
    const link:Locator=page.getByRole("link", { name: "Register" });
    await expect(link).toBeVisible();
    await link.click();

    const header:Locator=page.getByRole("heading", {name:"Register"});
    await expect(header).toBeVisible();

    //page.getByLael()==>Identify form fields by their associated label. Find the form field by its associated label text.
    const firstName:Locator=page.getByLabel("First name:");
    await firstName.fill("Prashan");

    const lastName: Locator=page.getByLabel("Last name:");
    await lastName.fill("More");

    await page.getByLabel("Email:").fill("DummyEmail.test@gmail.com");

    //page.getByPlaceholder()==>Identify form fields by their placeholder text. Find the form field by its placeholder text.
    const searchBox:Locator=page.getByPlaceholder("Search store");
    await searchBox.fill("Laptop");

    //page.getByTitle()==>Locate an webelement by its title attribute.
    const logoTitle:Locator=page.getByTitle("nopCommerce demo store");
    await expect(logoTitle).toBeVisible();
    await expect(logoTitle).toHaveText("nopCommerce demo store");

    //page.getByTestId()==>Locate an webelement by its data-testid attribute.
    const testId:Locator=page.getByTestId("newsletter-email");
    await expect(testId).toBeVisible();
    







    







});