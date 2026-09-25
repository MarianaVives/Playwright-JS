class LoginPage{

constructor(page){
    this.page = page;
    this.sinInButton = page.locator("[value='Login']");
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
}

async navigateToLoginPage(url){
    await page.goto(url);
}

async validLogin(username, password){
    await this.username.fill(username);
    await this.password.fill(password);
    await this.sinInButton.click();
    }
}
module.exports = {LoginPage};
