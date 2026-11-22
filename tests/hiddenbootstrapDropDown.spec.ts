import {test,expect,Locator} from "@playwright/test";
import { count } from "node:console";

test("bootstrap dropdown",async({page})=>
{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    //Fill Login detail
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.getByRole("button",{name:"Login"}).click();

    //Click on PIM
    await page.getByRole("link",{name:"PIM"}).click();

    await page.locator("form i").nth(2).click();

    await page.waitForTimeout(5000);

    //Capture all the options from dropdown
    const options:Locator=page.locator("div[role='listbox'] span");

    console.log("Number of options available in drop down "+options.count());

    const optionValues:string[]=(await options.allTextContents()).map(option=>option.trim());

    console.log("Available Options :"+optionValues);

    await page.waitForTimeout(5000);

    //Select or click on specific option
    const count=await options.count();
    for(let i=0;i<count;i++)
    {
        if(await options.nth(i).textContent()==="QA Lead")
        {
            await options.nth(i).click();
            break;
        }
    }




    

});