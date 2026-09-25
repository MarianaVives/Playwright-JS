const { test, expect, request } = require('@playwright/test');
const {customtest} = require('../utils/fixtures');
let url= "https://rahulshettyacademy.com/client";

customtest("Fixtures demo", async ({ authenticatedPage, createOrder }) => {
//Login application and verify order is created
// await page.goto('url');
//This authenticatedPage has to have login information
    await authenticatedPage.goto(url); 
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await authenticatedPage.reload();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
});