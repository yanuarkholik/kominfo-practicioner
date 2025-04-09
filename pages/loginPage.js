const { By } = require('selenium-webdriver');
const elementUtils = require('../utils/elementUtils');
const config = require('../config/config.json');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
    }

    async getUrl(url = config.baseUrl) {
        await this.driver.get(url);
    }

    async login(username, password) {
        await this.getUrl();

        // Klik tombol Login
        await elementUtils.clickButtonXpath(this.driver, "//a[text()='Login']");
        await elementUtils.clickButtonUntilFindXpath(this.driver, "//*[contains(text(),  'Back to Application')]")
        await elementUtils.clickButtonXpath(this.driver, "//a[text()='Login']");

        // Jika ada form login, isi data (opsional, bisa disesuaikan)
        if (username && password) {
            await elementUtils.fillSelectXpath(this.driver,"//input[@name='username']" , username);
            await elementUtils.fillFilledXpath(this.driver, "//input[@name='password']", password);
            await elementUtils.clickButtonXpath(this.driver, "//input[@type='submit']");
            await elementUtils.expectElementInPage(this.driver, "//*[text()='Platform Digital Nasional']");
        }
    }
}

module.exports = LoginPage;
