const {test, expect} = require('@playwright/test');
const { LoginPage } = require('./PageObject/LoginPage');
//Json -> string -> js object
const testData = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
//Wait mechanism for printing a list. allTextContents wiil return anything even an empty array
//So manually we introduce a wait to make sure that the array is populated with the info we are expecting
test("Retrieve first element", async({page})=>{
    const username = testData.username;
    const password = testData.password;
    const loginPage = new LoginPage(page);
    await page.goto("https://rahulshettyacademy.com/client");
    await loginPage.navigateToLoginPage("https://rahulshettyacademy.com/client");
    await loginPage.validLogin(username, password);
    //wait until all network calls are complete
    await page.waitForLoadState('networkidle'); //Discouraged - might be flaky
    //Alternative option wait for the locator to be visible. use .first() to point to a single element as wait for works for a single locator/element
    //await page.locator(".card-body b").first().waitFor();
    await expect(page).toHaveTitle("Let's Shop")
    let title = await page.locator(".card-body b").allTextContents();    
    console.log(title)
    const product_name = testData.productName;
    await page.locator(".card-body").filter({hasText:product_name}).getByRole("button", {name: "Add to Cart"}).click();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
    //Go to Cart page
    await page.getByRole("button",{name :"Checkout"}).click();
    await page.locator("div li").first().waitFor(); // Is visible does not support this to fail. so we use waitFor
    //Select country through dropdown menu
    await page.getByPlaceholder("Select Country").pressSequentially("united");
    await page.getByRole("button", {name: "United Kingdom"}).click();
    //Place order
    await page.getByText("PLACE ORDER").click();
    //Confirm order placed
    page.locator(".hero-primary").waitFor();
    await expect(page.getByText("Thankyou for the order. ")).toBeVisible();
});