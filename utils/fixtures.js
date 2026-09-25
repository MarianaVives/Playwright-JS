const base = require("@playwright/test");
const { request } = require("@playwright/test");
const {APIUtils} = require("./APIUtils")
const productOrderId = "6960eac0c941646b7a8b3e68";
const country = "Cuba";
const loginPayLoad = { userEmail: "maria426282@gmail.com", userPassword: "Password123." };
const order = { orders: [{ country: country, productOrderedId: productOrderId }] };

let url= "https://rahulshettyacademy.com/client/";
let username= "maria426282@gmail.com";
let password= "Password123.";

exports.customtest= base.test.extend({
  authenticatedPage: async ({ browser }, use) => {
    // Perform login steps here
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    await page.locator("#userEmail").fill(username);
    await page.locator("#userPassword").fill(password);
    await page.locator("[name='login']").click();
    await page.waitForLoadState('networkidle');
    await use(page);
    },
    createOrder: async ({},use) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    const response = await apiUtils.createOrder(order);
    await use(response);
    
    }
});