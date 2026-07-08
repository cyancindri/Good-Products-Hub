"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2 pr-4">
            <Link href="/" className="flex items-center gap-1 group mb-4">
              <div className="relative h-11 w-11 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/rupee-logo.png"
                  alt="Good Products Hub Logo"
                  fill
                  className="object-contain object-right"
                  sizes="44px"
                />
              </div>
              <span className="font-display text-base font-extrabold tracking-tight text-neutral-800">
                Good Products <span className="text-brand-green">Hub</span>
              </span>
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
              We help you find the absolute best products on Indian e-commerce marketplaces. Our team conducts honest, meticulous comparisons, isolating pros, cons, and actual buyer sentiment to save your hard-earned money.
            </p>
            <p className="mt-4 text-[10px] text-neutral-400 max-w-sm leading-relaxed">
              <strong>Affiliate Disclosure:</strong> Good Products Hub is a participant in the Amazon Services LLC Associates Program and Flipkart Affiliate Program. When you purchase products through our links, we may earn a small referral commission at no additional cost to you.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Discover</span>
            <ul className="mt-4 space-y-2 text-xs font-medium text-neutral-600">
              <li>
                <Link href="/" className="hover:text-brand-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/tech-gadgets" className="hover:text-brand-green transition-colors">
                  Tech & Gadgets
                </Link>
              </li>
              <li>
                <Link href="/category/home-kitchen" className="hover:text-brand-green transition-colors">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link href="/category/fitness-wellness" className="hover:text-brand-green transition-colors">
                  Fitness & Wellness
                </Link>
              </li>
              <li>
                <Link href="/category/books-reading" className="hover:text-brand-green transition-colors">
                  Books & Reading
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Stay Updated</span>
            <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
              Get the latest buying guides, product comparisons, and affiliate discounts delivered straight to your inbox.
            </p>
            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-brand-green bg-brand-green-light border border-brand-green/20 rounded-full px-4 py-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs text-neutral-800 outline-none focus:border-brand-green focus:bg-white transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-full bg-orange-600 hover:bg-orange-700 text-white py-2 text-xs font-bold tracking-wide transition-colors shadow-sm shadow-orange-500/10"
                >
                  Join Newsletter
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-neutral-400 font-sans">
            &copy; {new Date().getFullYear()} Good Products Hub. All rights reserved. Made in India.
          </span>
          <div className="flex gap-4 text-xs text-neutral-400">
            <Link href="/privacy" className="hover:text-neutral-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-600 transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-neutral-600 transition-colors">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
