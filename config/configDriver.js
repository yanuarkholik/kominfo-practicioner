const { Builder } = require('selenium-webdriver');
const conf = require('./config.json');
require('dotenv').config();

const defaultConfig = {
  browser: process.env.BROWSER || conf.browsers.chrome, // Default browser
  headless: process.env.HEADLESS === 'true', // Headless mode
  timeout: parseInt(process.env.TIMEOUT || conf.timeout, 10), // Default timeout
};

/**
 * Creates a configured Selenium WebDriver instance.
 * @param {Object} options - Configuration options.
 * @param {string} options.browser - Browser to use (default: chrome).
 * @param {boolean} options.headless - Run browser in headless mode (default: false).
 * @returns {WebDriver} - Configured WebDriver instance.
 */
function createDriver(options = {}) {
  const config = { ...defaultConfig, ...options };

  // Dynamically load the browser-specific options
  let browserOptions;
  switch (config.browser) {
    case 'chrome':
      const chrome = require('selenium-webdriver/chrome');
      browserOptions = new chrome.Options();
      if (config.headless) browserOptions.addArguments(
        '--disable-gpu', )
        // '--window-size=1920,1080')
      browserOptions.addArguments('--start-maximized');
      break;

    case 'firefox':
      const firefox = require('selenium-webdriver/firefox');
      browserOptions = new firefox.Options();
      if (config.headless) browserOptions.addArguments('-headless');
      break;

    default:
      throw new Error(`Unsupported browser: ${config.browser}`);
  }

  // Build the driver
  const driver = new Builder()
    .forBrowser(config.browser)
    .setChromeOptions?.(browserOptions) // For Chrome
    .setFirefoxOptions?.(browserOptions) // For Firefox
    .build();

  driver.manage().setTimeouts({ implicit: config.timeout });

  return driver;
}

module.exports = { createDriver };
