import {test,expect,Locator} from "@playwright/test";

//Input Box Actions
test("Text Input Actions", async ({page}) => {

    let inputNameVal:string="Prashant More";
    await page.goto("https://testautomationpractice.blogspot.com/");
    const name:Locator=page.locator("#name");
    await expect(name).toBeVisible();
    await expect(name).toBeEnabled();
    await name.fill(inputNameVal);
    const nameValue: string | null=await name.textContent();//This will return inner text of the webelement
    console.log("Value of first name by text content is :"+nameValue);
    const nameValue2:string=await name.inputValue();//This will return value of the input field
    console.log("Value of name by input value "+nameValue2);
    expect(nameValue2).toBe(inputNameVal);
    const maxLength : string | null=await name.getAttribute("maxlength");
    console.log("Max Length of the input field is: "+maxLength);
    expect(maxLength).toBe("15");
});


//Radio Button Actions

test("Text Radio Button Actions", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleRadio:Locator=page.locator("#male");
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    expect(await maleRadio.isChecked()).toBe(false);
    await maleRadio.check();
    await expect(maleRadio).toBeChecked();
    expect(await maleRadio.isChecked()).toBe(true);

    const femaleRadioBtn:Locator=page.locator("#female");
    expect(await femaleRadioBtn.isChecked()).toBeFalsy();
    await femaleRadioBtn.check();
    await expect(femaleRadioBtn).toBeChecked();
});


//CheckBox Actions

test("CheckBox Actions", async ({page}) => {

    //Select specific checkbox
    await page.goto("https://testautomationpractice.blogspot.com/");
    const sundayCheckbox:Locator=page.getByLabel("Sunday");
    await sundayCheckbox.check();
    expect(sundayCheckbox).toBeChecked();

    //Select all the checkboxes

    const days:string[]=["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const checkboxes:Locator[]=days.map(label=>page.getByLabel(label));
    expect(checkboxes.length).toBe(7);

    for(const checkbox of checkboxes)
    {
        if(!await checkbox.isChecked())
        {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        }
    }

    //Uncheck last 3 checkoxes and asssert

    for(const checkbox of checkboxes.slice(-3))
    {
        await checkbox.uncheck();
        expect(await checkbox.isChecked()).toBeFalsy();
        await expect(checkbox).not.toBeChecked();
    }

    //Select checkboxes which are not selected as well as unselect checkbox which are selecetd

    for(const checkbox of checkboxes)
    {
        if(await checkbox.isChecked())
        {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
        else
        {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    //Select random checkbox==> Select random checkbox by indexes (1,3,6)

    const indexes:number[]=[1,4,6];

    for(const index of indexes)
    {
        await checkboxes[index].check();
        await expect(checkboxes[index]).toBeChecked();
    }

    //Select checkbox bases on the label

    const dayName:string="Friday";

    for(const label of days)
    {
        if(label.toLocaleLowerCase()===dayName.toLocaleLowerCase())
        {
            await page.getByLabel(label).check();
            await expect(page.getByLabel(label)).toBeChecked();
        }
    }



});