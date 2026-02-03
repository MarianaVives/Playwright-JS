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
  expect:{
    timeout: 40*1000 //Exclusively for assertion validations
  },
  reporter: 'html',
  use: {
    //Default timeout is 30s
    browserName : 'chromium'
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

});
module.exports = config //Make it available to all the project

