import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { SITE_URL } from "@/lib/data";
import "./globals.css";

// Stand-ins for the licensed Zuume (condensed display) / Paralucent (geometric body) pair in DESIGN.md
const display = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AbdurRahman Mahmood — Business & Creative Strategist",
    template: "%s | AbdurRahman Mahmood",
  },
  description:
    "Business & Creative Strategist helping startups and founders scale through consulting, brand strategy, AI automation and performance marketing. Let's build something big.",
  keywords: [
    "business strategist",
    "creative strategist",
    "startup consultant",
    "brand strategy",
    "digital marketing consultant",
    "AI business automation",
    "UI UX designer",
    "AbdurRahman Mahmood",
  ],
  authors: [{ name: "AbdurRahman Mahmood", url: SITE_URL }],
  creator: "AbdurRahman Mahmood",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "AbdurRahman Mahmood",
    title: "AbdurRahman Mahmood — Business & Creative Strategist",
    description:
      "Strategic consulting, branding, AI-powered solutions and performance marketing for startups, founders and growing businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AbdurRahman Mahmood — Business & Creative Strategist",
    description:
      "Strategic consulting, branding, AI-powered solutions and performance marketing for startups and founders.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas">{children}</body>
    </html>
  );
}
