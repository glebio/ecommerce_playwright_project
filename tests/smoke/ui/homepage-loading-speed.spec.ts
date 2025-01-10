import {test, expect} from '@playwright/test';
import config from "../../../playwright.config";

test('Check page load speed and performance metrics', async ({page}) => {
    // Extract baseURL from Playwright configuration
    const baseURL = config.use?.baseURL || '';
    if (!baseURL) {
        throw new Error('Base URL is not defined in Playwright configuration.');
    }

    // Navigate to the main page
    await page.goto(baseURL);

    // Retrieve performance timing metrics
    const performanceTiming = JSON.parse(
        await page.evaluate(() => JSON.stringify(window.performance.timing))
    );

    // Helper function to calculate timing metrics
    const calculateTiming = (start: number, end: number) => end - start;

    // Extract key performance metrics
    const timeToFirstByte = calculateTiming(performanceTiming.navigationStart, performanceTiming.responseStart);
    const serverResponseTime = calculateTiming(performanceTiming.responseStart, performanceTiming.responseEnd);
    const domContentLoaded = calculateTiming(performanceTiming.navigationStart, performanceTiming.domContentLoadedEventEnd);
    const totalLoadTime = calculateTiming(performanceTiming.navigationStart, performanceTiming.loadEventEnd);

    // Log performance metrics for debugging
    console.log('Performance Metrics:');
    console.log(`Time to First Byte (TTFB): ${timeToFirstByte} ms`);
    console.log(`Server Response Time: ${serverResponseTime} ms`);
    console.log(`DOM Content Loaded: ${domContentLoaded} ms`);
    console.log(`Total Load Time: ${totalLoadTime} ms`);

    // Assertions for critical metrics
    expect(timeToFirstByte).toBeLessThan(3000); // TTFB < 3 seconds
    expect(serverResponseTime).toBeLessThan(500); // Server response < 500ms
    expect(domContentLoaded).toBeLessThan(3000); // DOMContentLoaded < 3 seconds
    expect(totalLoadTime).toBeLessThan(3000); // Total load time < 3 seconds

    // Retrieve and log paint metrics (FCP and LCP)
    const paintMetrics = JSON.parse(
        await page.evaluate(() => JSON.stringify(window.performance.getEntriesByType('paint')))
    );

    const fcp = paintMetrics.find((entry: any) => entry.name === 'first-contentful-paint')?.startTime;
    const lcp = paintMetrics.find((entry: any) => entry.name === 'largest-contentful-paint')?.startTime;

    console.log('Paint Metrics:');
    console.log(`First Contentful Paint (FCP): ${fcp} ms`);
    console.log(`Largest Contentful Paint (LCP): ${lcp} ms`);

    // Assertions for paint metrics
    if (fcp !== undefined) {
        expect(fcp).toBeLessThan(3000); // FCP < 3 seconds
    }
    if (lcp !== undefined) {
        expect(lcp).toBeLessThan(3500); // LCP < 3.5 seconds
    }
});