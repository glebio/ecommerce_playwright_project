// playwright.config.ts
import {defineConfig} from '@playwright/test';

const isCI = !!process.env.CI;

const isIdea = String(process.env['PW_TEST_REPORTER'] || '')
    .toLowerCase()
    .includes('idea');

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,

    use: {
        headless: isCI,
        launchOptions: {
            args: ['--window-size=1920,1080'],
        },
        baseURL: process.env.BASE_URL ?? 'https://shop.qaresults.com',
        trace: 'on-first-retry',
        navigationTimeout: 30_000,
    },

    projects: isCI
        ? [
            {
                name: 'chromium',
                use: {browserName: 'chromium', viewport: null},
            },
        ]
        : [
            {
                name: 'Google Chrome',
                use: {channel: 'chrome', viewport: null},
            },
        ],

    reporter: isIdea
        ? 'null'
        : [
            ['allure-playwright'],
            ...(isCI ? [['html', {open: 'never'}] as const] : []),
        ],
});