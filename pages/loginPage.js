const { Builder, By, Key, until } = require('selenium-webdriver');
const helper = require('../../helpers/InitElement');
const config = require('../config/config.json')

require('chromedriver');

describe('XL SSP', function() {
    describe('Login', function() {
        describe('Login Internal User', function(){
            before(async function() {
                // Before all
            })
            after(async function() {
                // await driver.sleep(3000);
                await driver.quit();
            })
            it('[TC0030] Can login using azure', async function() {

                /* As an Admin, I can login using azure
                * Open the login page
                * Click Login with Azure button
                * Input a valid email and password
                * Click the Sign In button
                * Displays Home page
                * */

                driver = await new Builder().forBrowser(config.browsers.chrome).build();

                let user = process.env.user;
                let pswd = process.env.pass;
            
                await driver.get(config.baseUrl);
                await driver.manage().window().maximize();
                
                await driver.sleep(5000)
            })
        })
    })
})
