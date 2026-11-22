import {test,expect,Locator} from "@playwright/test";

test("Auto Suggest Drop down", async({page})=>
{
    await page.goto("https://www.flipkart.com/");
    const serachBox:Locator=page.locator("form input[name='q']");
    await serachBox.fill("smart");  //Search some criteria
    await page.waitForTimeout(5000); //Added static wait for 5 as auto suggest dropdown take some time to load

    //Get all suggested options==>  CTRL+SHIFT+P  On DOM STUCTURE==>Emmulate Page Rendering
    const options:Locator=page.locator("ul>li");
    const count=await options.count();
    console.log("Number of suggested items: "+count);

    //Print all suggested options
    for(const option of await options.allTextContents())
    {
        console.log("Printing all auto suggest options "+option);
    }

    //Get specific option  eg.5th option
    console.log("5th option present in auto suggestion is "+await options.nth(4).textContent());

    //Select Smart phone option
    for(let i=0;i<await options.count();i++)
    {
        const option=options.nth(i);
        if(await option.textContent()==="smartphone")
        {
            await option.click();
            console.log("Smart Phone option is clicked from suggested dropdown");
            break;
        }

    }
});