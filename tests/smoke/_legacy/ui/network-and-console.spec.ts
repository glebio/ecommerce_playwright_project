import {test, expect} from '@playwright/test';

test('Verify that all main resources load without errors @smoke', async ({page}) => {
    const resourceErrors: string[] = [];
    const consoleErrors: string[] = [];
    const brokenImages: string[] = [];
    let hasErrors = false;

    // Listen for network requests and responses
    page.on('requestfinished', async request => {
        const resourceType = request.resourceType();
        const response = await request.response();

        if (['stylesheet', 'script', 'image'].includes(resourceType)) {
            if (response && response.status() !== 200) {
                resourceErrors.push(
                    `❌ Failed to load ${resourceType}: ${request.url()} (Status: ${response.status()})`
                );
            }
        }
    });

    // Listen for console errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(`❌ Console error: ${msg.text()}`);
        }
    });

    // Navigate to the page
    await page.goto('https://shop.qaresults.com');

    // Evaluate broken images with detailed information
    const brokenImageDetails = await page.evaluate(() => {
        return Array.from(document.images)
            .filter(img => !img.complete || img.naturalWidth === 0)
            .map(img => ({
                src: img.src || '[No src attribute]',
                alt: img.alt || '[No alt attribute]',
                outerHTML: img.outerHTML,
            }));
    });

    brokenImageDetails.forEach(img => {
        brokenImages.push(
            `❌ Broken Image:\n  src: ${img.src}\n  alt: ${img.alt}\n  HTML: ${img.outerHTML}`
        );
    });

    // Log detailed summary
    console.log('========== Detailed Summary ==========');
    if (resourceErrors.length > 0) {
        hasErrors = true;
        console.log(resourceErrors.join('\n'));
    } else {
        console.log('✅ All resources loaded successfully.');
    }

    if (consoleErrors.length > 0) {
        hasErrors = true;
        console.log(consoleErrors.join('\n'));
    } else {
        console.log('✅ No console errors detected.');
    }

    if (brokenImages.length > 0) {
        hasErrors = true;
        console.log(brokenImages.join('\n'));
    } else {
        console.log('✅ No broken images found.');
    }
    console.log('======================================');

    // Assertions
    expect(resourceErrors).toHaveLength(0); // Ensure no resource errors
    expect(consoleErrors).toHaveLength(0); // Ensure no console errors
    expect(brokenImages).toHaveLength(0); // Ensure no broken images

    // Throw an error if there are any issues
    if (hasErrors) {
        throw new Error('Test failed due to the issues mentioned above.');
    }
});