export const APP_NAME =
  import.meta.env.VITE_APP_NAME ||
  process.env.NEXT_PUBLIC_APP_NAME ||
  'Edu Study Consultancy';
export const SITE_URL =
  import.meta.env.VITE_SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://www.edustudyconsultancy.com';
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER ||
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  '917667430388';
export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  'studywala202226@gmail.com';
export const CONTACT_PHONE =
  import.meta.env.VITE_CONTACT_PHONE ||
  process.env.NEXT_PUBLIC_CONTACT_PHONE ||
  '+91 76674 30388';

const env = {
  appName: APP_NAME,
  siteUrl: SITE_URL,
  whatsappNumber: WHATSAPP_NUMBER,
  contactEmail: CONTACT_EMAIL,
  contactPhone: CONTACT_PHONE,
};

export default env;
