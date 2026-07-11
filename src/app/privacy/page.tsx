import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display font-extrabold text-3xl text-neutral-800 mb-6">Privacy Policy</h1>
        <div className="prose text-xs md:text-sm text-neutral-600 leading-relaxed space-y-4">
          <p>
            Your privacy is highly important to us. This Privacy Policy details the types of personal information collected and recorded by Good Products Hub and how we utilize it.
          </p>
          <p>
            For any queries or comments regarding our privacy practices, please contact us directly.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
