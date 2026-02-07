import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    // Загружаем ТОЛЬКО ci-smoke файлы, чтобы не трогать остальные тесты
    testMatch: /.*ci-smoke.*\.spec\.ts/,
    use: {
        headless: true,
        baseURL: process.env.BASE_URL ?? 'https://shop.qaresults.com',
        trace: 'on-first-retry',
        navigationTimeout: 30000,
    },
    projects: [
        {name: 'chromium', use: {browserName: 'chromium', viewport: null}},
    ],
    reporter: [['allure-playwright']],
});