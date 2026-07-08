import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogClient from "./BlogClient";
import { getBlogBySlug, getBlogs, getRelatedProducts } from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreview = resolvedSearchParams?.preview === "true";
  const blog = await getBlogBySlug(resolvedParams.slug, isPreview);

  if (!blog) {
    return {
      title: "Article Not Found | Good Products Hub",
    };
  }

  const seoTitle = blog.seo?.title || `${blog.title} | Good Products Hub Guide`;
  const seoDesc = blog.seo?.description || blog.excerpt;
  const coverUrl = blog.cover?.url || "/logo.png";

  return {
    title: seoTitle,
    description: seoDesc,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: blog.cover?.alt || blog.title,
        },
      ],
      type: "article",
      publishedTime: new Date(blog.date).toISOString(),
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [coverUrl],
    },
  };
}

// 2. Server Page
export default async function BlogDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreview = resolvedSearchParams?.preview === "true";
  const blog = await getBlogBySlug(resolvedParams.slug, isPreview);

  if (!blog) {
    notFound();
  }

  const coverUrl = blog.cover?.url || "/logo.png";

  // Fetch related products mentioned in the article
  const relatedProducts = await getRelatedProducts(blog.relatedProducts);

  // Fetch other blogs for recommendations
  const allBlogs = await getBlogs(undefined, isPreview);
  const otherBlogs = allBlogs.filter((b) => b._id !== blog._id);

  // JSON-LD Article Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [coverUrl],
    "datePublished": new Date(blog.date).toISOString(),
    "dateModified": new Date().toISOString(),
    "author": [
      {
        "@type": "Person",
        "name": blog.author,
      },
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Good Products Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://goodproductshub.com/logo.png",
      },
    },
    "description": blog.excerpt,
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
        <BlogClient blog={blog} relatedProducts={relatedProducts} otherBlogs={otherBlogs} />
      </main>
      <Footer />
    </>
  );
}
