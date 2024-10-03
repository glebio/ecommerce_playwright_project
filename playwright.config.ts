import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    use: {
        viewport: null,
        launchOptions: {
            args: ['--start-maximized'],
        },
        // baseURL: 'https://qaresults.com',
        baseURL: 'https://shop.qaresults.com',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'Google Chrome',
            use: {...devices['Desktop Chrome'], channel: 'chrome'},
        },
    ],
});
