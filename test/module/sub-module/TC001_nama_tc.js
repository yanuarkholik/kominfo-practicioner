const { By, Key, until } = require('selenium-webdriver');
require('chromedriver');
const reusable_step = require('../../../page/reusable-test');

describe('project_name', function() {
    describe('module_name', function() {
        describe('sub-module_name', function() {
            before(async function() {
                // before parameters
            })
            after(async function() {
                // after parameters
            })
            it('[TC0001] Test step 1', async function() 
            {
                // test case here
            })
            it('[TC0001] Test step 2', async function() 
            {
                // test case here
            })
        })
    })
})