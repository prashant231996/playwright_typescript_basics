import {test,expect} from '@playwright/test';

//Fixuter==>Golobal Variables==> page,browser,context
/*
SYNCRONOUS==>ALL STEPS EXECUTED IN SEQUENCE==>ONE BY ONE
ASYNC==>ALL STEPS EXECUTED IN PARALLEL==>AT THE SAME TIME
here we are using ASYNC because we are using AWAIT in our code
ASYNC==>ALL STEPS EXECUTED IN PARALLEL==>AT THE SAME TIME
AWAIT==>IT WILL WAIT FOR THE PREVIOUS STEP TO COMPLETE AND THEN EXECUTE NEXT STEP
*/
test("Verify Page Title",async({page})=>
{
    const expectedTitle="AskOmDch – Become a Selenium automation expert!";
    await page.goto("https://askomdch.com/");
    const title=await page.title();
    expect(title).toBe(expectedTitle);
    expect(page).toHaveTitle(expectedTitle);
}
);