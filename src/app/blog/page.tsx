import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import AdContainer from "@/components/AdContainer";
import { getBlogs } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Buying Guides & Product Reviews | Good Products Hub",
  description: "Explore our collection of expert buying guides, product comparisons, and shopping advice to help you make informed decisions and save money.",
  alternates: {
    canonical: "https://goodproductshub.in/blog",
  },
};

export default async function BlogListPage() {
  const blogs = await getBlogs();

  return (
    <>
      <Navbar />
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">Editorial Guides</span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-neutral-800 mt-2">
            All Buying Advice
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-3 leading-relaxed">
            Meticulously researched buying guides, comparisons, and expert shopping tips across categories to save your hard-earned money.
          </p>
        </div>

        {/* Sponsor Banner */}
        <div className="mb-10">
          <AdContainer type="inline" />
        </div>

        {/* Blogs Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-neutral-200 bg-white p-12 text-center max-w-md mx-auto my-10">
            <p className="text-sm font-bold text-neutral-800">No buying guides published yet</p>
            <p className="mt-1 text-xs text-neutral-500">
              Open Sanity Studio to compose and publish helpful guides.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
