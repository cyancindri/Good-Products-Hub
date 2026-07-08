import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import DynamicIcon from "@/components/DynamicIcon";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import AdContainer from "@/components/AdContainer";
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
  const blogs = await getBlogs();
  const featuredNewArrival = newArrivalProducts[0];

  const allProductsCategory: Category = {
    _id: "all",
    name: "All Products",
    slug: "all",
    description: "Discover our complete catalog of curated, highly-rated tech gadgets, kitchen appliances, wellness products, and smart reads.",
    icon: "Grid",
  };
  const homepageCategories = [allProductsCategory, ...categories];

  // Search logic if query exists
  let searchResults = null;
  if (searchQuery) {
    searchResults = await searchStore(searchQuery);
  }


  return (
    <>
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

            {/* Blogs Search Results */}
            {searchResults.blogs.length > 0 && (
              <section className="mb-12">
                <h2 className="font-display font-extrabold text-xl text-neutral-800 mb-6 border-b border-neutral-100 pb-2">
                  Matching Buying Guides & Blogs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} horizontal />
                  ))}
                </div>
              </section>
            )}

            {/* No Results Found */}
            {searchResults.products.length === 0 && searchResults.blogs.length === 0 && (
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-neutral-200/40 card-shadow max-w-xl mx-auto my-10">
                <AlertCircle className="w-12 h-12 text-brand-gold mx-auto mb-4" />
                <h2 className="font-display font-extrabold text-xl text-neutral-800">No results found</h2>
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
            )}
          </div>
        ) : (
          /* ========================================================
             STANDARD HOMEPAGE LAYOUT
             ======================================================== */
          <>
            {/* Category Pills Row */}
            <div className="hidden sm:block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8 pt-2 pb-4">
              <div className="flex flex-wrap justify-center gap-3">
                {homepageCategories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    className="card-shadow flex items-center gap-2 rounded-full border border-neutral-200/50 bg-white px-4.5 py-2 text-xs font-semibold text-neutral-700 hover:border-brand-green/30 hover:bg-brand-green-light hover:text-brand-green transition-all duration-300"
                  >
                    <DynamicIcon name={cat.icon} className="w-5 h-5 text-brand-green" />
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Trending Products Grid */}
            <section className="pt-6 pb-12 sm:py-12 bg-white/50 border-b border-neutral-100">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-2">
                  <div>
                    {/* <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">Curated Collections</span> */}
                    <h2 className="font-display font-extrabold text-2xl text-neutral-800 mt-1">Trending Purchases</h2>
                  </div>
                  <Link
                    href="/category/all"
                    className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1 group self-start sm:self-auto"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {trendingProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {trendingProducts.map((product) => (
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
                  <div className="lg:col-span-2 rounded-3xl overflow-hidden relative flex flex-col justify-between p-6 md:p-8 lg:p-10 text-white bg-gradient-to-br from-brand-green-dark via-brand-green to-[#2C411E] card-shadow min-h-[300px] lg:h-[300px]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-2xl pointer-events-none" />
                    <div className="relative z-10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/15 px-3 py-1 rounded-full border border-brand-gold/20">
                        New & Noteworthy
                      </span>
                      <h3 className="font-display font-extrabold text-xl md:text-2xl mt-4 max-w-md leading-tight line-clamp-2">
                        {featuredNewArrival?.title || "Add a New Arrival Product"}
                      </h3>
                      <p className="text-xs text-neutral-200/90 max-w-md mt-2.5 leading-relaxed line-clamp-3 md:line-clamp-4 lg:line-clamp-3 xl:line-clamp-4">
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
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">Editorial Guides</span>
                  <h2 className="font-display font-extrabold text-2xl text-neutral-800 mt-1">Latest Buying Advice</h2>
                  <p className="text-xs text-neutral-500 mt-1">Comprehensive buying guides that solve real questions on budgets and performance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>

                {/* Inline Sponsor banner at page end */}
                <div className="mt-12">
                  <AdContainer type="inline" />
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </>
  );
}
