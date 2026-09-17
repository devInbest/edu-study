export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Edu Study Consultancy';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.edustudyconsultancy.com';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@edustudyconsultancy.com';
export const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 98765 43210';

const env = {
  appName: APP_NAME,
  siteUrl: SITE_URL,
  whatsappNumber: WHATSAPP_NUMBER,
  contactEmail: CONTACT_EMAIL,
  contactPhone: CONTACT_PHONE,
};

export default env;
