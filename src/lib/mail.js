import nodemailer from 'nodemailer';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getMailConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const to = (process.env.ENQUIRY_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || '').trim();
  const from = (process.env.ENQUIRY_FROM_EMAIL || user || '').trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true';

  return {
    host,
    user,
    pass,
    to,
    from,
    port,
    secure,
    configured: Boolean(host && user && pass && to && from),
  };
}

function allowEtherealFallback() {
  if (process.env.SMTP_USE_ETHEREAL === 'true') return true;
  if (process.env.SMTP_USE_ETHEREAL === 'false') return false;
  return process.env.NODE_ENV !== 'production';
}

function buildEnquiryBodies(payload) {
  const rows = [
    ['Name', payload.name],
    ['Mobile', payload.mobile],
    ['Email', payload.email],
    ['Preferred course', payload.preferredCourse],
    ['College/University', payload.college],
    ['Location', payload.location],
    ['Qualification', payload.qualification],
    ['Message', payload.message],
    ['Submitted at', payload.submittedAt],
  ];

  const text = ['New counselling enquiry received', '', ...rows.map(([label, value]) => `${label}: ${value}`)].join(
    '\n',
  );

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#102a56">
      <h2 style="margin:0 0 12px">New counselling enquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 10px;border:1px solid #e5eaf2;font-weight:600;width:40%">${escapeHtml(label)}</td>
            <td style="padding:8px 10px;border:1px solid #e5eaf2">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join('')}
      </table>
    </div>
  `;

  return { text, html };
}

async function createTransporter() {
  const config = getMailConfig();

  if (config.configured) {
    return {
      transporter: nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: config.user,
          pass: config.pass,
        },
      }),
      to: config.to,
      from: config.from,
      mode: 'smtp',
    };
  }

  if (!allowEtherealFallback()) {
    const error = new Error(
      'Email is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and ENQUIRY_TO_EMAIL.',
    );
    error.code = 'MAIL_NOT_CONFIGURED';
    throw error;
  }

  const testAccount = await nodemailer.createTestAccount();
  console.warn(
    '[mail] SMTP not fully configured — using Ethereal test inbox. Set SMTP_PASS for real Gmail delivery.',
  );

  return {
    transporter: nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    }),
    to: process.env.ENQUIRY_TO_EMAIL?.trim() || testAccount.user,
    from: testAccount.user,
    mode: 'ethereal',
  };
}

/**
 * Sends the enquiry notification email to the consultancy inbox.
 * Throws with code MAIL_NOT_CONFIGURED when SMTP env is incomplete in production.
 * In local/dev (or SMTP_USE_ETHEREAL=true), falls back to Ethereal and returns a preview URL.
 */
export async function sendEnquiryEmail(payload) {
  const { transporter, to, from, mode } = await createTransporter();
  const { text, html } = buildEnquiryBodies(payload);

  const info = await transporter.sendMail({
    from: `"Edu Study Consultancy" <${from}>`,
    to,
    replyTo: payload.email,
    subject: `New counselling enquiry — ${payload.name}`,
    text,
    html,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info) || null;
  if (previewUrl) {
    console.info('[mail] Ethereal preview:', previewUrl);
  }

  return { mode, messageId: info.messageId, previewUrl };
}
