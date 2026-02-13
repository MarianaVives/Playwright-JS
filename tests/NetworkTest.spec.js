//Documentation: https://playwright.dev/
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require("./utils/APIUtils");

const productOrderId = "6960eae1c941646b7a8b3ed3";
const country = "Mexico";
const object = { userEmail: "marianavivess@hotmail.com", userPassword: "Password123" };
const order = { orders: [{ country: country, productOrderedId: productOrderId }] };
const fakePayloadOrders={data:[], message:"No Orders"};
let response;

test.beforeAll(async () => {
    //Make a call to create an order
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, object);
    response = await apiUtils.createOrder(order);
});


test.only("@SP Network Test", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    //Bypass login screen
    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6984ac66c941646b7ad780c7",
       async route=>{ 
            //intercpet response - API response->|fake response- playwright|=>broser-> render data in FE
            const response = await page.request.fetch(route.request()) //real response
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill({
                response, 
                body,
            });
        });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6984ac66c941646b7ad780c7");
    expect(await page.locator(".mt-4")).toContainText("No Orders");
});