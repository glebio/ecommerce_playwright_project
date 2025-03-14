import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    use: {
        headless: false,
        launchOptions: {
            args: ['--window-size=1920,1080'],
        },
        baseURL: 'https://shop.qaresults.com',
        trace: 'on-first-retry',
        navigationTimeout: 30000,
    },
    reporter: String(process.env['PW_TEST_REPORTER'] || '').toLowerCase().includes('idea')
        ? 'null'
        : [
            ['allure-playwright'],
        ],
    projects: [
        {
            name: 'Google Chrome',
            use: {
                channel: 'chrome',
                viewport: null,
            },
        },
    ],
    metadata: {
        tags: ['smoke'],
    },
});