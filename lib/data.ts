const FALLBACK_SITE_URL = "https://iabdurrahman.vercel.app";

/**
 * `SITE_URL` feeds `new URL()` in `app/layout.tsx` (metadataBase), so a bad value
 * is not a cosmetic problem — it throws at module load and takes down every route.
 * `??` alone does not protect us: an unset-but-present `NEXT_PUBLIC_SITE_URL=` is
 * `""`, not `undefined`, and `.env.example` ships the placeholder `your-domain`.
 *
 * Normalising to `origin` also strips any trailing slash, so the `${SITE_URL}/...`
 * concatenations in robots/sitemap/JSON-LD can never produce a doubled slash.
 */
function resolveSiteUrl(raw: string | undefined): string {
  const candidate = raw?.trim();
  if (!candidate) return FALLBACK_SITE_URL;

  const withScheme = /^https?:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;

  try {
    const url = new URL(withScheme);
    // A hostname with no dot is a placeholder ("your-domain"), not a real origin.
    if (!url.hostname.includes(".")) return FALLBACK_SITE_URL;
    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const CONTACT = {
  name: "AbdurRahman Mahmood",
  title: "Business & Creative Strategist",
  email: "abdurrahmanmahmood.work@gmail.com",
  whatsapp: "+92 335 0847032",
  whatsappUrl: "https://wa.me/923350847032",
  linkedin: "https://linkedin.com/in/abdurrahmanmahmood",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export const ROLES_TICKER = [
  "Entrepreneur",
  "Business Consultant",
  "Brand Strategist",
  "Creative Director",
  "Marketing Strategist",
  "AI Solutions Consultant",
  "Sales Strategist",
  "Business Development",
  "Trader",
];

export const EXPERIENCE = [
  { role: "Founder & CEO", org: "Gracode Studio" },
  { role: "Founder & CEO", org: "WHAZ" },
  { role: "Operations Head Executive", org: "Oriza" },
  { role: "Visual Representative", org: "Konami" },
  { role: "Marketing Consultant", org: "BazaarBuzz" },
  { role: "Brand & Design Consultant", org: "Aloetique" },
  { role: "Creative Consultant", org: "Fein.gears" },
  { role: "Brand Designer", org: "Elbtire" },
  { role: "Trader", org: "Trader X" },
];

export const SERVICES = [
  {
    title: "Business & Startup Strategy",
    description:
      "Consulting for startups and established businesses — growth strategy, operations, and sales systems that scale.",
    items: ["Business Consulting", "Growth Strategy", "Operations", "Sales & Lead Gen"],
  },
  {
    title: "Brand Strategy & Design",
    description:
      "Identity systems built to convert — from logo and packaging to full brand direction that positions you above the noise.",
    items: ["Brand Identity", "Logo & Packaging", "Creative Direction", "Print & Marketing"],
  },
  {
    title: "Digital Marketing",
    description:
      "Performance-driven campaigns across Meta and Google, backed by content strategy and social media design.",
    items: ["Meta & Google Ads", "Social Media Strategy", "Content Design", "SEO"],
  },
  {
    title: "Web & Product Design",
    description:
      "UI/UX and web development — landing pages, WordPress and e-commerce builds engineered to turn visitors into customers.",
    items: ["UI/UX Design", "Web Development", "WordPress", "E-commerce"],
  },
  {
    title: "AI & Automation",
    description:
      "AI-powered solutions and business automation that cut costs, speed up delivery, and unlock new capabilities.",
    items: ["AI Integration", "Business Automation", "Workflow Systems", "Product Strategy"],
  },
  {
    title: "Finance & Investment",
    description:
      "Financial advisory, investment planning, and trading insight — grounded decisions for sustainable growth.",
    items: ["Financial Advisory", "Investment Planning", "Trading", "Pitch Decks"],
  },
];

export type PortfolioItem = {
  src: string;
  alt: string;
  category: "Graphic Design" | "Business Consulting" | "Animation" | "Video Editing";
  type: "image" | "video";
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    src: "/portfolio/graphic-design-01.jpg",
    alt: "Brand poster design by AbdurRahman Mahmood",
    category: "Graphic Design",
    type: "image",
  },
  {
    src: "/portfolio/graphic-design-02.jpg",
    alt: "Creative social media design for a client brand",
    category: "Graphic Design",
    type: "image",
  },
  {
    src: "/portfolio/graphic-design-03.jpg",
    alt: "Marketing material graphic design",
    category: "Graphic Design",
    type: "image",
  },
  {
    src: "/portfolio/graphic-design-04.jpg",
    alt: "Brand identity design concept",
    category: "Graphic Design",
    type: "image",
  },
  {
    src: "/portfolio/graphic-design-05.jpg",
    alt: "Packaging and print design work",
    category: "Graphic Design",
    type: "image",
  },
  {
    src: "/portfolio/graphic-design-06.jpg",
    alt: "Logo and visual identity design",
    category: "Graphic Design",
    type: "image",
  },
  {
    src: "/portfolio/graphic-design-07.jpg",
    alt: "Social media campaign creative",
    category: "Graphic Design",
    type: "image",
  },
  {
    src: "/portfolio/graphic-design-08.jpg",
    alt: "Digital creative design for marketing",
    category: "Graphic Design",
    type: "image",
  },
  {
    src: "/portfolio/business-consulting-01.jpg",
    alt: "Business consulting session with a startup client",
    category: "Business Consulting",
    type: "image",
  },
  {
    src: "/portfolio/business-consulting-02.jpg",
    alt: "Business growth strategy workshop",
    category: "Business Consulting",
    type: "image",
  },
  {
    src: "/portfolio/business-consulting-03.jpg",
    alt: "Strategic consulting engagement",
    category: "Business Consulting",
    type: "image",
  },
  {
    src: "/portfolio/animation-01.jpg",
    alt: "Motion graphics animation still frame",
    category: "Animation",
    type: "image",
  },
  {
    src: "/portfolio/animation-02.jpg",
    alt: "Animated brand visual frame",
    category: "Animation",
    type: "image",
  },
  {
    src: "/portfolio/animation-03.jpg",
    alt: "Animation project artwork",
    category: "Animation",
    type: "image",
  },
  {
    src: "/portfolio/animation-reel-01.mp4",
    alt: "Motion graphics animation reel",
    category: "Animation",
    type: "video",
  },
  {
    src: "/portfolio/animation-reel-02.mp4",
    alt: "Animated logo reveal reel",
    category: "Animation",
    type: "video",
  },
  {
    src: "/portfolio/video-edit-01.mp4",
    alt: "Video editing showreel clip",
    category: "Video Editing",
    type: "video",
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Graphic Design",
  "Business Consulting",
  "Animation",
  "Video Editing",
] as const;
