//Documentation: https://playwright.dev/
const {test, expect} = require('@playwright/test');

//Browser is a common Fixture that will be automatically available
//Wrap it with curly brackets to make it a Playwright variable/fixture
test("Browser Context playwright test", async({browser})=>{
    //Default settings for context and page, if we are not passing cookies
    const context = await browser.newContext(); 
    //(await context).addCookies // Add cookies
    //Create new page to automate - without cookies instance or anything else
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title())

})

//Second way to kickstart automation - used when no cookies are passed or advanced settings fo our tests
test.only("Page Playwright test", async({page})=>{
    await page.goto("https://www.google.com");
    //Get title and assert that title is correct
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")
})
