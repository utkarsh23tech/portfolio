/**
 * Portfolio contact form backend
 *
 * Setup:
 * 1. Create a Google Sheet with columns:
 *    Timestamp | Name | Email | Phone | Matter Type | Message | Page URL
 * 2. Rename the tab to "Sheet1"
 * 3. Extensions → Apps Script → paste this file
 * 4. Project Settings → Script Properties:
 *    TURNSTILE_SECRET = your Cloudflare Turnstile secret key
 * 5. Set EMAIL_TO below
 * 6. Deploy → New deployment → Web app
 *    Execute as: Me
 *    Who has access: Anyone
 */

const EMAIL_TO = 'YOUR_EMAIL@gmail.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.website) {
      return jsonResponse({
        success: false,
        error: 'Spam detected',
      });
    }

    const verified = verifyTurnstile(data.token);

    if (!verified) {
      return jsonResponse({
        success: false,
        error: 'Bot verification failed',
      });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone || '',
      data.matterType || '',
      data.message,
      data.page,
    ]);

    MailApp.sendEmail({
      to: EMAIL_TO,
      subject: 'New Portfolio Lead',
      htmlBody: `
        <h2>New Contact Submission</h2>
        <p><b>Name:</b> ${escapeHtml(data.name)}</p>
        <p><b>Email:</b> ${escapeHtml(data.email)}</p>
        <p><b>Phone:</b> ${escapeHtml(data.phone || 'Not provided')}</p>
        <p><b>Matter Type:</b> ${escapeHtml(data.matterType || 'Not specified')}</p>
        <p><b>Message:</b> ${escapeHtml(data.message)}</p>
        <p><b>Page:</b> ${escapeHtml(data.page)}</p>
      `,
    });

    return jsonResponse({
      success: true,
    });
  } catch (err) {
    return jsonResponse({
      success: false,
      error: err.toString(),
    });
  }
}

// Cloudflare public test secret — only validates tokens from test site keys.
const TURNSTILE_TEST_SECRET = '1x0000000000000000000000000000000AA';

function verifyTurnstile(token) {
  if (!token) {
    return false;
  }

  const secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET');

  if (secret && verifyTurnstileWithSecret(token, secret)) {
    return true;
  }

  return verifyTurnstileWithSecret(token, TURNSTILE_TEST_SECRET);
}

function verifyTurnstileWithSecret(token, secret) {
  const response = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'post',
    payload: {
      secret: secret,
      response: token,
    },
  });

  const result = JSON.parse(response.getContentText());
  return result.success === true;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
