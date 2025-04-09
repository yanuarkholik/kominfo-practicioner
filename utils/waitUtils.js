const { until, wait, By} = require('selenium-webdriver');
const config = require('../config/config.json')
const screenshotUtils = require('./screenshotUtils');
const { elementIsDisabled } = require('selenium-webdriver/lib/until');
const { setTimeout: sleep } = require('timers/promises');


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
      const element = await driver.findElement(By.xpath(selector))
      const isVisible = await driver.wait(until.elementIsVisible(await element))
      if (isVisible) {
        console.log(`Element located: ${selector}`);
        return element;
      }
    } catch (error) {
      if (error.name === 'StaleElementReferenceError') {
        console.log(`Stale element reference: ${selector}, retrying...`);
        continue;
      }
      console.log(`Attempt failed for element: ${selector}`);
    }
    await sleep(interval);
  }
  // Take screenshot if element is not found
  // console.error(`Element not found: ${selector} within ${timeout} ms`);
  // await screenshotUtils.takeScreenShot(driver)
  // throw new Error(`Element with selector "${selector}" not found within ${timeout} ms`);
}

module.exports = {
  waitForElement: waitForElement,
}

