import {test, expect} from '@playwright/test';

test("Get by label and playwrigt UI runner", async({page})=>{
    const pass = "abc123."

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill(pass);
    await page.getByRole("button", {name: "Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //5000 ms wait for the element to be visible /
    // 5 SECONDS DEFAULT TIMEOUTS FOR EXPECT
    await page.getByText("Success! The Form has been submitted successfully!.").toBeVisible();
    await page.getByText("Success! The Form has been submitted successfully!.").toBeVisible({timeout: 10000});

    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button", {name: "Add"}).click();
});

//Actions timeout vs assertions timeouts

test("Playwright UI runner", async({page})=>{
    //Time you need to complete the test execution.
    test.setTimeout(30*1000); //30 seconds for this test
    //Test Level overriding of the timeout
    const lowExpect = await expect.configure({timeout: 9000}); //10 seconds for this test
    const pass = "abc123."

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill(pass);
    await page.getByRole("button", {name: "Submit"}).click({timeout:10000}); //10 seconds for this action
    await lowExpect(page.locator(".my-4")).toHaveText("Shop");

});
