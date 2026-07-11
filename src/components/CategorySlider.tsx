"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category } from "@/lib/sanity";
import DynamicIcon from "@/components/DynamicIcon";

interface CategorySliderProps {
  categories: Category[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
    }
    window.addEventListener("resize", checkScroll);

    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  useEffect(() => {
    const timer = setTimeout(checkScroll, 100);
    return () => clearTimeout(timer);
  }, [categories]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (categories.length === 0) return null;

  return (
    <div className="relative flex items-center w-full px-10 sm:px-14 md:px-12 select-none group">
      {/* Left Arrow Button */}
      <button
        onClick={() => handleScroll("left")}
        className={`absolute left-0 z-10 p-2 rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-md hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer ${
          canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-35 cursor-not-allowed"
        }`}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Viewport Mask */}
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto flex items-center gap-3 py-2 scroll-smooth"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          div::-webkit-scrollbar {
            display: none;
          }
        `}} />

        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/category/${cat.slug}`}
            className="card-shadow flex items-center gap-2 rounded-full border border-neutral-200/50 bg-white px-4.5 py-2 text-xs font-semibold text-neutral-700 hover:border-brand-green/30 hover:bg-brand-green-light hover:text-brand-green transition-all duration-300 shrink-0 select-none"
          >
            <DynamicIcon name={cat.icon} className="w-4.5 h-4.5 text-brand-green shrink-0" />
            <span className="whitespace-nowrap">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={() => handleScroll("right")}
        className={`absolute right-0 z-10 p-2 rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-md hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer ${
          canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-35 cursor-not-allowed"
        }`}
        disabled={!canScrollRight}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
