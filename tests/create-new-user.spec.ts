import {test, expect} from '@playwright/test';
import {HomePage} from '../pageObjects/HomePage';
import axios from 'axios';

interface MailinatorResponse {
    messages: { subject: string }[];
}

test('Fake registration and check email in Mailinator', async ({page}) => {
    const homePage = new HomePage(page);
    const testEmail = 'test-user-qa@mailinator.com';

    // Step 1: Navigate to the homepage and register with a fake email
    await homePage.navigate();
    await homePage.registerUser({
        firstName: 'Test',
        lastName: 'User',
        email: testEmail,
        phone: '1234567890',
        password: 'Password123'
    });

    // Step 2: Simulate waiting for the email
    await page.waitForTimeout(5000); // Wait for the email to arrive

    // Step 3: Check Mailinator inbox via API
    const response = await axios.get<MailinatorResponse>(`https://api.mailinator.com/v2/domains/public/inboxes/test-user-qa`);
    const emails = response.data.messages;

    // Step 4: Verify that the registration confirmation email was received
    expect(emails.length).toBeGreaterThan(0);
    const confirmationEmail = emails.find(email => email.subject.includes('Registration Confirmation'));
    expect(confirmationEmail).toBeTruthy();
});
