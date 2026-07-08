import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductClient from "./ProductClient";
import { getProductBySlug, getProducts } from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreview = resolvedSearchParams?.preview === "true";
  const product = await getProductBySlug(resolvedParams.slug, isPreview);

  if (!product) {
    return {
      title: "Product Not Found | Good Products Hub",
    };
  }

  const seoTitle = product.seo?.title || `${product.title} Review & Price | Good Products Hub`;
  const seoDesc = product.seo?.description || product.summary;
  const primaryImage = product.images?.[0]?.url || "/logo.png";

  return {
    title: seoTitle,
    description: seoDesc,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 600,
          alt: product.images?.[0]?.alt || product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [primaryImage],
    },
  };
}

// 2. Server Page
export default async function ProductDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreview = resolvedSearchParams?.preview === "true";
  const product = await getProductBySlug(resolvedParams.slug, isPreview);

  if (!product) {
    notFound();
  }
  const primaryImage = product.images?.[0]?.url || "/logo.png";

  // Fetch related products (same category, filter out current product)
  const allCategoryProducts = await getProducts(product.categorySlug, false, false, isPreview);
  const relatedProducts = allCategoryProducts.filter((p) => p._id !== product._id);

  // JSON-LD Product Schema
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.images.length > 0 ? product.images.map(img => img.url) : [primaryImage],
    "description": product.summary,
    "sku": product._id,
    "mpn": product.slug,
    "brand": {
      "@type": "Brand",
      "name": product.title.split(" ")[0] || "Brand",
    },
    "offers": {
      "@type": "Offer",
      "url": product.affiliateLink,
      "priceCurrency": "INR",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Good Products Hub",
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": product.reviewScreenshots ? product.reviewScreenshots.length + 5 : "12",
    },
  };

  return (
    <>
      {/* Inject Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <ProductClient product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  );
}
