const fs = require("fs");
const path = require("path");
const {expect} = require("chai");
const {By, until, Key} = require("selenium-webdriver");

const waitUtils = require('./waitUtils')

/**
 * Clicks a button repeatedly until the element defined by the XPath selector is found and enabled.
 * 
 * @param {string} selector - XPath selector of the target element.
 */
async function clickButtonUntilFindXpath(driver, selector) {
  var element = await waitUtils.waitForElement(driver, selector);
  await element.click();
  console.log(`Element ${selector} is clicked`);
}

/**
 * Clicks a button specified by the XPath selector after ensuring it is located.
 * 
 * @param {string} selector - XPath selector of the button to click.
 */
async function clickButtonXpath(driver, selector) {
  const ele = await waitUtils.waitForElement(driver, selector)
  await ele.click()
}

/**
 * Fills an input field specified by the XPath selector with the given value after clearing its existing content.
 * 
 * @param {string} selector - XPath selector of the input field.
 * @param {string} value - Value to input into the field.
 */
async function fillFilledXpath(driver, selector, value) {
  const ele = await waitUtils.waitForElement(driver, selector);
  await ele.clear();
  await ele.sendKeys(value);
}

/**
 * Fills an input field specified by the XPath selector with the given value after clearing its existing content.
 * 
 * @param {string} selector - XPath selector of the input field.
 * @param {string} value - Value to input into the field.
 */
async function pressKeyArrowDown(driver, selector) {
  const ele = await waitUtils.waitForElement(driver, selector);
  await ele.sendKeys(Key.ARROW_DOWN)
  await ele.sendKeys(Key.ARROW_DOWN)
  await ele.sendKeys(Key.ENTER);
}

/**
 * Selects an option by clicking a dropdown specified by the XPath selector.
 * 
 * @param {string} selector - XPath selector of the dropdown to click.
 */
async function fillSelectXpath(driver, selector, value) {
  const ele = await waitUtils.waitForElement(driver, selector);
  await ele.sendKeys(value);
}

/**
 * Scrolls to an element specified by the XPath selector, centering it in view smoothly.
 * 
 * @param {string} selector - XPath selector of the target element.
 */
async function scrollByXpath(driver, selector) {
  await waitUtils.waitForElement(driver, selector);
  const ScrollToNationality = await driver.findElement(By.xpath(selector));
  await driver.executeScript(
    "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });",
    ScrollToNationality
  );
  await driver.sleep(1000);
}

/**
 * Clears the content of an input field specified by the XPath selector.
 * 
 * @param {string} selector - XPath selector of the input field to clear.
 */
async function clearInputXpath(driver, selector) {
  const ele = driver.findElement(By.xpath(selector));
  await ele.clear();
}

/**
 * Retrieves and returns the text content of an element specified by the XPath selector.
 * 
 * @param {string} selector - XPath selector of the element.
 * @returns {Promise<string>} The text content of the element.
 */
async function getTextXpath(driver, selector) {
  // tunggu sampai melihat element
  await waitUtils.waitForElement(driver, selector);
  const elemen = await driver.wait(until.elementLocated(By.xpath(selector)));
  const text = await elemen.getText();
  return text;
}

/**
 * Verifies that an element containing the specified text is present on the page.
 * Throws an error if the element is not found or the text does not match the expected value.
 * 
 * @param {string} selector - XPath selector of the element.
 * @param {string} expected - Expected text content of the element.
 */
async function expectElementInPageByText(driver, selector, expected) {
  await waitUtils.waitForElement(driver, selector);
  const element = await driver.findElement(By.xpath(selector));
  let text = "";
  text = await element.getText();

  if (text !== expected) {
    throw new Error(`Expected text "${expected}" but found "${text}"`);
  }
}

/**
 * Verifies that an element specified by the XPath selector is present on the page.
 * Throws an error if the element is not found.
 * 
 * @param {string} selector - XPath selector of the element.
 */
async function expectElementInPage(driver, selector) {
  await waitUtils.waitForElement(driver, selector);
}

/**
 * Counts the number of elements that match the given XPath selector.
 * 
 * 1. Waits for the element to appear using the `waitForElement` function, ensuring it's visible and available. 
 * 2. Finds all elements that match the provided XPath selector using `driver.findElements`.
 * 3. Returns the count of the matched elements by checking the length of the resulting array.
 * 
 * @param {string} selector - The XPath selector used to find the elements.
 * @returns {Promise<number>} - A promise that resolves to the number of matching elements.
 */
async function countElements(driver, selector) {
  await waitUtils.waitForElement(driver, selector);  // Wait until the element is located
  let count = await driver.findElements(By.xpath(selector));  // Find all matching elements

  return count.length;
}

module.exports = {
  pressKeyArrowDown: pressKeyArrowDown, 
  getTextXpath: getTextXpath,
  scrollByXpath: scrollByXpath,
  countElements: countElements,
  fillFilledXpath: fillFilledXpath,
  fillSelectXpath: fillSelectXpath,
  clearInputXpath: clearInputXpath,
  clickButtonXpath: clickButtonXpath,
  expectElementInPage: expectElementInPage,
  clickButtonUntilFindXpath: clickButtonUntilFindXpath,
  expectElementInPageByText: expectElementInPageByText,
};
