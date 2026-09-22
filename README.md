# Edu Study Consultancy

Premium education consultancy website for admissions guidance, career counselling, college discovery, and lead capture.

## Tech stack

- Vite + React (SPA)
- React Router
- Mantine UI + SCSS Modules
- Framer Motion
- PHP enquiry endpoint (Hostinger Premium)

## Pages

- `/` Home
- `/about` About Us
- `/services` Services
- `/colleges` College directory (search + filters)
- `/colleges/:slug` College detail pages
- `/courses/:slug` Course listing pages
- `/contact` Contact + enquiry form
- `/terms` Terms & Conditions
- `/privacy` Privacy Policy

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Run locally:

```bash
pnpm dev
```

Open `http://localhost:3000`. Enquiry submits hit a local mock at `/api/enquiry.php`.

## Production build (Hostinger Premium)

```bash
pnpm build
```

Upload **everything inside `dist/`** to `public_html` (including `.htaccess` and `api/`).

On the server:

1. Copy `api/enquiry-config.example.php` → `api/enquiry-config.php`
2. Set `to_email` / `from_email` (prefer a mailbox on your Hostinger domain for `from_email`)
3. Ensure SSL is enabled for `edustudyconsultancy.com`

## Notes

- No admin panel — colleges are seeded in `src/data/colleges.js`.
- Lead capture posts to `/api/enquiry.php` (PHP `mail()` on Hostinger).
- Branding: deep blue + gold + white.
