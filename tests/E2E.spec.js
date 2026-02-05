//Documentation: https://playwright.dev/
const {test, expect} = require('@playwright/test');

test.only("E2E shop products happy path", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    await expect(page).toHaveTitle("Let's Shop");
    let email = "marianavivess@hotmail.com";
    let pass = "Password123";
    const product_name = "ZARA COAT 3";

    const username_loc = page.locator("#userEmail");
    const pass_loc = page.locator("#userPassword");
    const signin_btn = page.locator("#login");
    const products_list = page.locator(".card-body");
    const shop_page_results_title = page.locator("#res");

    //Login
    await username_loc.fill(email);
    await pass_loc.fill(pass);
    await signin_btn.click();

    await expect(shop_page_results_title).toContainText("Showing 5 results")
    await page.waitForLoadState('networkidle'); //Discouraged - might be flaky
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
    const count = await products_list.count();
    for(let i=0; i<count; ++i){
        if(await products_list.nth(i).locator("b").textContent() == product_name){
            console.log(await products_list.nth(i).locator("b").textContent());
            await products_list.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    //Go to Cart page
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); // Is visible does not support this to fail. so we use waitFor
    const isVisible = await page.locator("h3:has-text('Zara Coat 3')").isVisible(); //pseudo class from playwrigt
    expect(isVisible).toBeTruthy();

    //await page.pause()

})