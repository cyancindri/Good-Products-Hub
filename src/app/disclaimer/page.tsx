import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display font-extrabold text-3xl text-neutral-800 mb-6">Disclaimer</h1>
        <div className="prose text-xs md:text-sm text-neutral-600 leading-relaxed space-y-6">
          <p>
            Welcome to Good Products Hub. Please read this Disclaimer carefully before using our website or purchasing products using the links provided on our pages.
          </p>
          
          <h2 className="font-display font-bold text-lg text-neutral-800 mt-8 mb-2">Guidance & Information Only</h2>
          <p>
            Good Products Hub is dedicated solely to providing reviews, information, and guidance about various products and their importance. "Guidance" means we explain features, compare details, and summarize overall pros, cons, and buyer sentiments to help you understand a product's utility. 
          </p>
          <p className="font-semibold text-neutral-800">
            We are not forcing, advising, or guiding you to buy any product from our website. Any purchasing decision you make is entirely voluntary.
          </p>

          <h2 className="font-display font-bold text-lg text-neutral-800 mt-8 mb-2">Independent Verification Required</h2>
          <p>
            If you like any product listed on our website, you are strongly advised to independently verify the product, its current pricing, shipping policies, warranty terms, and seller ratings on the destination store using the provided link before making a final purchase.
          </p>

          <h2 className="font-display font-bold text-lg text-neutral-800 mt-8 mb-2">Limitation of Responsibility</h2>
          <p>
            Any purchase made through the links provided on Good Products Hub is completed on third-party marketplace websites (such as Amazon, Flipkart, or others). 
          </p>
          <p>
            Therefore, any purchase transaction, product delivery issue, defective item, or financial transaction is <strong>not our responsibility</strong>. We do not handle orders, process payments, ship products, or manage returns.
          </p>

          <p className="mt-12 text-xs text-neutral-400">
            Last updated: July 2026. Good Products Hub.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
