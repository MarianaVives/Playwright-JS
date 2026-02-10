//Documentation: https://playwright.dev/
const { test, expect } = require('@playwright/test');

test.only("E2E shop products happy path using playwright getBy methods", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    await expect(page).toHaveTitle("Let's Shop");
    let email = "marianavivess@hotmail.com";
    let pass = "Password123";
    const product_name = "ZARA COAT 3";

    const username_loc = page.getByPlaceholder("email@example.com");
    const pass_loc = page.getByPlaceholder("enter your passsword");
    const signin_btn = page.getByRole("button", {name:"Login"});
    const shop_page_results_title = page.locator("#res");

    //Login
    await username_loc.fill(email);
    await pass_loc.fill(pass);
    await signin_btn.click();

    await expect(shop_page_results_title).toContainText("Showing")
    await page.waitForLoadState('networkidle'); //Discouraged - might be flaky
    await page.locator(".card-body b").first().waitFor();
    //Add product to cart
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