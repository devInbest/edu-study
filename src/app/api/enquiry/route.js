import { sendEnquiryEmail } from '@/lib/mail';

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

    const trimmedName = String(name).trim();
    const trimmedMobile = String(mobile).trim();
    const trimmedEmail = String(email).trim();
    const trimmedCollege = String(college).trim();
    const trimmedLocation = String(location).trim();
    const trimmedMessage = String(message).trim();

    if (
      !trimmedName ||
      trimmedName.length < 3 ||
      !/^[a-zA-Z\s.'-]+$/.test(trimmedName) ||
      !isValidIndianMobile(trimmedMobile) ||
      !isValidEmail(trimmedEmail)
    ) {
      return Response.json({ error: 'Please provide valid name, mobile, and email.' }, { status: 400 });
    }

    if (!preferredCourse || !trimmedLocation || trimmedLocation.length < 3 || !qualification) {
      return Response.json({ error: 'Course, location, and qualification are required.' }, { status: 400 });
    }

    if (!trimmedCollege || trimmedCollege.length < 3) {
      return Response.json({ error: 'College / University is required.' }, { status: 400 });
    }

    if (!trimmedMessage || trimmedMessage.length < 10 || trimmedMessage.length > 150) {
      return Response.json(
        { error: 'Please provide a message between 10 and 150 characters.' },
        { status: 400 },
      );
    }

    const payload = {
      name: trimmedName,
      mobile: trimmedMobile,
      email: trimmedEmail,
      preferredCourse,
      college: trimmedCollege,
      location: trimmedLocation,
      qualification,
      message: trimmedMessage,
      submittedAt: new Date().toISOString(),
    };

    await sendEnquiryEmail(payload);

    return Response.json({
      message: 'Thank you! Our counsellor will contact you soon.',
    });
  } catch (error) {
    console.error('[enquiry-error]', error);

    if (error?.code === 'MAIL_NOT_CONFIGURED') {
      return Response.json(
        { error: 'Enquiry email is not configured yet. Please try WhatsApp or call us.' },
        { status: 503 },
      );
    }

    return Response.json(
      { error: 'Unable to send enquiry right now. Please try WhatsApp or call us.' },
      { status: 500 },
    );
  }
}
