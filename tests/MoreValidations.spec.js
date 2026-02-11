const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test("hidden object validations with playwright", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page).toHaveTitle("Practice Page");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeVisible();
});

test("pop up validations with playwright", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#alertbtn").click();
    //Page on allow us to listen to events
    //This is a JS event
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#name").fill("Ana");
    await page.locator("#confirmbtn").click();
    page.on("dialog", dialog => dialog.dismiss());
});

test("hover cursor with playwright", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#alertbtn").click();
    //Page on allow us to listen to events
    //This is a JS event
    await page.locator("#mousehover").hover();
    await page.locator("//a[text()='Reload']").click();
});


test("frames with playwright", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#alertbtn").click();
    //Tell playwright to switch to iframe
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator("div[class='text'] h2").textContent();
    const number_participants = textCheck.split(" ")[1];
    console.log("text check" + textCheck + " number participants " + number_participants );
});
