# Edu Study Consultancy

Premium education consultancy website for admissions guidance, career counselling, college discovery, and lead capture.

## Tech stack

- Next.js App Router (JavaScript)
- Mantine UI + SCSS Modules
- Framer Motion
- Nodemailer (enquiry email)

## Pages

- `/` Home
- `/about` About Us
- `/services` Services
- `/colleges` College directory (search + filters)
- `/colleges/[slug]` SEO college detail pages
- `/contact` Contact + enquiry form
- `/terms` Terms & Conditions

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill SMTP settings in `.env.local` for enquiry emails (required in production — every form submit sends mail):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`, contact/social URLs

For Gmail, use `smtp.gmail.com` + port `587`, and set `SMTP_PASS` to a Google App Password (2FA must be on). Locally, if `SMTP_PASS` is empty, mail falls back to an Ethereal test inbox (preview URL in server logs / API response). Production requires real SMTP or returns 503.

4. Run locally:

```bash
pnpm dev
```

Open `http://localhost:3000`.

5. Verify enquiry email (dev server must be running):

```bash
pnpm test:email
```

## Notes

- No admin panel in this phase — colleges are seeded in `src/data/colleges.js` (42 entries).
- Lead capture uses `/api/enquiry` with Indian mobile validation + honeypot spam protection.
- Branding: deep blue + gold + white.
