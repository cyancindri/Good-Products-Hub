import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, Clock, User } from "lucide-react";
import { Blog } from "@/lib/sanity";

interface BlogCardProps {
  blog: Blog;
  horizontal?: boolean;
}

export default function BlogCard({ blog, horizontal = false }: BlogCardProps) {
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

  if (horizontal) {
    return (
      <div className="card-shadow card-hover flex flex-col md:flex-row gap-6 overflow-hidden rounded-3xl border border-neutral-200/40 bg-white p-4">
        {/* Cover image */}
        <Link href={`/blog/${blog.slug}`} className="relative block aspect-[16/10] md:w-2/5 shrink-0 rounded-2xl overflow-hidden bg-neutral-100">
          <Image
            src={blog.cover?.url || "/logo.png"}
            alt={blog.cover?.alt || blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover"
          />
        </Link>

        {/* Content */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green bg-brand-green-light px-2.5 py-0.5 rounded-full">
              {blog.categoryName || getCategoryLabel(blog.categorySlug)}
            </span>
            <Link href={`/blog/${blog.slug}`} className="mt-3 block">
              <h3 className="font-display font-bold text-neutral-800 text-lg md:text-xl leading-snug hover:text-brand-green transition-colors">
                {blog.title}
              </h3>
            </Link>
            <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-2">
              {blog.excerpt}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-shadow card-hover group flex flex-col overflow-hidden rounded-3xl border border-neutral-200/40 bg-white">
      {/* Cover image */}
      <Link href={`/blog/${blog.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
        <Image
          src={blog.cover?.url || "/logo.png"}
          alt={blog.cover?.alt || blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-103"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-[9px] font-extrabold text-neutral-800 border border-neutral-200/60 shadow-sm">
          {blog.categoryName || getCategoryLabel(blog.categorySlug)}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 justify-between">
        <div>
          <Link href={`/blog/${blog.slug}`}>
            <h3 className="font-display font-bold text-neutral-800 text-base leading-snug hover:text-brand-green transition-colors line-clamp-2">
              {blog.title}
            </h3>
          </Link>
          <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {blog.author}
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {blog.readTime}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
