"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand Info (Left Side - occupies 2 columns on desktop) */}
          <div className="md:col-span-2">
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
            <p className="text-xs text-neutral-500 leading-relaxed max-w-xl">
              We help you find the absolute best products on Indian e-commerce marketplaces. Our team conducts honest, meticulous comparisons, isolating pros, cons, and actual buyer sentiment to save your hard-earned money.
            </p>
          </div>

          {/* Social Media Links (Right Side - occupies 1 column on desktop) */}
          <div className="flex flex-col md:items-start lg:items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Connect With Us</span>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://x.com/goodproductshub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-brand-green hover:border-brand-green transition-all shadow-sm cursor-pointer"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/good_products_hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-brand-green hover:border-brand-green transition-all shadow-sm cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@GoodProductsHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-brand-green hover:border-brand-green transition-all shadow-sm cursor-pointer"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.978 24 12 24 12s0-3.978-.502-5.837z" />
                  <polygon fill="white" points="9.545 15.568 15.818 12 9.545 8.432" />
                </svg>
              </a>
              <a
                href="mailto:goodproductshub@gmail.com"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-brand-green hover:border-brand-green transition-all shadow-sm cursor-pointer"
                aria-label="Email"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-neutral-400 font-sans text-center md:text-left w-full md:w-auto">
            &copy; {new Date().getFullYear()} Good Products Hub. <br className="lg:hidden" /> All rights reserved. Made in India.
          </span>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-xs text-neutral-400 w-full md:w-auto">
            <Link href="/privacy" className="hover:text-neutral-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-600 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-neutral-600 transition-colors">Disclaimer</Link>
            <Link href="/about" className="hover:text-neutral-600 transition-colors">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
