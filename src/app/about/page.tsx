import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display font-extrabold text-3xl text-neutral-800 mb-6">About Good Products Hub</h1>
        <div className="prose text-xs md:text-sm text-neutral-600 leading-relaxed space-y-4">
          <p>
            Welcome to <strong>Good Products Hub</strong>! Our mission is to make online shopping in India straightforward, honest, and budget-friendly.
          </p>
          <p>
            With millions of products listed across major e-commerce marketplaces like Amazon, Flipkart, and others, finding high-quality options can feel like an endless scroll. That&rsquo;s where we come in.
          </p>
          <p>
            Our dedicated team researches top trending purchases, analyzes verified reviews, highlights authentic pros and cons, and compiles complete buying guides. We ensure you buy the best products for your needs and save your money in the process.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
