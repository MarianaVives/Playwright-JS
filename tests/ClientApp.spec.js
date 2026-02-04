const {test, expect} = require('@playwright/test');

//Wait mechanism for printing a list. allTextContents wiil return anything even an empty array
//So manually we introduce a wait to make sure that the array is populated with the info we are expecting
test("Retrieve first element", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    //wait until all network calls are complete
    await page.waitForLoadState('networkidle'); //Discouraged - might be flaky
    //Alternative option wait for the locator to be visible. use .first() to point to a single element as wait for works for a single locator/element
    //await page.locator(".card-body b").first().waitFor();
    await expect(page).toHaveTitle("Let's Shop")
    let title = await page.locator(".card-body b").allTextContents();    
    console.log(title)
});