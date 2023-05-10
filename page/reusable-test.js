/* Halaman Login terpisah untuk memudahkan apabila terdapat perubahan pada halaman login */

const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

async function step (user,pswd) {
    // reusable step here
}

module.exports = {step: step,};
  