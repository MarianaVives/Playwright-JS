//Documentation: https://playwright.dev/
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require("./utils/APIUtils");

const productOrderId = "6960eae1c941646b7a8b3ed3";
const country = "Mexico";
const object = { userEmail: "marianavivess@hotmail.com", userPassword: "Password123" };
const order = { orders: [{ country: country, productOrderedId: productOrderId }] };
let response;

test.beforeAll(async () => {
    //Execute only once before test1, test2, test3. Execute each test in seq
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, object);
    response = await apiUtils.createOrder(order);
});


test("@API Use Web API to skip login with playwright", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    //Bypass login screen
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});