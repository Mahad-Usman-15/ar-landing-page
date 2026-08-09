# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev     # dev server on :3000
npm run build   # production build — also runs the TypeScript check
npm start       # serve the production build
npm run lint    # eslint (flat config, eslint.config.mjs)
npx tsc --noEmit  # type-check alone, faster than a full build
```

There is no test framework installed and no test script. Verification here means
building and driving the real page (see Verifying changes below), not running tests.

## What this is

A single-page marketing site for one person — no routes beyond `/`, no database, no
auth. Everything renders from static content in `lib/data.ts`. The only server work is
one Server Action that emails the contact form.

## Architecture

**Content lives in `lib/data.ts`, not in components.** Services, portfolio items,
experience, nav links, and contact details are all exported from there and consumed by
the section components. Copy changes and adding/removing portfolio pieces are edits to
that one file. `CONTACT` in particular is referenced from four places (contact card,
footer, JSON-LD `sameAs`, and the Server Action's fallback recipient) — grep before
changing its shape.

**`app/page.tsx` composes sections and owns the JSON-LD.** Section components live in
`components/`, one per section, and are mostly Server Components. Only `Header`,
`Portfolio`, `Contact`, and `motion.tsx` are client components, each for a specific
reason (menu state, category filter, form state, scroll observers).

**`lib/contact.ts` exists because of a hard constraint, not preference.** A `"use server"`
module may only export async functions, so `ContactState` and `initialContactState`
cannot live in `app/actions.ts` — importing a non-function export from it yields
`undefined` on the client and crashes the form. Keep shared form types in `lib/contact.ts`.

**Design tokens flow `DESIGN.md` → `@theme` in `app/globals.css`.** `DESIGN.md` is the
source of truth for the visual system: black canvas, acid yellow `#dbff00` as the single
accent, condensed display type over a light geometric body face. Use the semantic
Tailwind colors (`canvas`, `charcoal`, `acid`, `mist`, `line`) rather than hex values.

Bebas Neue and Montserrat are stand-ins for the licensed Zuume and Paralucent faces named
in the spec. They are wired through the `--font-display` / `--font-body` variables in
`app/layout.tsx`, so swapping in the real fonts is a change to those two `next/font`
calls — with one exception noted below.

## Non-obvious constraints

**The hero name is calibrated to the display font.** `components/Hero.tsx` sizes the name
at `21.4cqw` inside an `@container`, because Bebas Neue renders "ABDURRAHMAN" at ~4.606×
its font-size. Container units, not `vw` — `vw` includes the scrollbar and overflows by
its width. Changing the display font or the name text requires re-measuring that ratio.

**Parallax is disabled below 640px** (`minWidth` prop in `components/motion.tsx`). Grids
collapse to a single column on small screens, where per-card offsets make stacked cards
collide instead of reading as depth. Keep that floor when adding new `Parallax` usages.

**`Reveal` must handle content scrolled past.** Its observer also fires on
`boundingClientRect.bottom < 0`, otherwise a reload with a restored scroll position or a
`#hash` landing leaves everything above the viewport permanently invisible.

**Do not add `priority` or `loading="eager"` to `next/image` here.** `priority` is
deprecated in Next 16 in favour of `preload`, and both emit a DPR-blind preload `<link>`
that reserves a variant the browser discards on high-DPR screens, producing a console
warning and a wasted fetch. In-viewport lazy images load immediately anyway, and the LCP
element on this page is the display type, not any image.

## Assets

`public/portfolio/` holds the derived, web-sized copies the site actually serves, and is
tracked in git. The top-level `/portfolio/` directory is the 125MB of raw originals
(including two videos over 45MB) and is gitignored, along with `/reference-web-screens/`
and `/aboutme.txt`. When adding portfolio work, put a web-sized copy in `public/portfolio/`
with a descriptive kebab-case filename and register it in `PORTFOLIO_ITEMS`.

## Contact form / Resend

`app/actions.ts` validates server-side, then sends via Resend. It degrades deliberately:
with no `RESEND_API_KEY` it tells the visitor to email directly rather than failing
silently, and logs the real cause server-side. `replyTo` is set to the enquirer so replies
reach the prospect.

The sender fallback is `onboarding@resend.dev`, which Resend restricts to delivering only
to the email address owning the API key. Reaching any other recipient requires verifying a
domain and setting `CONTACT_FROM_EMAIL` to an address on it. See `.env.example` for the
full variable set; `NEXT_PUBLIC_SITE_URL` also feeds canonical URLs, sitemap, and OG tags.

## SEO surface

Metadata lives in `app/layout.tsx`; JSON-LD (`Person`, `ProfessionalService`, `WebSite`)
is inlined in `app/page.tsx` and derives its service catalog from `SERVICES`. `sitemap.ts`,
`robots.ts`, and a generated `opengraph-image.tsx` are all file conventions in `app/`.
The page currently scores 100 on Lighthouse accessibility, best practices, and SEO —
re-audit after structural changes.

Two accessibility details that are load-bearing: the closed mobile menu uses `inert`
(not just `aria-hidden`, which left its links keyboard-focusable), and the `h1` pairs the
visible display word with an `sr-only` completion so the heading reads as a full name.

## Verifying changes

Use the chrome-devtools MCP tools. `emulate` with a viewport string does real device
emulation; `resize_page`/window resizing does not reliably change the viewport in this
environment. Check widths down to 320px — the hero name and the portfolio grid are the
two things that break first. `lighthouse_audit` needs a production build (`npm run build`
then `npm start`), since dev-server numbers are meaningless.
