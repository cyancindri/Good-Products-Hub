"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ShieldCheck } from "lucide-react";
import Rating from "./Rating";
import { Product } from "@/lib/sanity";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.[0]?.url || "/logo.png";

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleBuyClick = async (e: React.MouseEvent) => {
    // Spark confetti to celebrate the click!
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.85 },
      colors: ["#4E6B35", "#C19A5B", "#4B2F1C", "#FAF6F0"],
    });
  };

  return (
    <div className="card-shadow card-hover group flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/40 bg-white">
      {/* Product Image Link Container */}
      <Link href={`/product/${product.slug}`} scroll={false} className="relative aspect-square w-full overflow-hidden rounded-t-3xl bg-white border-b border-neutral-100/60">
        <Image
          src={primaryImage}
          alt={product.images?.[0]?.alt || product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {/* Marketplace badge */}
        {/* <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-brand-green border border-brand-green/10 shadow-sm backdrop-blur-sm">
          <ShieldCheck className="w-3 h-3 text-brand-green" />
          {product.marketplace}
        </span> */}
        
        {/* Trending / New badges */}
        {product.isTrending && (
          <span className="absolute top-3 right-3 rounded-full bg-neutral-900/90 text-brand-cream border border-neutral-700/20 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide shadow-sm backdrop-blur-sm">
            Trending
          </span>
        )}
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-1">
          {/* Rating */}
          <Rating rating={product.rating} size={12} />
          {/* Price */}
          <span className="font-display font-black text-neutral-950 text-sm sm:text-base">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Product Title */}
        <Link href={`/product/${product.slug}`} scroll={false} className="mt-2.5 block">
          <h3 className="font-display font-bold text-neutral-800 text-sm leading-snug line-clamp-2 hover:text-brand-green transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="mt-1.5 text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
          {product.summary}
        </p>

        {/* Action CTAs */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-1 border-t border-neutral-100">
          <Link
            href={`/product/${product.slug}`}
            scroll={false}
            className="flex items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 py-1.5 text-[11px] font-bold transition-all hover:bg-neutral-100 text-center"
          >
            Review Details
          </Link>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleBuyClick}
            className="flex items-center justify-center gap-1 rounded-full bg-orange-600 hover:bg-orange-700 text-white py-1.5 px-2 text-[11px] font-bold tracking-wide transition-colors shadow-sm"
          >
            <span>Buy Now</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
