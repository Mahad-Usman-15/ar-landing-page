import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { CONTACT, SERVICES, SITE_URL } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: CONTACT.name,
      jobTitle: CONTACT.title,
      email: `mailto:${CONTACT.email}`,
      telephone: CONTACT.whatsapp,
      url: SITE_URL,
      image: `${SITE_URL}/abdurrehman.png`,
      description:
        "Business & Creative Strategist helping startups, founders and businesses scale through strategic consulting, branding, AI-powered solutions and performance marketing.",
      sameAs: [CONTACT.linkedin],
      knowsAbout: [
        "Business Strategy",
        "Brand Strategy",
        "Digital Marketing",
        "UI/UX Design",
        "AI Integration",
        "Financial Advisory",
      ],
      worksFor: { "@type": "Organization", name: "Gracode Studio" },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: `${CONTACT.name} — Business & Creative Strategy`,
      url: SITE_URL,
      email: CONTACT.email,
      telephone: CONTACT.whatsapp,
      priceRange: "$$",
      areaServed: "Worldwide",
      provider: { "@id": `${SITE_URL}/#person` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Consulting & Creative Services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${CONTACT.name} — ${CONTACT.title}`,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-acid focus:px-4 focus:py-2 focus:font-display focus:text-black"
      >
        Skip to content
      </Link>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
