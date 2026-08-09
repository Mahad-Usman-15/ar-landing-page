# AbdurRahman Mahmood — Landing Page

Conversion-focused personal brand site for AbdurRahman Mahmood, Business & Creative Strategist.
Built with Next.js 16 (App Router), Tailwind CSS v4, TypeScript, and Resend for contact-form delivery.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The contact form is the only part that needs configuration. Without `RESEND_API_KEY`
the form still validates and responds, but tells visitors to email directly instead
of silently failing.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes, to send mail | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_FROM_EMAIL` | no | Verified sender on your Resend domain. Defaults to Resend's shared test sender. |
| `CONTACT_TO_EMAIL` | no | Where enquiries land. Defaults to the address in `lib/data.ts`. |
| `NEXT_PUBLIC_SITE_URL` | before deploy | Public origin used for canonical URLs, sitemap, and Open Graph tags. |

`CONTACT_FROM_EMAIL` must be on a domain you have verified in Resend — mail from an
unverified domain is rejected.

## Structure

| Path | What's there |
|---|---|
| `app/page.tsx` | Section composition and JSON-LD structured data |
| `app/layout.tsx` | Fonts and all SEO metadata |
| `app/actions.ts` | Contact form Server Action (validation + Resend) |
| `components/` | One file per section, plus `motion.tsx` for scroll effects |
| `lib/data.ts` | Services, portfolio items, experience, contact details — edit content here |
| `public/portfolio/` | Portfolio images and showreels served to the browser |

Content changes (services, roles, portfolio items, contact details) are almost always
edits to `lib/data.ts` rather than to components.

## Design

Design tokens come from `DESIGN.md` — a black canvas with acid yellow `#dbff00` as the
single accent, condensed display type over a light geometric body face. Tokens live in
the `@theme` block of `app/globals.css`.

Bebas Neue and Montserrat stand in for the licensed Zuume and Paralucent faces in the
spec. Swapping in the real fonts means replacing the `next/font` calls in
`app/layout.tsx`; the `--font-display` and `--font-body` variables flow everywhere else.

The hero name is sized in container-query units (`cqw`) so it spans the viewport exactly
at any width. That value is calibrated to Bebas Neue's glyph width — changing the display
font or the name means recalibrating it in `components/Hero.tsx`.

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```
