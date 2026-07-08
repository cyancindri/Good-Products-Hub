"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import type { Category } from "@/lib/sanity";
import DynamicIcon from "@/components/DynamicIcon";

const fallbackCategories: Category[] = [
  {
    _id: "cat-1",
    name: "Tech & Gadgets",
    slug: "tech-gadgets",
    description: "Sleek noise-cancelling headphones, smartwatches, keyboards, and modern workstations.",
    icon: "Laptop",
  },
  {
    _id: "cat-2",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "High-performance air fryers, automated cookers, espresso machines, and home decor.",
    icon: "Coffee",
  },
  {
    _id: "cat-3",
    name: "Fitness & Wellness",
    slug: "fitness-wellness",
    description: "Durable water bottles, yoga accessories, fitness trackers, and workout gear.",
    icon: "Dumbbell",
  },
  {
    _id: "cat-4",
    name: "Books & Smart Reading",
    slug: "books-reading",
    description: "E-readers, journals, productivity planners, and best-selling books.",
    icon: "BookOpen",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) return;

        const data = (await response.json()) as { categories?: Category[] };
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        }
      } catch {
        // Keep local categories available if the CMS request is unavailable.
      }
    }
    loadCategories();
  }, []);

  // Lock body scroll when offcanvas menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setIsOpen(false);
    }
  };


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-3 sm:h-20 sm:gap-4">
            {/* Logo & Branding */}
            <Link href="/" className="flex min-w-0 shrink-0 items-center gap-1 group">
              <div className="relative h-12 w-12 shrink-0 group-hover:scale-105 transition-transform duration-300 sm:h-14 sm:w-14">
                <Image
                  src="/rupee-logo.png"
                  alt="Good Products Hub Logo"
                  fill
                  className="object-contain object-right"
                  sizes="(min-width: 640px) 56px, 48px"
                  priority
                />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="whitespace-nowrap font-display text-[15px] font-extrabold tracking-tight text-neutral-800 leading-none sm:text-base">
                  Good Products <span className="text-brand-green">Hub</span>
                </span>
                <span className="mt-1 whitespace-nowrap text-[10px] text-neutral-400 font-sans tracking-wide leading-none">
                  Save your money
                </span>
              </div>
            </Link>

            {/* Desktop Search Input Bar (No middle links, wide search bar) */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-xl items-center relative ml-auto mr-2">
              <input
                type="text"
                placeholder="Search products or guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 pl-10 text-xs text-neutral-800 outline-none transition-all focus:border-brand-green focus:bg-white shadow-sm"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-neutral-400" />
            </form>

            {/* Actions: Mobile search and menu trigger */}
            <div className="flex items-center gap-2 sm:hidden ml-auto">
              {/* Mobile Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-neutral-600 hover:text-brand-green rounded-full hover:bg-neutral-100"
                aria-label="Toggle Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-neutral-600 hover:text-brand-green rounded-full hover:bg-neutral-100"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="border-t border-neutral-200/50 bg-white p-4 sm:hidden">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <input
                type="text"
                placeholder="Search products or guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 pl-10 text-sm text-neutral-800 outline-none focus:border-brand-green focus:bg-white"
                autoFocus
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
            </form>
          </div>
        )}
      </header>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Offcanvas Mobile Navigation Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[80vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-neutral-100">
          <div className="flex items-center gap-1">
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src="/rupee-logo.png"
                alt="Good Products Hub Logo"
                fill
                className="object-contain object-right"
                sizes="44px"
              />
            </div>
            <div className="flex flex-col">
              <span className="whitespace-nowrap font-display text-sm font-extrabold tracking-tight text-neutral-800 leading-none">
                Good Products <span className="text-brand-green">Hub</span>
              </span>
              <span className="mt-1 whitespace-nowrap text-[9px] text-neutral-400 font-sans tracking-wide leading-none">
                Save your money
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`block rounded-xl px-4 py-3 text-base font-semibold transition-all ${
              pathname === "/" ? "bg-brand-green-light text-brand-green font-bold" : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            Home
          </Link>
          
          <div className="pt-4 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-4">Categories</span>
          </div>

          {/* Virtual All Products link in mobile menu too */}
          <Link
            href="/category/all"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-base font-semibold transition-all group ${
              pathname === "/category/all"
                ? "bg-brand-green-light text-brand-green font-bold"
                : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <DynamicIcon name="Grid" className={pathname === "/category/all" ? "w-4 h-4 text-brand-green" : "w-4 h-4 text-neutral-400 group-hover:text-brand-green transition-colors"} />
            <span>All Products</span>
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-base font-semibold transition-all group ${
                pathname === `/category/${cat.slug}`
                  ? "bg-brand-green-light text-brand-green font-bold"
                  : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              <DynamicIcon name={cat.icon} className={pathname === `/category/${cat.slug}` ? "w-4 h-4 text-brand-green" : "w-4 h-4 text-neutral-400 group-hover:text-brand-green transition-colors"} />
              <span>{cat.name}</span>
            </Link>
          ))}

          <div className="pt-4 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-4">Guides</span>
          </div>
          <Link
            href="/#blogs"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-4 py-3 text-base font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-all"
          >
            Buying Guides
          </Link>
        </div>
      </div>
    </>
  );
}
