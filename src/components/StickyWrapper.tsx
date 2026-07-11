"use client";

import React, { useState, useEffect, useRef } from "react";

interface StickyWrapperProps {
  children: React.ReactNode;
}

export default function StickyWrapper({ children }: StickyWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // The header has sticky top-[80px]. It is stuck when rect.top <= 81 
        // and we have scrolled down the page.
        const stuck = rect.top <= 81 && window.scrollY > 20;
        setIsStuck(stuck);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`sticky top-[80px] lg:relative lg:top-0 z-20 transition-all duration-300 w-full ${
        isStuck
          ? "bg-white/95 backdrop-blur-sm border-b border-neutral-100 shadow-sm py-3"
          : "bg-transparent border-transparent py-3"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
