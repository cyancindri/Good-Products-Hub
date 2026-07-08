"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink, ShieldCheck, Heart, Share2, Award, CheckCircle } from "lucide-react";
import Rating from "@/components/Rating";
import ProsCons from "@/components/ProsCons";
import ReviewCard from "@/components/ReviewCard";
import ProductCard from "@/components/ProductCard";
import AdContainer from "@/components/AdContainer";
import { Product, ProductImage } from "@/lib/sanity";

interface ProductClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductClient({ product, relatedProducts }: ProductClientProps) {
  const productImages = useMemo<ProductImage[]>(
    () => product.images.length > 0 ? product.images : [{ url: "/logo.png", alt: product.title }],
    [product.images, product.title]
  );
  const [activeImage, setActiveImage] = useState<ProductImage>(productImages[0]);
  const [displayImage, setDisplayImage] = useState<ProductImage>(productImages[0]);
  const [isFading, setIsFading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Instant scroll-to-top on mount to prevent any delayed restoration jumps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 1. Smooth cross-fade transition when image changes
  useEffect(() => {
    setIsFading(true);
    const timer = setTimeout(() => {
      setDisplayImage(activeImage);
      setIsFading(false);
    }, 150); // duration of fade transition
    return () => clearTimeout(timer);
  }, [activeImage]);

  // 2. Keyboard Navigation (Arrow keys scroll active image)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (productImages.length <= 1) return;

      if (e.key === "ArrowLeft") {
        setActiveImage((current) => {
          const currentIndex = productImages.indexOf(current);
          const prevIndex = (currentIndex - 1 + productImages.length) % productImages.length;
          return productImages[prevIndex];
        });
      } else if (e.key === "ArrowRight") {
        setActiveImage((current) => {
          const currentIndex = productImages.indexOf(current);
          const nextIndex = (currentIndex + 1) % productImages.length;
          return productImages[nextIndex];
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [productImages]);

  // 3. Auto-scroll image gallery (cycles every 4s, resets on manual/arrow select)
  useEffect(() => {
    if (productImages.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImage((current) => {
        const currentIndex = productImages.indexOf(current);
        const nextIndex = (currentIndex + 1) % productImages.length;
        return productImages[nextIndex];
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [activeImage, productImages]);

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleBuyClick = async () => {
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
      colors: ["#4E6B35", "#C19A5B", "#4B2F1C"],
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400 mb-8 overflow-hidden whitespace-nowrap">
        <Link href="/" className="hover:text-brand-green transition-colors shrink-0">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href={`/category/${product.categorySlug}`} className="hover:text-brand-green transition-colors shrink-0 whitespace-nowrap">
          {product.categoryName || "Category"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-brand-green-dark truncate min-w-0">{product.title}</span>
      </nav>

      {/* 2. Main Product Presentation Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        {/* Left Column: Image Gallery (Matches height of details box) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3 self-stretch">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-0 flex-1 w-full overflow-hidden bg-white rounded-3xl border border-neutral-200/40 card-shadow min-h-[320px] lg:min-h-0">
            <Image
              src={displayImage.url}
              alt={displayImage.alt || product.title}
              fill
              className={`object-contain transition-opacity duration-200 ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}
              sizes="(max-width: 1024px) 100vw, 500px"
              priority
            />
          </div>
          
          {/* Thumbnails */}
          {productImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 ${
                    activeImage === img ? "border-brand-green scale-95" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt || `${product.title} view ${i + 1}`}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Key Details */}
        <div className="lg:col-span-7 bg-white border border-neutral-200/40 rounded-3xl p-6 md:p-8 card-shadow flex flex-col justify-between self-stretch">
          <div>
            {/* <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="flex items-center gap-1 rounded-full bg-brand-green-light px-3 py-1 text-[10px] font-bold text-brand-green border border-brand-green/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                {product.marketplace} Verified
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-neutral-400 hover:text-brand-green hover:bg-neutral-50 rounded-full border border-neutral-100 transition-colors"
                  title="Copy link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <span className={`text-[10px] font-bold text-brand-green absolute right-16 transition-opacity ${isCopied ? "opacity-100" : "opacity-0"}`}>
                  Link copied!
                </span>
              </div>
            </div> */}

            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-neutral-800 mt-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mt-4 pb-4 border-b border-neutral-100">
              <Rating rating={product.rating} size={18} />
              <span className="text-neutral-300">|</span>
              <span className="font-display font-extrabold text-xl sm:text-2xl text-neutral-900">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
              {product.summary}
            </p>
          </div>

          {/* Call to action & trust metrics */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center shrink-0 shadow-sm">
                <Award className="w-5 h-5 text-amber-500 fill-amber-100" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">Overall Score</span>
                <span className="text-sm font-extrabold text-neutral-800">{product.rating} / 5.0 Rating</span>
              </div>
            </div>

            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleBuyClick}
              className="rounded-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-sm font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
            >
              <span>Buy Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Key Features */}
      <section className="mb-12 border-t border-neutral-100 pt-10">
        <h2 className="font-display font-extrabold text-xl text-neutral-800 mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-brand-green" />
          Key Features & Specifications
        </h2>
        <div className="bg-white border border-neutral-200/40 rounded-3xl p-6 md:p-8 card-shadow">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0 mt-2" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Pros & Cons */}
      <section className="mb-12">
        <h2 className="font-display font-extrabold text-xl text-neutral-800 mb-2">
          Honest Pros & Cons
        </h2>
        <p className="text-[11px] text-neutral-400 mb-6">Based on actual user trials and verified consumer feedback.</p>
        <ProsCons pros={product.pros} cons={product.cons} />
      </section>

      {/* 5. Google Ad block (Middle of page) */}
      <section className="my-10">
        <AdContainer type="banner" />
      </section>

      {/* 6. Review screenshots simulator */}
      {product.reviewScreenshots && product.reviewScreenshots.length > 0 && (
        <section className="mb-12 border-t border-neutral-100 pt-10">
          <h2 className="font-display font-extrabold text-xl text-neutral-800 mb-2">
            Top Reviews from Buyers
          </h2>
          <p className="text-[11px] text-neutral-400 mb-6">Verified purchase comments compiled directly from marketplaces.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviewScreenshots
              .filter((rev) => rev.comment && rev.reviewer)
              .map((rev, i) => (
                <ReviewCard
                  key={i}
                  reviewer={rev.reviewer || "Anonymous Buyer"}
                  rating={rev.rating || 5}
                  date={rev.date || "Recent"}
                  comment={rev.comment || ""}
                  avatarUrl={rev.url}
                  verified={rev.verified ?? true}
                />
              ))}
          </div>
        </section>
      )}

      {/* 7. Related products carousel/grid */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-100 pt-10">
          <h2 className="font-display font-extrabold text-xl text-neutral-800 mb-6">
            Related Products to Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 3).map((related) => (
              <ProductCard key={related._id} product={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
