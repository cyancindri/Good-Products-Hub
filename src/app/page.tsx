import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import DynamicIcon from "@/components/DynamicIcon";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import AdContainer from "@/components/AdContainer";
import CategorySlider from "@/components/CategorySlider";
import StickyWrapper from "@/components/StickyWrapper";
import { getProducts, getBlogs, getCategories, searchStore, Category } from "@/lib/sanity";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = typeof resolvedSearchParams.search === "string" ? resolvedSearchParams.search : "";

  // Fetch data
  const categories = await getCategories();
  const trendingProducts = await getProducts(undefined, true, false);
  const newArrivalProducts = await getProducts(undefined, false, true);
  const allProducts = await getProducts(undefined, false, false);
  const blogs = await getBlogs();
  const featuredNewArrival = newArrivalProducts[0];

  const allProductsCategory: Category = {
    _id: "all",
    name: "All Products",
    slug: "all",
    description: "Discover our complete catalog of curated, highly-rated tech gadgets, kitchen appliances, wellness products, and smart reads.",
    icon: "Grid",
  };
  const trendingCategory: Category = {
    _id: "trending",
    name: "Trending",
    slug: "trending",
    description: "Explore our collection of highly-purchased, trending products recommended by editors.",
    icon: "TrendingUp",
  };
  const homepageCategories = [allProductsCategory, trendingCategory, ...categories];

  // Search logic if query exists
  let searchResults = null;
  if (searchQuery) {
    searchResults = await searchStore(searchQuery);
  }
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Good Products Hub",
    "url": "https://goodproductshub.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://goodproductshub.in/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Good Products Hub",
    "url": "https://goodproductshub.in",
    "logo": "https://goodproductshub.in/logo.png",
    "sameAs": [
      "https://twitter.com/goodproductshub",
      "https://facebook.com/goodproductshub"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {searchResults ? (
          /* ========================================================
             SEARCH RESULTS MODE
             ======================================================== */
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Search Results</span>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-neutral-800 mt-1">
                Showing results for &ldquo;<span className="text-brand-green">{searchQuery}</span>&rdquo;
              </h1>
              <p className="text-xs text-neutral-500 mt-2">
                We found {searchResults.products.length} products and {searchResults.blogs.length} articles matching your criteria.
              </p>
            </div>

            {/* Products Search Results */}
            {searchResults.products.length > 0 && (
              <section className="mb-12">
                <h2 className="font-display font-extrabold text-xl text-neutral-800 mb-6 border-b border-neutral-100 pb-2">
                  Matching Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {searchResults.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Sponsored Ads banner */}
            <div className="mb-12">
              <AdContainer type="inline" />
            </div>

            {/* Blogs Search Results */}
            {searchResults.blogs.length > 0 && (
              <section className="mb-12">
                <h2 className="font-display font-extrabold text-xl text-neutral-800 mb-6 border-b border-neutral-100 pb-2">
                  Matching Buying Guides
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {searchResults.blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              </section>
            )}

            {/* No Results Found */}
            {searchResults.products.length === 0 && searchResults.blogs.length === 0 && (
              <div className="flex flex-col items-center w-full">
                <div className="text-center py-16 px-4 bg-white rounded-3xl border border-neutral-200/40 card-shadow max-w-xl mx-auto my-10 w-full">
                  <AlertCircle className="w-12 h-12 text-brand-gold mx-auto mb-4" />
                  <h2 className="font-display font-extrabold text-xl text-neutral-800">No Item found</h2>
                  <p className="text-xs text-neutral-500 mt-2 max-w-sm mx-auto leading-relaxed">
                    We couldn&rsquo;t find anything matching your search. Try checking your spelling or explore the categories below.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {homepageCategories.map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/category/${cat.slug}`}
                        className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-brand-green transition-colors"
                      >
                        <DynamicIcon name={cat.icon} className="w-4 h-4 text-brand-green" />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/"
                    className="mt-8 inline-block text-xs font-bold text-brand-green hover:underline"
                  >
                    &larr; Back to Homepage
                  </Link>
                </div>

                {/* Sponsor ad for empty search results */}
                <div className="w-full max-w-xl mb-12">
                  <AdContainer type="inline" />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ========================================================
             STANDARD HOMEPAGE LAYOUT
             ======================================================== */
          <>
            {/* Category Pills Row */}
            <div className="hidden sm:block mx-auto sm:max-w-159.75 md:max-w-200 lg:max-w-7xl px-4 sm:px-6 lg:px-8 my-8 pt-2 pb-4">
              <CategorySlider categories={homepageCategories} />
            </div>

            {/* 2. Trending Products Grid */}
            <section className="pt-6 pb-12 sm:py-12 bg-white/50 border-b border-neutral-100">
              {/* Responsive Sticky Header */}
              <StickyWrapper>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <h2 className="font-display font-extrabold text-2xl text-neutral-800 mt-1">Trending Purchases</h2>
                  </div>
                  <Link
                    href="/category/trending"
                    className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1 group self-start sm:self-auto"
                  >
                    <span>View trending products</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </StickyWrapper>

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
                {trendingProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {trendingProducts.slice(0, 8).map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-neutral-200 bg-white p-8 text-center">
                    <p className="text-sm font-bold text-neutral-800">No trending products yet</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Open Studio, edit a product, and enable <span className="font-semibold text-brand-green">Is Trending Product</span>.
                    </p>
                    <Link href="/studio" className="mt-4 inline-flex rounded-full bg-brand-green px-5 py-2 text-xs font-bold text-white hover:bg-brand-green-dark">
                      Open Studio
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* 3. New Arrivals Banner (Two columns: Banner & Ad) */}
            <section className="py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                  {/* Promo Banner Card */}
                  <div className="lg:col-span-2 rounded-3xl overflow-hidden relative flex flex-col justify-between p-6 md:p-8 lg:p-10 text-white bg-gradient-to-br from-brand-green-dark via-brand-green to-[#2C411E] card-shadow h-auto lg:h-[300px] py-8 md:py-8 lg:py-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-2xl pointer-events-none" />
                    <div className="relative z-10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/15 px-3 py-1 rounded-full border border-brand-gold/20">
                        New & Noteworthy
                      </span>
                      <h3 className="font-display font-extrabold text-xl md:text-2xl mt-4 max-w-md leading-tight line-clamp-2">
                        {featuredNewArrival?.title || "Add a New Arrival Product"}
                      </h3>
                      <p className="text-xs text-neutral-200/90 max-w-xl mt-3 leading-relaxed line-clamp-2 md:line-clamp-3">
                        {featuredNewArrival?.summary || "Mark a product as a new arrival in Studio to feature it here."}
                      </p>
                    </div>

                    <div className="mt-6 relative z-10 flex flex-wrap items-center gap-4">
                      <Link
                        href={featuredNewArrival ? `/product/${featuredNewArrival.slug}` : "/studio"}
                        className="rounded-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 text-xs font-bold tracking-wide transition-colors shadow-lg shadow-orange-950/20"
                      >
                        {featuredNewArrival ? "Read Review" : "Open Studio"}
                      </Link>
                      <Link
                        href={featuredNewArrival ? `/category/${featuredNewArrival.categorySlug}` : "/category/all"}
                        className="text-xs font-bold text-neutral-100 hover:text-white flex items-center gap-1 group"
                      >
                        <span>{featuredNewArrival ? "Browse Category" : "View All Products"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Clean Side Ad Placement */}
                  <div className="h-full flex items-stretch justify-center">
                    <AdContainer type="rectangle" className="w-full flex-1 max-w-[336px]" />
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Latest Buying Guides & Blogs */}
            <section id="blogs" className="scroll-mt-20 pt-6 pb-20 sm:pt-12 sm:pb-20 bg-white/40 border-t border-neutral-100">
              {/* Responsive Sticky Header */}
              <StickyWrapper>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">Editorial Guides</span>
                    <h2 className="font-display font-extrabold text-2xl text-neutral-800 mt-1">Latest Buying Advice</h2>
                  </div>
                  <Link
                    href="/blog"
                    className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1 group self-start sm:self-auto"
                  >
                    <span>View All Guides</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </StickyWrapper>

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogs.slice(0, 4).map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>

                {/* Inline Sponsor banner at end */}
                <div className="mt-12">
                  <AdContainer type="inline" />
                </div>
              </div>
            </section>
            
            {/* 5. All Products Grid (Positioned below the last sponsor section) */}
            <section className="pt-6 pb-20 sm:py-16 bg-neutral-50/50 border-t border-neutral-100">
              {/* Responsive Sticky Header */}
              <StickyWrapper>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <h2 className="font-display font-extrabold text-2xl text-neutral-800 mt-1">Products</h2>
                  </div>
                  <Link
                    href="/category/all"
                    className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1 group self-start sm:self-auto"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </StickyWrapper>

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
                {allProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allProducts.slice(0, 8).map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-neutral-200 bg-white p-8 text-center">
                    <p className="text-sm font-bold text-neutral-800">No products available</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Open Studio to add products to the website catalog.
                    </p>
                    <Link href="/studio" className="mt-4 inline-flex rounded-full bg-brand-green px-5 py-2 text-xs font-bold text-white hover:bg-brand-green-dark">
                      Open Studio
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Sponsor banner below Products section */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
              <AdContainer type="inline" />
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </>
  );
}
