const loginModule = require('../../../pages/loginPage.js')
const elementUtils = require('../../../utils/elementUtils.js')
const createDriver = require('../../../config/configDriver.js')


describe('project_name', function() {
    let driver;
    let loginPage;
    describe('module_name', function() {
        describe('sub-module_name', function() {
            before(async function() {
                // before parameters
                driver = createDriver.createDriver({
                    headless: true,    // Override headless mode
                });
                loginPage = new loginModule(driver);
                await loginPage.getUrl()
            })
            after(async function() {
                // after parameters
                if (driver) await driver.quit();
            })
            it('[TC0001] Test step 1', async function() 
            {
                // test case here
                await elementUtils.expectElementInPage(driver, `//span[@class='navbar-logo']`)
            })
            it('[TC0001] Test step 2', async function() 
            {
                // test case here
            })
        })
    })
})
