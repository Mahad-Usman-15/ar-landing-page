---
version: alpha
name: "Neon-Black Impact"
description: "Steven Bartlett's personal brand site uses a stark black canvas with an electric acid-yellow (#dbff00) as the sole accent color, creating extreme contrast. The design is dominated by massive display type set in the custom \"Zuume\" typeface. the hero word \"STEVEN\" fills the entire viewport width at ~100px bold. Body copy uses \"Paralucent\" at light weight (w300). The overall aesthetic is bold, editorial, and high-impact with zero decorative ornamentation, no shadows, and minimal border radius usage. The site operates as a single dark theme despite the \"light/dark\" detection. both screenshots are identical black-background layouts."
colors:
  black-canvas: "#000000"
  charcoal: "#2a2a2a"
  acid-yellow: "#dbff00"
  mid-grey: "#d0d0d0"
  pure-white: "#ffffff"
  dark-grey: "#444444"
typography:
  hero-display:
    fontFamily: "zuume"
    fontSize: "100px"
    fontWeight: "700"
    lineHeight: "95px"
  section-heading-large:
    fontFamily: "zuume"
    fontSize: "62px"
    fontWeight: "700"
    lineHeight: "42px"
  section-heading-medium:
    fontFamily: "zuume"
    fontSize: "52px"
    fontWeight: "700"
    lineHeight: "52px"
  section-heading-regular:
    fontFamily: "zuume"
    fontSize: "52px"
    fontWeight: "400"
    lineHeight: "52px"
  sub-heading:
    fontFamily: "zuume"
    fontSize: "26px"
    fontWeight: "700"
    lineHeight: "52px"
  nav-label:
    fontFamily: "zuume"
    fontSize: "16px"
    fontWeight: "700"
    lineHeight: "24px"
  ui-label:
    fontFamily: "zuume"
    fontSize: "12px"
    fontWeight: "400"
    lineHeight: "18px"
  body-large:
    fontFamily: "paralucent"
    fontSize: "21px"
    fontWeight: "300"
    lineHeight: "27.3px"
  body:
    fontFamily: "paralucent"
    fontSize: "18px"
    fontWeight: "300"
    lineHeight: "27px"
  body-small:
    fontFamily: "paralucent"
    fontSize: "15px"
    fontWeight: "300"
    lineHeight: "22.5px"
  caption-meta:
    fontFamily: "paralucent"
    fontSize: "13px"
    fontWeight: "500"
    lineHeight: "19.5px"
rounded:
  radius-none: "0px"
  radius-xs: "2px"
  radius-sm: "4px"
  radius-md: "6px"
  radius-base: "10px"
  radius-lg: "20px"
  radius-xl: "40px"
  radius-2xl: "60px"
  radius-full: "50%"
spacing:
  space-1: "4px"
  space-2: "5px"
  space-3: "8px"
  space-4: "10px"
  space-5: "12px"
  space-6: "15px"
  space-7: "16px"
  space-8: "20px"
  space-9: "22px"
  space-10: "24px"
  space-11: "25px"
  space-12: "28px"
  space-13: "30px"
  space-14: "50px"
  space-15: "70px"
  space-16: "100px"
---

## Overview

Steven Bartlett's personal brand site uses a stark black canvas with an electric acid-yellow (#dbff00) as the sole accent color, creating extreme contrast. The design is dominated by massive display type set in the custom "Zuume" typeface. the hero word "STEVEN" fills the entire viewport width at ~100px bold. Body copy uses "Paralucent" at light weight (w300). The overall aesthetic is bold, editorial, and high-impact with zero decorative ornamentation, no shadows, and minimal border radius usage. The site operates as a single dark theme despite the "light/dark" detection. both screenshots are identical black-background layouts.

**Signature traits:**
- Dual typeface system: Pairs zuume and paralucent across the type hierarchy.
- Soft, rounded geometry: Generous corner rounding up to 9999px.
- Single-accent color discipline: A neutral-led palette reserves #dbff00 as the lone accent.
- Layered elevation: Depth comes from 1 validated shadow token.

## Colors

The palette uses 12 validated color tokens across 2 theme profiles. Semantic roles stay attached to observed usage so generation agents can choose accents without inventing new color meaning.

**Semantic naming:**
- **surface-background** maps to `black-canvas`: Role "background" is grounded by usage context "Full-page background, nav background, all section fills".
- **content-text** maps to `pure-white`: Role "text" is grounded by usage context "Body copy, nav logo text, scroll label, overlay text on hero".
- **action-text** maps to `acid-yellow`: Role "text" is grounded by usage context "Hero display type 'STEVEN', cookie revisit button background, accent highlights".
- **border-border** maps to `dark-grey`: Role "border" is grounded by usage context "Dividers, subtle borders, separator lines".

### Dark Theme

### Text Scale
- **Acid Yellow** (#dbff00): Hero display type 'STEVEN', cookie revisit button background, accent highlights. Role: text. {authored: rgb(219, 255, 0), space: rgb}
- **Mid Grey** (#d0d0d0): Secondary text, muted labels, footer text. Role: text. {authored: rgb(208, 208, 208), space: rgb}
- **Pure White** (#ffffff): Body copy, nav logo text, scroll label, overlay text on hero. Role: text. {authored: rgb(255, 255, 255), space: rgb, alpha: 0}

### Interactive
- **Dark Grey** (#444444): Dividers, subtle borders, separator lines. Role: border. {authored: rgb(68, 68, 68), space: rgb}

### Surface & Shadows
- **Black Canvas** (#000000): Full-page background, nav background, all section fills. Role: background. {authored: rgb(0, 0, 0), space: rgb}
- **Charcoal** (#2a2a2a): Card surfaces, slightly elevated section backgrounds. Role: background. {authored: rgb(42, 42, 42), space: rgb}

### Light Theme

### Text Scale
- **Acid Yellow** (#dbff00): Hero display type, cookie revisit button, primary accent. Role: text. {authored: rgb(219, 255, 0), space: rgb}
- **Mid Grey** (#d0d0d0): Secondary text, muted labels. Role: text. {authored: rgb(208, 208, 208), space: rgb}
- **Pure White** (#ffffff): Body copy and nav text on black background. Role: text. {authored: rgb(255, 255, 255), space: rgb, alpha: 0}

### Interactive
- **Dark Grey** (#444444): Dividers and subtle borders. Role: border. {authored: rgb(68, 68, 68), space: rgb}

### Surface & Shadows
- **Black Canvas** (#000000): Full-page background — site uses black even in light mode detection. Role: background. {authored: rgb(0, 0, 0), space: rgb}
- **Charcoal** (#2a2a2a): Slightly elevated card/section surfaces. Role: background. {authored: rgb(42, 42, 42), space: rgb}

## Typography

Typography uses zuume, paralucent across extracted hierarchy roles. Keep hierarchy mapped to these token rows before adding decorative type styles.

Mixes zuume and paralucent for visual contrast. Weight range spans bold, regular, light, medium. Sizes range from 12px to 100px.

### Font Roles
- **Headline Font**: zuume
- **Body Font**: zuume

### Type Scale Evidence
| Role | Font | Size | Weight | Line Height | Letter Spacing | Stack / Features | Notes |
|------|------|------|--------|-------------|----------------|------------------|-------|
| Full-viewport hero word mark — 'STEVEN' fills the entire screen width | zuume | 100px | 700 | 95px | normal | zuume, sans-serif | Extracted token |
| Large section headings and chapter titles | zuume | 62px | 700 | 42px | normal | zuume, sans-serif | Extracted token |
| Mid-size section headings | zuume | 52px | 700 | 52px | normal | zuume, sans-serif | Extracted token |
| Regular-weight section headings | zuume | 52px | 400 | 52px | normal | zuume, sans-serif | Extracted token |
| Sub-section labels and callout headings | zuume | 26px | 700 | 52px | normal | zuume, sans-serif | Extracted token |
| Navigation items, uppercase labels, scroll indicator | zuume | 16px | 700 | 24px | normal | zuume, sans-serif | Extracted token |
| Small UI labels, tags, metadata — most frequent typography tuple | zuume | 12px | 400 | 18px | normal | zuume, sans-serif | Extracted token |
| Lead body paragraphs and intro text | paralucent | 21px | 300 | 27.3px | normal | paralucent, sans-serif | Extracted token |
| Standard body copy and descriptions | paralucent | 18px | 300 | 27px | normal | paralucent, sans-serif | Extracted token |
| Captions, footnotes, secondary body text | paralucent | 15px | 300 | 22.5px | normal | paralucent, sans-serif | Extracted token |
| Metadata labels, tags, category chips | paralucent | 13px | 500 | 19.5px | normal | paralucent, sans-serif | Extracted token |

## Layout

Responsive system uses 3 breakpoint tier(s): mobile, tablet, desktop.

This system uses a 5px base grid with scale values 4, 5, 8, 10, 12, 15, 20, 25, 50, 100, 140.

### Responsive Strategy
- **mobile (576-1399.98px)**: Constrain layout for small viewports and prioritize vertical stacking.
- **tablet (700-991px)**: Increase spacing and column structure for medium-width viewports.
- **desktop (>= 1200px)**: Expand layout density and horizontal composition for wide viewports.

### Spacing System
| Token | Value | Px | Notes |
|------|-------|----|-------|
| space-1 | 4px | 4 | Extracted spacing token |
| space-2 | 5px | 5 | Extracted spacing token |
| space-3 | 8px | 8 | Extracted spacing token |
| space-4 | 10px | 10 | Extracted spacing token |
| space-5 | 12px | 12 | Extracted spacing token |
| space-6 | 15px | 15 | Extracted spacing token |
| space-7 | 16px | 16 | Extracted spacing token |
| space-8 | 20px | 20 | Extracted spacing token |
| space-9 | 22px | 22 | Extracted spacing token |
| space-10 | 24px | 24 | Extracted spacing token |
| space-11 | 25px | 25 | Extracted spacing token |
| space-12 | 28px | 28 | Extracted spacing token |
| space-13 | 30px | 30 | Extracted spacing token |
| space-14 | 50px | 50 | Extracted spacing token |
| space-15 | 70px | 70 | Extracted spacing token |
| space-16 | 100px | 100 | Extracted spacing token |
| space-17 | 140px | 140 | Extracted spacing token |

## Elevation & Depth

Keep depth flat unless validated shadow or interaction evidence appears in the extraction payload. Do not invent shadows beyond this evidence boundary.

### Shadow Evidence
| Shadow Token | Layers | Details |
|--------------|--------|---------|
| shadow-card | 1 | 0px 32px 68px 0px rgba(0, 0, 0, 0.3) |

### Interaction Signals
| Theme | Signal | Evidence |
|-------|--------|----------|
| Light | outline-color | rgb(0, 0, 0) ; rgb(13, 110, 253) ; rgb(208, 208, 208) |
| Light | outline-width | 3px ; 0px |
| Light | outline-offset | 0px |
| Light | transform | matrix(1, 0, 0, 1, 0, 0) ; matrix(1, 0, 0, 1, -30, 0) ; matrix(1, 0, 0, 1, 30, 0) |
| Dark | outline-color | rgb(0, 0, 0) ; rgb(13, 110, 253) ; rgb(208, 208, 208) |
| Dark | outline-width | 3px ; 0px |
| Dark | outline-offset | 0px |
| Dark | transform | matrix(1, 0, 0, 1, 0, 0) ; matrix(1, 0, 0, 1, -30, 0) ; matrix(1, 0, 0, 1, 30, 0) |

## Shapes

Shape language maps directly to rounded tokens. Keep component corners consistent with the role mapping below before introducing bespoke geometry.

### Radius Roles
| Token | Value | Px | Role Mapping |
|------|-------|----|--------------|
| radius-none | 0px | 0 | Hairline corner |
| radius-xs | 2px | 2 | Hairline corner |
| radius-sm | 4px | 4 | Subtle corner |
| radius-md | 6px | 6 | Subtle corner |
| radius-base | 10px | 10 | Control corner |
| radius-lg | 20px | 20 | Card corner |
| radius-xl | 40px | 40 | Large surface corner |
| radius-2xl | 60px | 60 | Large surface corner |
| radius-full | 50% | 9999 | Large surface corner |

### Geometry Evidence
| Radius Token | Shape | Units |
|--------------|-------|-------|
| radius-none | 0px | px |
| radius-xs | 2px | px |
| radius-sm | 4px | px |
| radius-md | 6px | px |
| radius-base | 10px | px |
| radius-lg | 20px | px |
| radius-xl | 40px | px |
| radius-2xl | 60px | px |
| radius-full | 50% | % |

## Components

(none detected)

## Do's and Don'ts

Guardrails protect Dual typeface system, Soft, rounded geometry, Single-accent color discipline without adding unsupported visual claims.

| Do | Don't |
|----|---------|
| Do maintain consistent spacing using the base grid | Don't make unsupported claims about absent visual features |
| Do maintain WCAG AA contrast ratios (4.5:1 for normal text) | Don't mix rounded and sharp corners in the same view |
| Do use the primary color only for the single most important action per screen |  |
| Do verify evidence before writing new design-system guidance |  |

## Responsive Evidence

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <= 352px | (max-width: 352px) |
| Mobile | <= 425px | (max-width: 425px) |
| Mobile | <= 440px | (max-width: 440px) |
| Mobile | <= 575.98px | (max-width: 575.98px) |
| Mobile | <= 576px | (max-width: 576px) |
| Mobile | <= 600px | (max-width: 600px) |
| Mobile | <= 700px | only screen and (max-width: 700px) |
| Mobile | <= 767px | (max-width: 767px) |
| Breakpoint 9 | <= 767.98px | (max-width: 767.98px) |
| Breakpoint 10 | <= 768px | (max-width: 768px) |
| Breakpoint 11 | <= 845px | (max-width: 845px) |
| Breakpoint 12 | <= 991.98px | (max-width: 991.98px) |
| Breakpoint 13 | <= 1199.98px | (max-width: 1199.98px) |
| Breakpoint 14 | <= 1399.98px | (max-width: 1399.98px) |
| Mobile | >= 576px | (min-width: 576px) |
| Mobile | >= 700px | only screen and (min-width: 700px) |
| Tablet | 768-991px | (min-width: 768px) and (max-width: 991px) |
| Tablet | >= 768px | (min-width: 768px) |
| Tablet | >= 992px | (min-width: 992px) |
| Tablet | >= 1000px | only screen and (min-width: 1000px) |

## Agent Prompt Guide

### Example Component Prompts
- Create button component using validated primary color role and spacing tokens.
- Create card component with mapped radius role and evidence-backed elevation.
- Create form input component using inferred typography hierarchy and border roles.

### Iteration Guide
1. Start with extracted palette and typography roles only.
2. Map spacing and radius directly from token tables before visual polish.
3. Apply component patterns one section at a time and compare against source intent.
4. Keep elevation claims tied to explicit evidence in output.
5. Iterate with smallest diffs and re-check section hierarchy after each change.
