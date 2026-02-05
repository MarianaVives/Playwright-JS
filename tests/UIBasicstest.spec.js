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
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

})

//Second way to kickstart automation - used when no cookies are passed or advanced settings fo our tests
test("Page Playwright test", async({page})=>{
    await page.goto("https://www.google.com");
    //Get title and assert that title is correct
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")

})

test("Page Playwright test RS Academy", async({page})=>{
    let username = "rahulshettyacademy";
    let pass = "Learning@830$3mK2";
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator("#username").fill(username);
    await page.locator("#password").fill(pass);
    await page.locator("#signInBtn").click();
    await expect(page).toHaveTitle("ProtoCommerce");
})

test("Page Playwright test RS Academy wrong Password", async({page})=>{
    
    let username = "rahulshettyacademy";
    let incorrect_pass = "wrongPass1";
    let correct_pass = "Learning@830$3mK2";

    const username_loc = page.locator("#username");
    const pass_loc = page.locator("#password");
    const signin_btn = page.locator("#signInBtn");
    const product_list = page.locator("div[class='card h-100'] a")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username_loc.fill(username);
    await pass_loc.fill(incorrect_pass);
    await signin_btn.click();
    console.log(await page.locator("div[style*='block']").textContent())
    await expect(page.locator("div[style*='block']")).toHaveText("Incorrect username/password.")
    await pass_loc.fill("");
    await pass_loc.fill(correct_pass);
    await signin_btn.click();
    await expect(page).toHaveTitle("ProtoCommerce");
    await product_list.first().textContent(); //Waits for a single element
    let titles_products = await product_list.allTextContents(); //Waits for an array that can be empty therefore it can return something empty if executed before elements are shown in the DOM
    console.log(titles_products);
});

test("Handle Select/Static Dropdown & Radio btn with Playwright", async({page})=>{
    
    let username = "rahulshettyacademy";
    let incorrect_pass = "wrongPass1";
    let correct_pass = "Learning@830$3mK2";

    const username_loc = page.locator("#username");
    const pass_loc = page.locator("#password");
    const signin_btn = page.locator("#signInBtn");
    const document_link = page.locator("[href*='documents-request']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username_loc.fill(username);
    await pass_loc.fill(correct_pass);
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    //await page.pause(); //to see if it clicked correct optn
    //radio btn
    await page.locator(".radiotextsty").last().click();
    console.log(await page.locator(".radiotextsty").last().isChecked);
    expect(await page.locator(".radiotextsty").last()).toBeChecked();
    //page popup
    await page.locator("#okayBtn").click();
    //Terms and conditions checkbox
    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //Validate blinking text is visible
    await expect(document_link).toHaveAttribute("class","blinkingText");
    await signin_btn.click();
    await expect(page).toHaveTitle("ProtoCommerce");
    //Handling child windows
});

test("Child windows handle with Playwright", async({browser})=>{
    
    const context = await browser.newContext(); 
    const page = await context.newPage();
    const username_loc = page.locator("#username");
    const document_link = page.locator("[href*='documents-request']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //console.log(await page.locator("#username").inputValue());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await expect(document_link).toHaveAttribute("class","blinkingText");
    const [newPage]= await Promise.all([ 
        //Promises exist in 3 states: pending, rejected and fulfilled 
        context.waitForEvent('page'),
        document_link.click(),
    ]);
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const array = text.split("@")
    const domain = array[1].split(" ")[0]
    console.log(domain)
    await username_loc.fill(domain);
    console.log(await username_loc.inputValue());
})