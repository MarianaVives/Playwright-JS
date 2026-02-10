//Documentation: https://playwright.dev/
const { test, expect } = require('@playwright/test');

test.only("Calendar validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await expect(page).toHaveTitle("GreenKart - veg and fruits kart");

    const monthNumber = "10";
    const day = "15";
    const year = "2028";
    const expectedList = [monthNumber, day, year];

    //Select Calendar date
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='" + day + "']").click();
    //Assert that the date has been input correctly
    const inputs = page.locator('.react-date-picker__inputGroup__input');
    for (let i = 0; i < expectedList.length; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }
});