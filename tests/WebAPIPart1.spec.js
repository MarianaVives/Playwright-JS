//Documentation: https://playwright.dev/
const { test, expect, request } = require('@playwright/test');
let email = "marianavivess@hotmail.com";
let pass = "Password123";
const object = {userEmail: email, userPassword: pass};
let token;


test.beforeAll( async()=>{
    //Execute only once before test1, test2, test3. Execute each test in seq
    let url = "https://rahulshettyacademy.com/api/ecom/auth/login";
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(url, {data : object});
    expect(loginResponse.ok()).toBeTruthy(); //200, 201
    const loginResponse_json = await loginResponse.json();
    token = loginResponse_json.token;
});


test.only("Use Web API to skip login with playwright", async ({ page }) => {
    //Insert a value i}n the local storage - value is the token
    //Anonymus fct takes two params: function and parameter
    page.addInitScript(value =>{
        window.localStorage.setItem("token", value);
    }, token);

    //Bypass login screen
    await page.goto("https://rahulshettyacademy.com/client");
    const product_name = "ZARA COAT 3";
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
})