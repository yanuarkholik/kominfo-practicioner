const config = require('../config/config.json')
const screenshotUtils = require('./screenshotUtils')


/**
 * Waits for an element to be located and visible on the page within the given timeout.
 * If the element is not found, captures a screenshot for debugging.
 *
 * @param {WebDriver} driver - Selenium WebDriver instance.
 * @param {string} selector - XPath selector of the element to locate.
 * @param {number} [timeout=30000] - Maximum time to wait for the element (in milliseconds).
 * @param {number} [interval=500] - Polling interval (in milliseconds).
 * @returns {Promise<WebElement>} The located WebElement.
 * @throws {Error} If the element is not found or visible within the timeout.
 */
async function waitForElement(driver, selector, timeout = config.timeout, interval = config.interval) {
    const startTime = Date.now();
  
    while (Date.now() - startTime < timeout) {
      console.log(`Locating element: ${selector}`);
      try {
        const element = await driver.wait(until.elementLocated(By.xpath(selector)), interval);
        const isVisible = await element.isDisplayed();
        if (isVisible) {
          console.log(`Element located: ${selector}`);
          return element;
        }
      } catch (error) {
        // Log error but continue trying until timeout
        console.log(`Attempt failed for element: ${selector}`);
      }
      await driver.sleep(interval); // Wait before retrying
    }
    // Take screenshot if element is not found
    console.error(`Element not found: ${selector} within ${timeout} ms`);
    await screenshotUtils.takeScreenShot(driver)
    throw new Error(`Element with selector "${selector}" not found within ${timeout} ms`);
}

module.exports = {
    waitForElement: waitForElement,
}

