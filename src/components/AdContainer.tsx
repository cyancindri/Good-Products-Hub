import React from "react";

interface AdContainerProps {
  type?: "banner" | "rectangle" | "vertical" | "inline";
  className?: string;
}

export default function AdContainer({ type = "banner", className = "" }: AdContainerProps) {
  let sizeClasses = "";
  let content = null;

  switch (type) {
    case "banner":
      sizeClasses = "w-full min-h-[90px] md:min-h-[120px] max-h-[140px]";
      content = (
        <div className="flex flex-col items-center justify-center p-4">
          <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold mb-1.5">Sponsored Advertisement</span>
          <div className="text-center">
            <span className="text-sm sm:text-base font-extrabold text-neutral-900">Support Good Products Hub</span>
            <p className="text-xs text-neutral-600 font-medium mt-1">Explore deals of the day on Amazon for up to 40% off.</p>
          </div>
        </div>
      );
      break;
    case "rectangle":
      sizeClasses = "w-full max-w-[336px] min-h-[280px] aspect-[1.2] mx-auto";
      content = (
        <div className="flex flex-col items-center justify-center p-6 h-full">
          <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold mb-4">Sponsored Sponsor</span>
          <div className="text-center flex-1 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-brand-green font-bold text-lg">₹</span>
            </div>
            <span className="text-base font-extrabold text-neutral-900">Best Budget Tech Gadgets</span>
            <p className="text-xs text-neutral-600 font-medium mt-2">Compare prices across multiple marketplaces automatically.</p>
          </div>
          <button className="mt-4 px-4 py-1.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold tracking-wide transition-colors">
            Learn More
          </button>
        </div>
      );
      break;
    case "vertical":
      sizeClasses = "w-[160px] min-h-[600px] h-full hidden lg:flex flex-col justify-between p-4";
      content = (
        <>
          <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold text-center">Advertisement</span>
          <div className="text-center my-auto flex flex-col gap-6">
            <div className="p-3 border border-neutral-200/50 rounded-xl bg-white/50">
              <span className="text-xs font-bold text-neutral-950">Smart Kitchen Tech</span>
              <p className="text-[10px] text-neutral-600 font-medium mt-1">Multi-cookers, smart kettles, air fryers.</p>
            </div>
            <div className="p-3 border border-neutral-200/50 rounded-xl bg-white/50">
              <span className="text-xs font-bold text-neutral-950">E-Readers Deals</span>
              <p className="text-[10px] text-neutral-600 font-medium mt-1">Kindle Paperwhite, Kobo, accessories.</p>
            </div>
          </div>
          <span className="text-[9px] text-brand-gold font-bold text-center">AdChoices</span>
        </>
      );
      break;
    case "inline":
      sizeClasses = "w-full min-h-[80px] p-3";
      content = (
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-2">
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium">Sponsor</span>
          <p className="text-xs text-neutral-600 text-center md:text-left flex-1 md:px-4">
            Shopping through our affiliate links helps support our editorial review team at no extra cost to you.
          </p>
          <a
            href="https://amazon.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-extrabold text-orange-600 hover:text-orange-700 hover:underline shrink-0 transition-colors"
          >
            Visit Marketplace &rarr;
          </a>
        </div>
      );
      break;
  }

  return (
    <div
      className={`bg-brand-gold-light border border-brand-gold/30 rounded-3xl flex flex-col justify-center overflow-hidden card-shadow transition-all ${sizeClasses} ${className}`}
    >
      {content}
    </div>
  );
}
