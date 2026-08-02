import type { Metadata, Viewport } from "next";
import { Figtree, Caprasimo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/data";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const caprasimo = Caprasimo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caprasimo",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "ISTQB-certified Senior QA Analyst & Automation Specialist with 7+ years building Playwright/Selenium frameworks, API & performance testing, CI/CD quality gates, and AI/LLM quality engineering.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Senior QA Analyst & Automation Specialist`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "QA Engineer",
    "Senior QA Analyst",
    "Test Automation Engineer",
    "SDET",
    "Playwright",
    "Selenium",
    "API Testing",
    "Performance Testing",
    "JMeter",
    "CI/CD",
    "AI Quality Engineering",
    "LLM Testing",
    "ISTQB",
    "Nisha Shrestha",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    title: `${site.name} — Senior QA Analyst & Automation Specialist`,
    description,
    siteName: `${site.name} · Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Senior QA Analyst & Automation Specialist`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#f5ead8",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Senior Software QA Analyst",
  description,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Toronto", addressCountry: "CA" },
  url: site.url,
  sameAs: [site.socials.linkedin, site.socials.github],
  knowsAbout: [
    "Test Automation",
    "Playwright",
    "Selenium",
    "API Testing",
    "Performance Testing",
    "CI/CD",
    "AI Quality Engineering",
    "LLM Testing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${figtree.variable} ${caprasimo.variable} ${mono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
