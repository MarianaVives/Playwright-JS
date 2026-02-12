//Documentation: https://playwright.dev/
const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    //Login
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("marianavivess@hotmail.com");
    await page.locator("#userPassword").fill("Password123");
    await page.locator("#login").click();
    await expect(page.locator("#res")).toContainText("Showing")
    await page.waitForLoadState('networkidle');
    context.storageState({path: "state.json"});//Store cookies, local storage etc. in a json file that will be generated
    webContext = await browser.newContext({storageState:"state.json"});
});

test.only("E2E shop products happy path", async () => {
    const product_name = "ZARA COAT 3";
    const email = "marianavivess@hotmail.com";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/")
    const products_list = page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products_list.count();
    for (let i = 0; i < count; ++i) {
        if (await products_list.nth(i).locator("b").textContent() == product_name) {
            console.log(await products_list.nth(i).locator("b").textContent());
            //Add to cart
            await products_list.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    //Go to Cart page
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); // Is visible does not support this to fail. so we use waitFor
    const isVisible = await page.locator("h3:has-text('Zara Coat 3')").isVisible(); //pseudo class from playwrigt
    expect(isVisible).toBeTruthy();
    await page.locator("li button[type='button']").click();
    await page.locator("div[class='field'] input[class='input txt text-validated']").fill("4542 9931 9292 2293");
    await page.locator("div[class='field small'] select[class='input ddl']").first().selectText("01");
    await page.locator("div[class='field small'] select[class='input ddl']").last().selectText("30");
    await page.locator("div[class='title']:has(span[class='numberCircle']) +input").fill("852");
    await page.locator("div[class='field'] input[class='input txt']").fill("Mariana Islandia");
    await page.locator(".user__name label").textContent();
    await expect(page.locator(".user__name label")).toHaveText(email);
    await page.locator("[placeholder*='Country']").pressSequentially("united");
    const dropdown = await page.locator("[class*='results']")
    await dropdown.waitFor();
    const options_count = await dropdown.locator("button").count();
    for (let i = 0; i < options_count; ++i) {
        const country_option = await dropdown.locator("button").nth(i).textContent();
        if (country_option === " United Kingdom") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator("a[class*='submit']").click();
    page.locator(".hero-primary").waitFor();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const order_id = await page.locator("tr[class='ng-star-inserted'] td[class='em-spacer-1'] label").textContent();
    console.log(order_id)
    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (order_id.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(order_id.includes(orderIdDetails)).toBeTruthy();

})

test.only("test case 2", async()=>{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
})