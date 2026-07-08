"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SlidersHorizontal, ArrowUpDown, ChevronRight, RotateCcw } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import DynamicIcon from "@/components/DynamicIcon";
import AdContainer from "@/components/AdContainer";
import { Category, Product } from "@/lib/sanity";

interface CategoryClientProps {
  category: Category;
  initialProducts: Product[];
  allCategories: Category[];
}

export default function CategoryClient({
  category,
  initialProducts,
  allCategories,
}: CategoryClientProps) {
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    if (initialProducts.length === 0) return 50000;
    return Math.max(...initialProducts.map((p) => p.price));
  });
  const [sortBy, setSortBy] = useState<string>(() => category.slug === "all" ? "price-low" : "featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Price boundaries
  const priceLimits = useMemo(() => {
    if (initialProducts.length === 0) return { min: 0, max: 50000 };
    const prices = initialProducts.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [initialProducts]);

  // Reset filters
  const handleReset = () => {
    setMaxPrice(priceLimits.max);
    setSortBy(category.slug === "all" ? "price-low" : "featured");
  };

  // Sort and filter products
  const processedProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Filter by price
    result = result.filter((p) => p.price <= maxPrice);

    // 2. Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "featured":
      default:
        // Keep initial order
        break;
    }

    return result;
  }, [initialProducts, maxPrice, sortBy]);

  // Format currency
  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const allProductsCategory: Category = {
    _id: "all",
    name: "All Products",
    slug: "all",
    description: "Discover our complete catalog of curated, highly-rated tech gadgets, kitchen appliances, wellness products, and smart reads.",
    icon: "Grid",
  };

  const displayCategories = useMemo(() => [allProductsCategory, ...allCategories], [allCategories]);


  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400 mb-6 overflow-hidden whitespace-nowrap">
        <Link href="/" className="hover:text-brand-green transition-colors shrink-0">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-neutral-500 shrink-0">Categories</span>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-brand-green-dark truncate min-w-0">{category.name}</span>
      </nav>

      {/* 2. Category Header */}
      <div className="mb-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green-light px-2.5 py-0.5 rounded-full border border-brand-green/10">
          Product Discovery
        </span>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-neutral-800 mt-3">
          {category.name}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-3xl leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* 3. Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:flex flex-col gap-6 lg:col-span-1 bg-white border border-neutral-200/40 rounded-3xl p-6 card-shadow sticky top-24">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-brand-green" />
              Refine Search
            </span>
            <button
              onClick={handleReset}
              className="text-[10px] font-bold text-neutral-400 hover:text-brand-green flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wide text-neutral-500 block mb-3">
              Max Price: <span className="text-brand-green font-display font-bold text-xs">{formatPrice(maxPrice)}</span>
            </label>
            <input
              type="range"
              min={priceLimits.min}
              max={priceLimits.max}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-green cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-medium mt-1.5">
              <span>{formatPrice(priceLimits.min)}</span>
              <span>{formatPrice(priceLimits.max)}</span>
            </div>
          </div>

          {/* Other Categories Links */}
          <div className="border-t border-neutral-100 pt-4">
            <span className="text-[11px] font-bold uppercase tracking-wide text-neutral-500 block mb-3">
              Other Categories
            </span>
            <div className="flex flex-col gap-2">
              {displayCategories.map((cat) => {
                const isActive = cat.slug === category.slug;
                return (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? "bg-brand-green-light text-brand-green font-semibold"
                        : "text-neutral-600 hover:bg-brand-green-light/60 hover:text-brand-green"
                    }`}
                  >
                    <DynamicIcon name={cat.icon} className={isActive ? "w-4 h-4 text-brand-green" : "w-4 h-4 text-neutral-400 group-hover:text-brand-green transition-colors"} />
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar Advertisement */}
          <div className="mt-2">
            <AdContainer type="rectangle" />
          </div>
        </aside>

        {/* Products Panel */}
        <div className="lg:col-span-3">
          {/* Controls Bar (Filter toggle for mobile + Sorting) */}
          <div className="flex items-center justify-between border-b border-neutral-200/50 pb-4 mb-6 gap-4">
            <span className="text-xs text-neutral-500 font-medium">
              Showing {processedProducts.length} of {initialProducts.length} products
            </span>
            
            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-green" />
                <span>Filters</span>
              </button>

              {/* Sort dropdown */}
              <div className="flex items-center gap-1.5 relative bg-white border border-neutral-200 rounded-full px-4 py-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-neutral-700 outline-none cursor-pointer pr-1"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filters Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden bg-white border border-neutral-200 rounded-3xl p-5 mb-6 card-shadow flex flex-col gap-5 animate-in slide-in-from-top duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <span className="text-xs font-bold text-neutral-800">Filter Products</span>
                <button
                  onClick={handleReset}
                  className="text-[10px] font-bold text-brand-green flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wide text-neutral-500 block mb-2">
                  Max Price: <span className="text-brand-green font-display font-bold text-xs">{formatPrice(maxPrice)}</span>
                </label>
                <input
                  type="range"
                  min={priceLimits.min}
                  max={priceLimits.max}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-green"
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          {processedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {processedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-neutral-200/40 card-shadow max-w-md mx-auto mt-10">
              <SlidersHorizontal className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <h3 className="font-display font-bold text-neutral-800 text-lg">No products match your criteria</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Try dragging the price slider higher to find more premium choices.
              </p>
              <button
                onClick={handleReset}
                className="mt-5 rounded-full bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2 text-xs font-bold transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
