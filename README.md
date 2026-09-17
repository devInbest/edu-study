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

3. Fill SMTP settings in `.env.local` for enquiry emails:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`, contact/social URLs

Without SMTP configured, enquiries still validate and log to the server console (useful in local development).

4. Run locally:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Notes

- No admin panel in this phase — colleges are seeded in `src/data/colleges.js` (42 entries).
- Lead capture uses `/api/enquiry` with Indian mobile validation + honeypot spam protection.
- Branding: deep blue + gold + white.
