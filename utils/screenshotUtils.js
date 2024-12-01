const fs = require("fs");
const path = require("path")
const dateUtils = require('./dateUtils')
const screenshotDirectory = path.join(__dirname, "../results")

async function takeScreenShot(driver) {
    const date = new Date();
    const screenshot = await driver.takeScreenshot();
    
    const formattedDate = dateUtils.formatDate(date);
    const screenshotPath = `${screenshotDirectory}/screenshot_${formattedDate}.png`;
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    return console.log(`Screenshot saved at: ${screenshotPath}`)
}

module.exports = {
    takeScreenShot: takeScreenShot,
}
