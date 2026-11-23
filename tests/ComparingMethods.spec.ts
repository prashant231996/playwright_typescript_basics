import {test,expect,Locator} from "@playwright/test";

test("Comparing Methods",async({page})=>
{
    await page.goto("https://demowebshop.tricentis.com/");

    const products:Locator=page.locator(".product-title");

    await products.first().waitFor();

    //innerText() VS textContent()

    // innerText() & textContent() will work for single element.

    console.log(await products.nth(0).innerText()); //innerText()==>this method will return exact visible text without any space.

    console.log(await products.nth(0).textContent()); //textContent()==>this method will return inner text with spaces

    console.log(await products.first().textContent());

    const productCount=await products.count();

    //Print all product information

    for(let i=0;i<productCount;i++)
    {
        //Extract pain text, Eliminates white spaces and line breaks
        const productName: string=await products.nth(i).innerText(); 
        console.log("Product name fetched by inner text is "+productName);

        //Extract text including hidden elements, Includes whitespaces, line breaks,etc.
        const productNameByTextContent:string | null =await products.nth(i).textContent();
        console.log("Product name fetched by text content is "+productNameByTextContent)

        const productNameByTextContentWithTrim:string | null =await products.nth(i).textContent();
        console.log("Product name fetched by text content with trim is "+productNameByTextContent?.trim());
    }

    //allInnerTexts() VS allTextContents()
    //allInnerTexts() & allTextContents() will work for group of elements.

    console.log("*****COMPARING allInnerTexts() VS allTextContents()*****")

    const productNameByAllInnerTexts:string[]=await products.allInnerTexts();
    console.log("Product names by all inner text "+productNameByAllInnerTexts);

    const productNameByAllTextContents:string[]=await products.allTextContents();
    console.log("Product names by all text contents "+productNameByAllTextContents);

    const productNameByAllTextContentsWithTrim:string[]=(await products.allTextContents()).map(productname=>productname.trim());
    console.log("Product names by all text contents with trim "+productNameByAllTextContentsWithTrim);

    //all()  ==> It will retrun array of locator Locator[]
    //Locator==>Locator[]
    //Returns array of locators

    const productLocator:Locator[]=await products.all();
    console.log(productLocator[0].innerText());

    //for of loop

    for(const productLoc of productLocator)
    {
        console.log("Product name via all method is "+await productLoc.innerText());
    }

    //for in loop

    for(let i in productLocator)
    {
        console.log("Product name via for in loop "+await productLocator[i].innerText());
    }



})