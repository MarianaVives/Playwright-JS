// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests', //all tests in that folder will get triggered
  timeout: 40*1000,//override the default settings
  //timeout: 100*1000, //For debugging
  expect:{
    timeout: 5000 //Exclusively for assertion validations
  },
  reporter: 'html',
  use: {
    ///Default timeout is 30s
    //browserName : 'webkit',
    browserName : "chromium",
    headless : false,
    screenshot: "on", //screenshot for every step
    trace: "retain-on-failure", //on, off, retain-on-failure log information that can be important
    
  },

});
module.exports = config //Make it available to all the project

