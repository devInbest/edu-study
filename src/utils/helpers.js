import { WHATSAPP_NUMBER } from '@/constants/env';

export function getWhatsAppUrl(message = 'Hi, I would like free counselling from Edu Study Consultancy.') {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
