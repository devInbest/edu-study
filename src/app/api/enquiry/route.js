import nodemailer from 'nodemailer';

function isValidIndianMobile(mobile) {
  return /^[6-9]\d{9}$/.test(mobile);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name = '',
      mobile = '',
      email = '',
      preferredCourse = '',
      college = '',
      location = '',
      qualification = '',
      message = '',
      website = '',
    } = body;

    // Honeypot — bots fill this field
    if (website) {
      return Response.json({ message: 'Enquiry received.' }, { status: 200 });
    }

    if (!name.trim() || !isValidIndianMobile(String(mobile).trim()) || !isValidEmail(String(email).trim())) {
      return Response.json({ error: 'Please provide valid name, mobile, and email.' }, { status: 400 });
    }

    if (!preferredCourse || !location.trim() || !qualification) {
      return Response.json({ error: 'Course, location, and qualification are required.' }, { status: 400 });
    }

    const payload = {
      name: name.trim(),
      mobile: String(mobile).trim(),
      email: String(email).trim(),
      preferredCourse,
      college: college.trim() || 'Not specified',
      location: location.trim(),
      qualification,
      message: message.trim() || 'No message provided',
      submittedAt: new Date().toISOString(),
    };

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const enquiryTo = process.env.ENQUIRY_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    const enquiryFrom = process.env.ENQUIRY_FROM_EMAIL || smtpUser;

    if (smtpHost && smtpUser && smtpPass && enquiryTo) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Edu Study Consultancy" <${enquiryFrom}>`,
        to: enquiryTo,
        replyTo: payload.email,
        subject: `New counselling enquiry — ${payload.name}`,
        text: [
          'New counselling enquiry received',
          '',
          `Name: ${payload.name}`,
          `Mobile: ${payload.mobile}`,
          `Email: ${payload.email}`,
          `Preferred course: ${payload.preferredCourse}`,
          `College/University: ${payload.college}`,
          `Location: ${payload.location}`,
          `Qualification: ${payload.qualification}`,
          `Message: ${payload.message}`,
          `Submitted at: ${payload.submittedAt}`,
        ].join('\n'),
        html: `
          <h2>New counselling enquiry</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Mobile:</strong> ${payload.mobile}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Preferred course:</strong> ${payload.preferredCourse}</p>
          <p><strong>College/University:</strong> ${payload.college}</p>
          <p><strong>Location:</strong> ${payload.location}</p>
          <p><strong>Qualification:</strong> ${payload.qualification}</p>
          <p><strong>Message:</strong> ${payload.message}</p>
          <p><strong>Submitted at:</strong> ${payload.submittedAt}</p>
        `,
      });
    } else {
      // Dev / missing SMTP — log lead so local testing still works
      console.info('[enquiry]', payload);
    }

    return Response.json({
      message: 'Thank you! Our counsellor will contact you soon.',
    });
  } catch (error) {
    console.error('[enquiry-error]', error);
    return Response.json(
      { error: 'Unable to send enquiry right now. Please try WhatsApp or call us.' },
      { status: 500 }
    );
  }
}
