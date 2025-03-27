const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
const elementUtils = require('../utils/elementUtils');
const config = require('../config/config.json')


class LoginPage{
    constructor(driver) {
        this.driver = driver
    }
    async getUrl(url = config.baseUrl) {
        await this.driver.get(url)
    }
    async login(username, password) {
        this.getUrl()

        // write actual login test case

        
    }
}

module.exports = LoginPage

