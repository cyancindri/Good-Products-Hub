import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryClient from "./CategoryClient";
import { getCategories, getProducts } from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const categories = await getCategories();
  
  let category;
  if (resolvedParams.slug === "all") {
    category = {
      _id: "all",
      name: "All Products",
      slug: "all",
      description: "Discover our complete catalog of curated, highly-rated tech gadgets, kitchen appliances, wellness products, and smart reads.",
      icon: "Laptop",
    };
  } else {
    category = categories.find((c) => c.slug === resolvedParams.slug);
  }

  if (!category) {
    return {
      title: "Category Not Found | Good Products Hub",
    };
  }

  return {
    title: `${category.name} | Best Curated Selections & Reviews`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Best Curated Selections & Reviews`,
      description: category.description,
      type: "website",
    },
  };
}

// 2. Page Component
export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const categories = await getCategories();
  
  let category;
  let products;
  
  if (resolvedParams.slug === "all") {
    category = {
      _id: "all",
      name: "All Products",
      slug: "all",
      description: "Discover our complete catalog of curated, highly-rated tech gadgets, kitchen appliances, wellness products, and smart reads.",
      icon: "Laptop",
    };
    products = await getProducts(undefined, false, false);
  } else {
    category = categories.find((c) => c.slug === resolvedParams.slug);
    if (!category) {
      notFound();
    }
    products = await getProducts(category.slug, false, false);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <CategoryClient
          key={category.slug}
          category={category}
          initialProducts={products}
          allCategories={categories}
        />
      </main>
      <Footer />
    </>
  );
}
