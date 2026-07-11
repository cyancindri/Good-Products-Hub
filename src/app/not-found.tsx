import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdContainer from "@/components/AdContainer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6 shadow-sm">
          <HelpCircle className="w-10 h-10 text-amber-500" />
        </div>
        
        <h1 className="font-display font-black text-4xl sm:text-5xl text-neutral-800 tracking-tight leading-tight">
          Page Not Found
        </h1>
        
        <p className="mt-4 text-sm text-neutral-500 leading-relaxed max-w-md">
          Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for. The link might be broken, or the page has been moved.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-sm font-bold tracking-wide transition-all shadow-lg shadow-orange-500/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>

        {/* 404 Page Sponsor Ad Banner */}
        <div className="mt-16 w-full max-w-[336px] sm:max-w-[728px] mx-auto">
          <AdContainer type="inline" />
        </div>
      </main>
      <Footer />
    </>
  );
}
