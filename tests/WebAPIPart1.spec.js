//Documentation: https://playwright.dev/
const { test, expect, request } = require('@playwright/test');
const email = "marianavivess@hotmail.com";
const pass = "Password123";
const productOrderId = "6960eae1c941646b7a8b3ed3";
const country = "Mexico";
const object = { userEmail: email, userPassword: pass };
let token;
let ordersId;
const order = {orders: [{country: country, productOrderedId: productOrderId }]};

test.beforeAll(async () => {
    //Execute only once before test1, test2, test3. Execute each test in seq
    let loginURL = "https://rahulshettyacademy.com/api/ecom/auth/login";
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(loginURL, { data: object });
    expect(loginResponse.ok()).toBeTruthy(); //200, 201
    const loginResponse_json = await loginResponse.json();
    token = loginResponse_json.token;

    //create order
    let createOrderUrl = "https://rahulshettyacademy.com/api/ecom/order/create-order";
    const createOrderResponse = await apiContext.post(createOrderUrl,
        {
            data: order,
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
        });
    const createOrderResponse_json = await createOrderResponse.json();
    console.log(createOrderResponse_json);
    //expect(createOrderResponse.ok()).toBeTruthy();
    ordersId = createOrderResponse_json.orders[0];
    console.log(ordersId);

});


test.only("Use Web API to skip login with playwright", async ({ page }) => {
    //Insert a value i}n the local storage - value is the token
    //Anonymus fct takes two params: function and parameter
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);

    //Bypass login screen
    await page.goto("https://rahulshettyacademy.com/client");
   
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (ordersId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(ordersId.includes(orderIdDetails)).toBeTruthy();
});