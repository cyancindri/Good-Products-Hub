"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, Clock, User, BookOpen, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Rating from "@/components/Rating";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import AdContainer from "@/components/AdContainer";
import { Blog, Product } from "@/lib/sanity";

interface BlogClientProps {
  blog: Blog;
  relatedProducts: Product[];
  otherBlogs: Blog[];
}

export default function BlogClient({ blog, relatedProducts, otherBlogs }: BlogClientProps) {
  const [activeHeading, setActiveHeading] = useState("");
  const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract headings for Table of Contents
  const headings = React.useMemo(() => {
    const headingList: { text: string; id: string; level: number }[] = [];

    // 1. If using the new structured blocks editor
    if (blog.contentBlocks && blog.contentBlocks.length > 0) {
      blog.contentBlocks.forEach((block) => {
        if (block._type === "headingBlock" && block.text) {
          const text = block.text.trim();
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          headingList.push({
            text,
            id,
            level: block.level === "h3" ? 3 : 2,
          });
        } else if (block._type === "productMentionBlock" && block.product?.title) {
          const text = block.product.title.trim();
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          headingList.push({
            text,
            id,
            level: 3,
          });
        }
      });
      return headingList;
    }

    // 2. Fallback to old plain markdown text splitting
    if (blog.content) {
      const lines = blog.content.split("\n");
      lines.forEach((line) => {
        if (line.startsWith("## ") || line.startsWith("### ")) {
          const isSub = line.startsWith("### ");
          const text = line.replace("### ", "").replace("## ", "").trim();
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          headingList.push({
            text,
            id,
            level: isSub ? 3 : 2,
          });
        }
      });
    }

    return headingList;
  }, [blog.content, blog.contentBlocks]);

  // Scrollspy observer to highlight active TOC heading
  useEffect(() => {
    const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0px -75% 0px" } // trigger when heading is in top portion of screen
    );

    headingElements.forEach((el) => observer.observe(el!));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el!));
    };
  }, [headings]);

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Convert markdown-like text to HTML blocks & inject ads and products
  const renderContentBlocks = () => {
    // 1. Render structured contentBlocks if they exist
    if (blog.contentBlocks && blog.contentBlocks.length > 0) {
      return blog.contentBlocks.map((block, idx) => {
        switch (block._type) {
          case "headingBlock": {
            const text = block.text || "";
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            if (block.level === "h3") {
              return (
                <h3 id={id} key={idx} className="font-display font-extrabold text-base md:text-lg text-neutral-800 mt-8 mb-3 scroll-mt-24">
                  {text}
                </h3>
              );
            }
            return (
              <h2 id={id} key={idx} className="font-display font-extrabold text-xl md:text-2xl text-neutral-800 mt-10 mb-4 scroll-mt-24 border-b border-neutral-100 pb-2">
                {text}
              </h2>
            );
          }
          case "textBlock": {
            const formattedText = renderParagraphWithFormatting(block.text || "");
            return (
              <p key={idx} className="text-xs md:text-sm text-neutral-600 leading-relaxed my-4">
                {formattedText}
              </p>
            );
          }
          case "productMentionBlock": {
            const product = block.product;
            if (!product) return null;
            const headingId = product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <div key={idx} className="my-10 scroll-mt-24">
                {/* 1. Heading (registered in Table of Contents) */}
                <h3 id={headingId} className="font-display font-extrabold text-base md:text-lg text-neutral-800 mt-8 mb-3 scroll-mt-24">
                  {product.title}
                </h3>
                {/* 2. Description (Product Summary) */}
                {product.summary && (
                  <p className="text-xs md:text-sm text-neutral-600 leading-relaxed my-4">
                    {product.summary}
                  </p>
                )}
                {/* 3. Product Action Card (with image, price, rating, CTAs) at the end */}
                <div className="bg-neutral-50/50 border border-neutral-100 rounded-3xl p-5 md:p-6 card-shadow mt-4">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-brand-green bg-brand-green-light px-2.5 py-0.5 rounded-full mb-3 inline-block">
                    Featured Product Details
                  </span>
                  <div className="flex flex-col md:flex-row gap-5 items-center">
                    <div className="relative w-full md:w-40 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 bg-white border border-neutral-100">
                      <Image src={product.images[0]?.url || "/logo.png"} alt={product.images[0]?.alt || product.title} fill className="object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between self-stretch text-center md:text-left py-1">
                      <div>
                        <h4 className="font-display font-bold text-neutral-800 text-sm leading-snug">{product.title}</h4>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-1.5">
                          <Rating rating={product.rating} size={12} />
                          <span className="font-display font-black text-neutral-950 text-sm sm:text-base">
                            {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(product.price)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                        <Link href={`/product/${product.slug}`} className="rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-1.5 text-[11px] font-bold transition-colors">
                          Review Verdict
                        </Link>
                        <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 text-[11px] font-bold transition-colors inline-flex items-center gap-1">
                          <span>Buy Now</span>
                          <ExternalLink className="w-3 h-3 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          default:
            return null;
        }
      });
    }

    // 2. Fallback to old plain markdown paragraph split-rendering
    const paragraphs = blog.content.split("\n\n");
    const elements: React.ReactNode[] = [];

    paragraphs.forEach((p, idx) => {
      const trimmed = p.trim();
      if (!trimmed) return;

      let element: React.ReactNode = null;

      // Check for headings
      if (trimmed.startsWith("## ")) {
        const text = trimmed.replace("## ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        element = (
          <h2 id={id} key={idx} className="font-display font-extrabold text-xl md:text-2xl text-neutral-800 mt-10 mb-4 scroll-mt-24 border-b border-neutral-100 pb-2">
            {text}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        const text = trimmed.replace("### ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        element = (
          <h3 id={id} key={idx} className="font-display font-extrabold text-base md:text-lg text-neutral-800 mt-8 mb-3 scroll-mt-24">
            {text}
          </h3>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
        // Bullet list
        const items = trimmed.split("\n").map((item) => item.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, ""));
        element = (
          <ul key={idx} className="list-disc pl-5 my-4 space-y-2 text-xs md:text-sm text-neutral-600 leading-relaxed">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ul>
        );
      } else {
        // Standard Paragraph, but support bold markdown text
        const formattedText = renderParagraphWithFormatting(trimmed);
        element = (
          <p key={idx} className="text-xs md:text-sm text-neutral-600 leading-relaxed my-4">
            {formattedText}
          </p>
        );
      }

      elements.push(element);

      // PLACEMENT RULE 1: Google Ad after introduction (approx paragraph 2 or first heading)
      if (idx === 1) {
        elements.push(
          <div key={`ad-intro-${idx}`} className="my-8">
            <AdContainer type="banner" />
          </div>
        );
      }

      // PLACEMENT RULE 2: Embedded product card in middle of article
      if (idx === Math.floor(paragraphs.length / 2)) {
        if (relatedProducts.length > 0) {
          const product = relatedProducts[0];
          elements.push(
            <div key={`embedded-prod-${idx}`} className="my-8 bg-neutral-50/50 border border-neutral-100 rounded-3xl p-5 md:p-6 card-shadow">
              <span className="text-[9px] uppercase font-bold tracking-wider text-brand-green bg-brand-green-light px-2.5 py-0.5 rounded-full mb-3 inline-block">
                Featured Product Mentioned
              </span>
              <div className="flex flex-col md:flex-row gap-5 items-center">
                <div className="relative w-full md:w-40 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 bg-white border border-neutral-100">
                  <Image src={product.images[0]?.url || "/logo.png"} alt={product.images[0]?.alt || product.title} fill className="object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-between self-stretch text-center md:text-left py-1">
                  <div>
                    <h4 className="font-display font-bold text-neutral-800 text-sm md:text-base leading-snug">{product.title}</h4>
                    <div className="flex items-center justify-center md:justify-start gap-3 mt-1.5">
                      <Rating rating={product.rating} size={12} />
                      <span className="font-display font-black text-neutral-950 text-sm sm:text-base">
                        {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(product.price)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    <Link href={`/product/${product.slug}`} className="rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-1.5 text-[11px] font-bold transition-colors">
                      Review Verdict
                    </Link>
                    <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 text-[11px] font-bold transition-colors inline-flex items-center gap-1">
                      <span>Buy Now</span>
                      <ExternalLink className="w-3 h-3 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }

      // PLACEMENT RULE 3: Google Ad in middle of article
      if (idx === Math.floor(paragraphs.length / 2) + 2) {
        elements.push(
          <div key={`ad-middle-${idx}`} className="my-8">
            <AdContainer type="inline" />
          </div>
        );
      }
    });

    return elements;
  };

  // Helper to format text with **bold** markers
  const renderParagraphWithFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold text-neutral-800">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const getCategoryLabel = (slug: string) => {
    switch (slug) {
      case "tech-gadgets":
        return "Tech & Gadgets";
      case "home-kitchen":
        return "Home & Kitchen";
      case "fitness-wellness":
        return "Fitness & Wellness";
      case "books-reading":
        return "Books & Reading";
      default:
        return "Buying Guide";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400 mb-6 overflow-hidden whitespace-nowrap">
        <Link href="/" className="hover:text-brand-green transition-colors shrink-0">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-neutral-500 shrink-0">{blog.categoryName || "Guides"}</span>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-brand-green-dark truncate min-w-0">{blog.title}</span>
      </nav>

      {/* 2. Blog Title Banner Header */}
      <header className="mb-10 text-center max-w-4xl mx-auto">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green-light px-3 py-1 rounded-full border border-brand-green/10">
          {getCategoryLabel(blog.categorySlug)}
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-neutral-800 mt-5 leading-tight tracking-tight">
          {blog.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-4 max-w-2xl mx-auto leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Meta details */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-neutral-500 border-t border-b border-neutral-100 py-3.5">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-brand-green" />
            Written by {blog.author}
          </span>
          <span className="text-neutral-300">|</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-green" />
            {blog.date}
          </span>
          <span className="text-neutral-300">|</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-green" />
            {blog.readTime}
          </span>
        </div>
      </header>

      {/* 3. Cover Image */}
      <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden card-shadow mb-12 bg-neutral-100 border border-neutral-200/30">
        <Image src={blog.cover?.url || "/logo.png"} alt={blog.cover?.alt || blog.title} fill className="object-cover" priority sizes="100vw" />
      </div>

      {/* 4. Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Table of Contents sidebar (Desktop only) */}
        <aside className="hidden lg:flex flex-col gap-6 lg:col-span-3 sticky top-24">
          <div className="bg-white border border-neutral-200/40 rounded-3xl p-5 card-shadow">
            <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 border-b border-neutral-100 pb-3 mb-3">
              <BookOpen className="w-4 h-4 text-brand-green" />
              Table of Contents
            </span>
            <nav className="flex flex-col gap-2.5">
              {headings.map((h, i) => (
                <a
                  key={i}
                  href={`#${h.id}`}
                  className={`text-xs font-medium leading-relaxed transition-all block ${
                    h.level === 3 ? "pl-3 text-[11px]" : ""
                  } ${
                    activeHeading === h.id
                      ? "text-brand-green font-bold border-l-2 border-brand-green pl-2"
                      : "text-neutral-500 hover:text-brand-green hover:pl-1"
                  }`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </div>

          <AdContainer type="rectangle" />
        </aside>

        {/* Main Content Column */}
        <article className="lg:col-span-9 bg-white border border-neutral-200/40 rounded-3xl p-6 md:p-10 card-shadow">
          <div ref={contentRef} className="prose max-w-none">
            {renderContentBlocks()}
          </div>

          {/* PLACEMENT RULE 4: Google Ad before FAQ */}
          <div className="my-8">
            <AdContainer type="banner" />
          </div>

          {/* 5. Accordion FAQs */}
          {blog.faqs && blog.faqs.length > 0 && (
            <section className="mt-10 pt-8 border-t border-neutral-100">
              <h3 className="font-display font-extrabold text-xl text-neutral-800 mb-6">
                Frequently Asked Questions (FAQ)
              </h3>
              <div className="space-y-3">
                {blog.faqs.map((faq, i) => {
                  const isOpen = !!openFaqs[i];
                  return (
                    <div
                      key={i}
                      className="border border-neutral-100 rounded-2xl overflow-hidden transition-all bg-neutral-50/20"
                    >
                      <button
                        onClick={() => toggleFaq(i)}
                        className="w-full flex items-center justify-between gap-4 p-4 text-left font-bold text-xs md:text-sm text-neutral-700 hover:text-brand-green transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-brand-green" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                      </button>
                      
                      {isOpen && (
                        <div className="p-4 pt-0 border-t border-neutral-50 text-xs md:text-sm text-neutral-500 leading-relaxed bg-white">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Conclusion */}
          <div className="mt-10 pt-8 border-t border-neutral-100 bg-brand-green-light/40 border border-brand-green/10 rounded-3xl p-6 text-xs md:text-sm text-neutral-600 leading-relaxed">
            <h4 className="font-display font-extrabold text-brand-green-dark text-base mb-2">Verdict Summary</h4>
            Making the right buying decisions doesn&rsquo;t have to be expensive. By understanding what features align with your specific demands and budget limits, you can buy products that serve you perfectly for years to come. Check out our category listings for live pricing updates.
          </div>
        </article>
      </div>

      {/* 6. Related articles row */}
      {otherBlogs.length > 0 && (
        <section className="mt-16 border-t border-neutral-100 pt-12">
          <h2 className="font-display font-extrabold text-xl text-neutral-800 mb-6">
            Related Buying Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherBlogs.slice(0, 2).map((other) => (
              <BlogCard key={other._id} blog={other} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
