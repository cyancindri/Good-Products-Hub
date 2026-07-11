import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Good Products Hub | Save Your Money",
  description: "Discover curated, highly-rated products, detailed buying guides, and honest expert reviews to save your money and shop smarter.",
  metadataBase: new URL("https://goodproductshub.in"),
  keywords: ["buying guides", "product reviews", "marketplaces", "best products", "affiliate deals"],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://goodproductshub.in",
  },
  openGraph: {
    title: "Good Products Hub | Save Your Money",
    description: "Discover curated, highly-rated products, detailed buying guides, and honest expert reviews to save your money.",
    type: "website",
    locale: "en_IN",
    siteName: "Good Products Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Good Products Hub | Save Your Money",
    description: "Discover curated, highly-rated products, detailed buying guides, and honest expert reviews to save your money.",
  },
  verification: {
    google: "ca-pub-6019707348267112",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-gradient bg-hero-radial text-foreground selection:bg-brand-green/10 selection:text-brand-green-dark">
        {children}
      </body>
    </html>
  );
}
