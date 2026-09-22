/**
 * Verifies enquiry email delivery via POST /api/enquiry.
 * Usage: node scripts/verify-enquiry-email.mjs [baseUrl]
 * Default baseUrl: http://localhost:3000
 */

const baseUrl = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');

const payload = {
  name: 'Verify Test Student',
  mobile: '9876543210',
  email: 'verify.test@example.com',
  preferredCourse: 'MBBS',
  college: 'Test Medical College',
  location: 'Bengaluru',
  qualification: 'Class 12th',
  message: 'Automated verification of enquiry email sending.',
};

async function post(body) {
  const response = await fetch(`${baseUrl}/api/enquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

async function main() {
  console.log(`Verifying enquiry email against ${baseUrl}\n`);

  const invalid = await post({ ...payload, mobile: '123' });
  if (invalid.status !== 400) {
    throw new Error(`Expected 400 for invalid mobile, got ${invalid.status}`);
  }
  console.log('✓ Validation rejects bad mobile (400)');

  const honeypot = await post({ ...payload, website: 'http://spam.example' });
  if (honeypot.status !== 200) {
    throw new Error(`Expected 200 for honeypot, got ${honeypot.status}`);
  }
  console.log('✓ Honeypot silently accepts (200, no mail required)');

  const ok = await post(payload);
  if (ok.status !== 200) {
    throw new Error(
      `Expected 200 for valid enquiry, got ${ok.status}: ${ok.data.error || JSON.stringify(ok.data)}`,
    );
  }
  console.log('✓ Valid enquiry accepted (200)');
  console.log(`  message: ${ok.data.message}`);
  if (ok.data.previewUrl) {
    console.log(`  Ethereal preview: ${ok.data.previewUrl}`);
  } else {
    console.log('  (Check server logs for Ethereal preview URL, or your SMTP inbox)');
  }

  console.log('\nAll enquiry email checks passed.');
}

main().catch((error) => {
  console.error('\nVerification failed:', error.message);
  process.exit(1);
});
