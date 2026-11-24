import {test,expect,Locator} from "@playwright/test";

test("Static Web Table",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const bookTable:Locator=page.locator("table[name='BookTable']");

    await expect(bookTable).toBeVisible();

    //No of rows present in table

    const tableRows:Locator=bookTable.locator("tbody tr"); //Return all the rows

    console.log("Number of rows present in table is "+await tableRows.count());

    const noOfRows:number=await tableRows.count();

    await expect(tableRows).toHaveCount(7);

    expect(noOfRows).toBe(7);

    //Count no of columns

    const tableColumns:Locator=tableRows.locator("th");  //Return all the columns
    console.log("No of columns present in table "+await tableColumns.count());

    await expect(tableColumns).toHaveCount(4);

    const columnCount:number=await tableColumns.count();
    expect(columnCount).toBe(4);

    //Read data from 2nd row

    const rowDatas:Locator=tableRows.nth(2).locator("td");
    const tableData:Locator[]=await rowDatas.all();
    for(let i in tableData)
    {
        console.log("Data present in second row is "+await tableData[i].innerText());

    }

    //Approch 2
    const innertextData:string[]=await rowDatas.allInnerTexts()
    console.log("Captured string array is "+innertextData);
    for(const data of innertextData)
    {
        console.log("2nd row inner text data is "+data);
    }

    //Approch 3
    const textContentData:string[]=(await rowDatas.allTextContents()).map(data=>data.trim());
    for(const data of textContentData)
    {
        console.log("2nd row text content data is "+data);
    }

    await expect(rowDatas).toHaveText(['Learn Java','Mukesh','Java','500']);

    //Extract data from table data excluding table header

    console.log("*****Printing all table data****");
    const allRowData:Locator[]=await tableRows.all();


    for(let row of allRowData.slice(1)) //slice(1)==>This will skip header row
    {
        const columData:string[]=await row.locator("td").allInnerTexts();
        console.log(columData.join('\t'));
    }

    //Print book name whose author is mukesh
    console.log("Books wriiten by Mukes are ");
    const mukeshBooks:string[]=[];

    for(let row of allRowData)
    {
        const cells:string[]=await row.locator("td").allInnerTexts();
        const author:string=cells[1];
        const book:string=cells[0];

        if(author==="Mukesh")
        {
            console.log(`${author}\t${book}`)
            mukeshBooks.push(book);
        }
    }

    expect(mukeshBooks.length).toBe(2);

    expect(mukeshBooks).toHaveLength(2);

    //Calculate total price of books

    let totalPrice:number=0;

    for(let row of allRowData.slice(1))
    {
        const cells:string[]=await row.locator("td").allInnerTexts();
        const price=cells[cells.length-1];
        totalPrice=totalPrice+parseInt(price);
    }

    console.log("Total price of books is "+totalPrice);

    expect(totalPrice).toBe(7100);


})