import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display font-extrabold text-3xl text-neutral-800 mb-6">Terms of Service</h1>
        <div className="prose text-xs md:text-sm text-neutral-600 leading-relaxed space-y-4">
          <p>
            By accessing this website, you agree to comply with our Terms of Service.
          </p>
          <p>
            Our website reviews products and provides affiliate links to marketplaces. While we strive to present accurate, up-to-date prices and ratings, we do not warrant that all specifications are error-free or represent current seller discounts.
          </p>
          <p>
            All content and design features are proprietary assets of Good Products Hub.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
