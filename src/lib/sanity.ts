import { createClient } from "@sanity/client";
import { defineQuery } from "next-sanity";

// Initialize Sanity Client
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dlqibmo9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-07",
  useCdn: !process.env.SANITY_API_TOKEN,
  token: process.env.SANITY_API_TOKEN,
});

// Interfaces
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface SEO {
  title: string;
  description: string;
}

export interface ReviewScreenshot {
  _type?: "reviewComment" | "reviewImage";
  // Text review fields
  url?: string;
  reviewer?: string;
  rating?: number;
  date?: string;
  comment?: string;
  verified?: boolean;
  // Image review fields
  caption?: string;
  image?: {
    url: string;
    alt: string;
  };
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface BlogCover {
  url: string;
  alt: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  images: ProductImage[];
  rating: number;
  price: number;
  affiliateLink: string;
  marketplace: string;
  features: string[];
  pros: string[];
  cons: string[];
  summary: string;
  reviewScreenshots: ReviewScreenshot[];
  seo: SEO;
  categorySlug: string;
  categoryName?: string;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isApproved?: boolean;
}

export interface BlogContentBlock {
  _type: "textBlock" | "headingBlock" | "productMentionBlock";
  text?: string;
  level?: "h2" | "h3";
  title?: string;
  description?: string;
  product?: Product;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  cover: BlogCover;
  excerpt: string;
  content: string; // Markdown or simple rich text representation
  contentBlocks?: BlogContentBlock[];
  categorySlug: string;
  categoryName?: string;
  seo: SEO;
  relatedProducts: string[]; // slugs or IDs
  author: string;
  date: string;
  readTime: string;
  faqs?: { question: string; answer: string }[];
  isApproved?: boolean;
}

// ==========================================
// HIGH-QUALITY LOCAL MOCK DATA (OFFLINE MODE)
// ==========================================

export const mockCategories: Category[] = [
  {
    _id: "cat-1",
    name: "Tech & Gadgets",
    slug: "tech-gadgets",
    description: "Sleek noise-cancelling headphones, smartwatches, keyboards, and modern workstations.",
    icon: "Laptop",
  },
  {
    _id: "cat-2",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "High-performance air fryers, automated cookers, espresso machines, and home decor.",
    icon: "Coffee",
  },
  {
    _id: "cat-3",
    name: "Fitness & Wellness",
    slug: "fitness-wellness",
    description: "Durable water bottles, yoga accessories, fitness trackers, and workout gear.",
    icon: "Dumbbell",
  },
  {
    _id: "cat-4",
    name: "Books & Smart Reading",
    slug: "books-reading",
    description: "In-depth non-fiction guides, paperwhite e-readers, note-taking tablets, and growth summaries.",
    icon: "BookOpen",
  }
];

export const mockProducts: Product[] = [
  {
    _id: "prod-1",
    title: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    slug: "sony-wh-1000xm5-headphones",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
        alt: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones in black color, side profile"
      },
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
        alt: "Sony wireless headphones placed on yellow tabletop focus shot"
      }
    ],
    rating: 4.8,
    price: 29990,
    affiliateLink: "https://amazon.in/dp/B0B1DKGD6B?tag=goodproductshub-21",
    marketplace: "Amazon",
    features: [
      "Industry-leading noise cancellation optimized dynamically to environment",
      "Magnificent Sound Quality with new Integrated Processor V1",
      "Crystal-clear hands-free calling with 4 beamforming microphones",
      "Up to 30-hour battery life with quick charging (3 min charge for 3 hours)",
      "Ultra-comfortable lightweight design in soft-fit leather"
    ],
    pros: [
      "Unparalleled active noise cancellation (ANC)",
      "Extremely comfortable, even during 8-hour coding sessions",
      "Crisp, balanced soundstage with rich, punchy bass",
      "Multi-point connection works flawlessly between laptop and phone"
    ],
    cons: [
      "Case design is bulkier and doesn't fold flat like XM4",
      "Premium pricing compared to entry-level alternatives",
      "Touch sensor controls can be sensitive in light rain"
    ],
    summary: "The Sony WH-1000XM5 raises the bar in active noise-cancelling headphones. Boasting an ultra-comfortable lightweight frame, 30 hours of continuous battery, and unmatched smart ambient tech, they are the gold standard for developers, travelers, and remote workers looking to lock in deep focus.",
    reviewScreenshots: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
        reviewer: "Aditi S.",
        rating: 5,
        date: "May 14, 2026",
        comment: "Absolutely amazing! I wear them for 6+ hours at my programming desk and my ears don't hurt at all. The ANC deletes my fan and street noise completely. Def worth the money.",
        verified: true,
      },
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
        reviewer: "Rahul K.",
        rating: 4.5,
        date: "June 2, 2026",
        comment: "Excellent sound signature, very neutral out of the box but easily tunable via the Sony app. The ambient pass-through mode is scary good, sounds like you aren't wearing anything.",
        verified: true,
      }
    ],
    seo: {
      title: "Sony WH-1000XM5 Headphones Review: Best Focus Tool? | Good Products Hub",
      description: "Read our comprehensive review of the Sony WH-1000XM5 noise-cancelling headphones. Explore features, battery tests, comfort metrics, and buying guides.",
    },
    categorySlug: "tech-gadgets",
    categoryName: "Tech & Gadgets",
    isTrending: true,
    isNewArrival: false,
    isApproved: true,
  },
  {
    _id: "prod-2",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker (6 Quart)",
    slug: "instant-pot-duo-cooker",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop",
        alt: "Instant Pot Duo 7-in-1 Electric Pressure Cooker in stainless steel and black trim"
      }
    ],
    rating: 4.7,
    price: 8999,
    affiliateLink: "https://amazon.in/dp/B00FLYWNYQ?tag=goodproductshub-21",
    marketplace: "Amazon",
    features: [
      "7-in-1 functionality: pressure cooker, slow cooker, rice cooker, yogurt maker, steamer, sauté pan, and food warmer",
      "13 customizable Smart Programs for one-touch cooking",
      "Tri-ply stainless steel inner pot for durability and heat distribution",
      "10+ safety features including over-heat protection and safety lid lock",
      "Cooks up to 70% faster than traditional cooking methods"
    ],
    pros: [
      "Incredible versatility; replaces multiple kitchen appliances",
      "Microprocessor automatically monitors pressure, temperature, and time",
      "Dishwasher-safe stainless steel inner cooking pot",
      "Massive time-saver for meal prep and busy professionals"
    ],
    cons: [
      "Large footprint takes up significant counter space",
      "Sealing ring absorbs food odors; requires periodic cleaning",
      "Standard recipe timings require adaptation for high-altitude locations"
    ],
    summary: "The Instant Pot Duo is a kitchen workhorse that makes healthy meal prep incredibly fast. Ideal for busy families and professionals alike, it replaces seven appliances and cooks under high pressure to lock in nutrients and flavors in a fraction of the time.",
    reviewScreenshots: [
      {
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60",
        reviewer: "Priya M.",
        rating: 5,
        date: "May 20, 2026",
        comment: "This has completely changed how I cook. I can throw in beans, spices, and veggies, set it for 30 minutes, and walk away. Perfectly cooked lentils every time without monitoring a stove.",
        verified: true,
      }
    ],
    seo: {
      title: "Instant Pot Duo 7-in-1 Review: Worth It for Families? | Good Products Hub",
      description: "Should you buy the Instant Pot Duo 6-Quart? We analyze cook times, ease of cleaning, and multi-cooker safety benchmarks.",
    },
    categorySlug: "home-kitchen",
    categoryName: "Home & Kitchen",
    isTrending: false,
    isNewArrival: true,
    isApproved: true,
  },
  {
    _id: "prod-3",
    title: "Apple Watch Series 10 (GPS, 46mm) - Smart Watch",
    slug: "apple-watch-series-10",
    images: [
      {
        url: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=600&auto=format&fit=crop",
        alt: "Apple Watch Series 10 on wrist showing workout metrics screen"
      }
    ],
    rating: 4.6,
    price: 46900,
    affiliateLink: "https://amazon.in/dp/B0DGJ9BTRH?tag=goodproductshub-21",
    marketplace: "Amazon",
    features: [
      "Thinnest design ever with a larger, more advanced Wide-Angle OLED display",
      "Vital health insights: sleep apnea notifications, ECG, heart rate, and temperature sensing",
      "Advanced workout metrics, training load, and depth/water temp sensors",
      "Fastest charging ever (80% battery in about 30 minutes)",
      "Seamless integration with Apple ecosystem and cellular capabilities"
    ],
    pros: [
      "Stunning, bright screen with wide viewing angles",
      "Superb sleep tracking and wellness metric dashboards",
      "Incredibly fast charging makes daily wear much easier",
      "Premium materials and premium software animations"
    ],
    cons: [
      "18-hour battery life still requires daily charging",
      "Requires an iPhone to operate; no Android compatibility",
      "Incremental update if you are coming from Series 8 or 9"
    ],
    summary: "The Apple Watch Series 10 offers the most refined smartwatch experience on the market. With its thinner chassis, wider viewing display, faster charging speeds, and clinical sleep apnea warnings, it is a premium fitness companion for active lifestyles.",
    reviewScreenshots: [
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
        reviewer: "Karthik R.",
        rating: 4,
        date: "May 28, 2026",
        comment: "The screen is amazing, much easier to read text at a glance while running. The sleep apnea tracking is a great health additions. I just wish the battery lasted 3 days like Garmin.",
        verified: true,
      }
    ],
    seo: {
      title: "Apple Watch Series 10 review: Fitness & sleep tracker | Good Products Hub",
      description: "Detailed review of Apple Watch Series 10. Learn about sleep apnea notifications, wide-angle OLED, charging speed, and workout tests.",
    },
    categorySlug: "tech-gadgets",
    categoryName: "Tech & Gadgets",
    isTrending: true,
    isNewArrival: false,
    isApproved: true,
  },
  {
    _id: "prod-4",
    title: "Logitech MX Master 3S Wireless Ergonomic Mouse",
    slug: "logitech-mx-master-3s-mouse",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
        alt: "Logitech MX Master 3S wireless mouse black on desk"
      }
    ],
    rating: 4.8,
    price: 9499,
    affiliateLink: "https://amazon.in/dp/B0B11LJ69K?tag=goodproductshub-21",
    marketplace: "Amazon",
    features: [
      "Quiet Click buttons deliver tactile feel with 90% less click noise",
      "MagSpeed Electromagnetic scroll wheel for scroll speeds up to 1000 lines per second",
      "8,000 DPI optical sensor tracks virtually anywhere—even on glass",
      "Ergonomic hand-sculpted silhouette designed for comfortable wrist posture",
      "App-specific customizations and seamless Flow control across multiple computers"
    ],
    pros: [
      "Extremely quiet clicks are perfect for shared office settings",
      "MagSpeed scroll wheel is addictively fast and precise",
      "Long-lasting battery (up to 70 days on a full charge via USB-C)",
      "Highly customizable buttons speed up navigation and programming macros"
    ],
    cons: [
      "Exclusively right-handed design; no left-handed version available",
      "Larger size may not feel comfortable for users with small hands",
      "Premium price point compared to standard bluetooth mice"
    ],
    summary: "The Logitech MX Master 3S is the ultimate productivity tool for developers, designers, and office power users. Ergonomically sculpted to support your hand, it features virtually silent clicks, high-DPI tracking, and an electromagnetic scroll wheel that speeds up workflows.",
    reviewScreenshots: [
      {
        url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60",
        reviewer: "Sameer A.",
        rating: 5,
        date: "April 11, 2026",
        comment: "This mouse is a developer's dream. The horizontal scroll is perfect for wide code sheets, and the fast scroll wheel makes reading logs effortless. Worth every single rupee.",
        verified: true,
      }
    ],
    seo: {
      title: "Logitech MX Master 3S Review: The Ultimate Mouse? | Good Products Hub",
      description: "Read our comprehensive review of the Logitech MX Master 3S. Explore quiet clicks, MagSpeed scrolling, and ergonomic design benchmarks.",
    },
    categorySlug: "tech-gadgets",
    categoryName: "Tech & Gadgets",
    isTrending: true,
    isNewArrival: false,
    isApproved: true,
  }
];

export const mockBlogs: Blog[] = [
  {
    _id: "blog-1",
    title: "Best Wireless Headphones for Coding and Focus in 2026",
    slug: "best-wireless-headphones-coding",
    cover: {
      url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop",
      alt: "Over-ear wireless headphones macro shot showing leather cups"
    },
    excerpt: "Lock in deep programming focus. We compare the top noise-cancelling headphones on comfort, battery, ANC, and soundstage for developers.",
    categorySlug: "tech-gadgets",
    categoryName: "Tech & Gadgets",
    seo: {
      title: "Top Wireless Noise-Cancelling Headphones for Coding in 2026",
      description: "Discover the best headphones for programmers and creators. Detailed review of Sony WH-1000XM5, Bose, and Apple Watch integrations for study focus.",
    },
    relatedProducts: ["sony-wh-1000xm5-headphones", "logitech-mx-master-3s-mouse"],
    author: "Dhamodhar K.",
    date: "July 2, 2026",
    readTime: "6 min read",
    content: `When you're writing code, debugging a complex production issue, or drafting a technical plan, distractions are the enemy. A single ambient interruption can derail your thought flow, costing you 20 to 30 minutes of re-contextualization time. That is why a high-quality pair of active noise-cancelling (ANC) headphones is not just an audio accessory; it is a critical productivity investment.

In this guide, we dive into what makes a pair of headphones perfect for long coding sessions and outline our top picks for 2026, focusing on battery longevity, comfort, and noise suppression.

## The Deep Focus Checklist: What Developers Need

Before buying any headphones, programmers should evaluate three key metrics:
1. **Active Noise Cancellation (ANC):** The ability to filter out low-frequency hums (like air conditioners, PC fans, or coffee shop chatter) is paramount.
2. **All-Day Comfort:** A headband that squeezes too tight or cups that trap heat will make it impossible to wear them for more than an hour. Look for memory foam cushions and lightweight builds (under 260g).
3. **Multi-Point Bluetooth:** You want to be connected to your laptop (for video calls and music) and your smartphone simultaneously without manual toggling.

---

### Our Top Pick: Sony WH-1000XM5

The **Sony WH-1000XM5** stands at the absolute peak of our rankings. During our extensive testing, the dual processors and 8 microphones isolated mechanical keyboard clicks and office ambient talking better than any competitor. 

For developers, the comfort is unmatched. Weighing in at just 250g, the soft-fit leather headband spreads tension evenly. Additionally, its 30-hour battery life guarantees you can get through a full week of work without scrambling for a charger.

---

## Secondary Companion: Ergonomic Workspace Optimization

While isolating audio is half the battle, your physical desktop input tools represent the other half. When designing a distraction-free station, pairing your headphones with a highly comfortable ergonomic mouse like the **Logitech MX Master 3S** completes the setup. 

The MX Master 3S operates almost completely silently with its 90% quieter clicks, ensuring that even if you take your headphones off, your environment remains quiet and focused.

## Frequently Asked Questions

Let's address the most common questions about focus headphones.`,
    faqs: [
      {
        question: "Is active noise cancellation safe for my ears?",
        answer: "Yes, ANC is completely safe. It uses destructive interference to cancel soundwaves by emitting an out-of-phase wave. It does not damage your hearing; in fact, it protects your ears by allowing you to listen to music at lower, safer volumes in loud environments."
      },
      {
        question: "How long should I wear headphones in one session?",
        answer: "It is recommended to follow the 60/60 rule: listen at no more than 60% volume for no more than 60 minutes at a time, then take a short break to let your ears breathe and prevent physical fatigue."
      }
    ],
    isApproved: true,
  },
  {
    _id: "blog-2",
    title: "A Complete Guide to Setting Up Your Smart Kitchen on a Budget",
    slug: "smart-kitchen-guide-budget",
    cover: {
      url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop",
      alt: "Clean modern kitchen counter featuring vegetables and ingredients"
    },
    excerpt: "Save time and eat healthier. How smart appliances like electric multi-cookers can streamline cooking for busy professionals.",
    categorySlug: "home-kitchen",
    categoryName: "Home & Kitchen",
    seo: {
      title: "Smart Kitchen Setup Guide on a Budget: Best Appliances | Good Products Hub",
      description: "How to streamline your cooking with smart appliances. We review budget-friendly options, featuring the Instant Pot Duo 7-in-1 electric cooker.",
    },
    relatedProducts: ["instant-pot-duo-cooker"],
    author: "Pooja V.",
    date: "June 28, 2026",
    readTime: "5 min read",
    content: `Setting up a kitchen that is efficient, modern, and budget-friendly is a major challenge for young professionals and families. We all want to cook healthy, fresh food, but after a busy day at work, the energy to stand over a hot stove for an hour is hard to find.

Smart kitchen appliances solve this problem not by connecting to the internet (which is often unnecessary), but by automating temperature control, timing, and pressure. Here is how you can transform your kitchen into a smart hub on a budget.

## The Multi-Cooker Revolution

If you only buy one smart appliance for your kitchen, it should be an electric multi-cooker. Rather than purchasing a separate pressure cooker, slow cooker, rice cooker, and yogurt maker, a modern multi-cooker combines all of them into a single, compact unit.

The **Instant Pot Duo 7-in-1** represents the best value in this category. With built-in microprocessor controls that monitor pressure, temperature, and time, it cooks food up to 70% faster than traditional stovetops. You can sauté onions directly in the pot before switching to pressure cook mode, minimizing the number of dishes you need to wash.

---

## 3 Steps to a Smart Kitchen Setup

1. **Invest in Multi-Functional Tools:** Prioritize appliances that replace three or more individual items (e.g., air-fryer ovens, multi-cookers).
2. **Focus on Meal Prep Automation:** Choose devices with programmable start delays and automatic 'Keep Warm' functions so dinner is ready exactly when you finish work.
3. **Organize for Accessibility:** Keep your primary smart cooker on the counter; if you pack it away in a low cupboard, you won't use it.

## Frequently Asked Questions`,
    faqs: [
      {
        question: "Is electric pressure cooking safe?",
        answer: "Modern electric pressure cookers like the Instant Pot are incredibly safe. They feature 10+ redundant safety mechanisms, including automatic temperature regulation, lid locking, and pressure relief valves. They are far safer than old-style stovetop pressure cookers."
      },
      {
        question: "Can I make rice in a multi-cooker?",
        answer: "Yes, multi-cookers make exceptional rice. They monitor the moisture level and automatically switch to 'Keep Warm' once the water is fully absorbed, preventing burning or mushiness."
      }
    ],
    isApproved: true,
  }
];

// ==========================================
// SANITY CMS FIELDS AND QUERIES DEFINITIONS
// ==========================================

const CATEGORY_FIELDS = /* groq */ `
  _id,
  "name": coalesce(name, "Untitled category"),
  "slug": slug.current,
  "description": coalesce(description, ""),
  "icon": coalesce(icon, "BookOpen")
`;

const PRODUCT_FIELDS = /* groq */ `
  _id,
  "title": coalesce(title, "Untitled product"),
  "slug": slug.current,
  "images": coalesce(images[]{
    "url": coalesce(asset->url, url),
    "alt": coalesce(alt, "")
  }, []),
  "rating": coalesce(rating, 0),
  "price": coalesce(price, 0),
  "affiliateLink": coalesce(affiliateLink, ""),
  "marketplace": "Buy Now",
  "features": coalesce(features, []),
  "pros": coalesce(pros, []),
  "cons": coalesce(cons, []),
  "summary": coalesce(summary, ""),
  "reviewScreenshots": coalesce(reviewScreenshots[]{
    _type,
    url,
    reviewer,
    rating,
    date,
    comment,
    verified,
    caption,
    "image": {
      "url": coalesce(image.asset.asset->url, image.url),
      "alt": coalesce(image.alt, "")
    }
  }, []),
  "seo": coalesce(seo, {}),
  "categorySlug": category->slug.current,
  "categoryName": category->name,
  "isTrending": coalesce(isTrending, false),
  "isNewArrival": coalesce(isNewArrival, false),
  isApproved
`;

const BLOG_FIELDS = /* groq */ `
  _id,
  "title": coalesce(title, "Untitled guide"),
  "slug": slug.current,
  "cover": {
    "url": coalesce(coverImage.asset->url, coverImage.url, ""),
    "alt": coalesce(coverImage.alt, "")
  },
  "excerpt": coalesce(excerpt, ""),
  "content": coalesce(content, ""),
  "categorySlug": category->slug.current,
  "categoryName": category->name,
  "seo": coalesce(seo, {}),
  "relatedProducts": coalesce(relatedProducts[]->slug.current, []),
  "contentBlocks": coalesce(contentBlocks[]{
    _type,
    text,
    level,
    title,
    description,
    "product": product->{
      _id,
      "title": coalesce(title, "Untitled product"),
      "slug": slug.current,
      "images": coalesce(images[]{
        "url": coalesce(asset->url, url),
        "alt": coalesce(alt, "")
      }, []),
      "rating": coalesce(rating, 0),
      "price": coalesce(price, 0),
      "affiliateLink": coalesce(affiliateLink, ""),
      "marketplace": coalesce(marketplace, "Marketplace"),
      "features": coalesce(features, []),
      "pros": coalesce(pros, []),
      "cons": coalesce(cons, []),
      "summary": coalesce(summary, ""),
      "reviewScreenshots": coalesce(reviewScreenshots, []),
      "seo": coalesce(seo, {}),
      "categorySlug": category->slug.current,
      "categoryName": category->name,
      "isTrending": coalesce(isTrending, false),
      "isNewArrival": coalesce(isNewArrival, false),
      isApproved
    }
  }, []),
  "author": coalesce(author, "Good Products Hub"),
  "date": coalesce(date, ""),
  "readTime": coalesce(readTime, ""),
  "faqs": coalesce(faqs, []),
  isApproved
`;

const CATEGORIES_QUERY = defineQuery(`*[_type == "category" && defined(slug.current)] | order(name asc){
  ${CATEGORY_FIELDS}
}`);

const RELATED_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && slug.current in $slugs && isApproved == true]{
  ${PRODUCT_FIELDS}
}`);

const SEARCH_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product" &&
  isApproved == true &&
  defined(slug.current) &&
  (
    title match $search ||
    summary match $search ||
    features[] match $search
  )
] | order(isTrending desc, _updatedAt desc){
  ${PRODUCT_FIELDS}
}`);

const SEARCH_BLOGS_QUERY = defineQuery(`*[
  _type == "blog" &&
  isApproved == true &&
  defined(slug.current) &&
  (
    title match $search ||
    excerpt match $search ||
    excerpt match $search ||
    content match $search
  )
] | order(_updatedAt desc){
  ${BLOG_FIELDS}
}`);

// ==========================================
// EXPORTED DATA FETCHING CLIENT FUNCTIONS
// ==========================================

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await sanityClient.fetch<Category[]>(CATEGORIES_QUERY);
    if (data && data.length > 0) return data;
    console.warn("Sanity category query returned empty, falling back to mock data.");
    return mockCategories;
  } catch (error) {
    console.error("Failed to fetch categories from Sanity, using mock data:", error);
    return mockCategories;
  }
}

export async function getProducts(
  categorySlug?: string, 
  trendingOnly = false, 
  newArrivalOnly = false,
  isPreview = false
): Promise<Product[]> {
  try {
    const approvalFilter = isPreview ? "" : "&& isApproved == true";
    let filter = `*[_type == "product" && defined(slug.current) ${approvalFilter}`;
    if (categorySlug) {
      filter += ` && category->slug.current == $categorySlug`;
    }
    if (trendingOnly) {
      filter += ` && isTrending == true`;
    }
    if (newArrivalOnly) {
      filter += ` && isNewArrival == true`;
    }
    filter += `] | order(isTrending desc, _updatedAt desc){ ${PRODUCT_FIELDS} }`;

    return await sanityClient.fetch<Product[]>(filter, { categorySlug });
  } catch (error) {
    console.error("Failed to fetch products from Sanity, using mock data:", error);
  }
  
  // Offline / Fallback filtering
  let fallback = [...mockProducts];
  if (categorySlug) {
    fallback = fallback.filter((p) => p.categorySlug === categorySlug);
  }
  if (trendingOnly) {
    fallback = fallback.filter((p) => p.isTrending);
  }
  if (newArrivalOnly) {
    fallback = fallback.filter((p) => p.isNewArrival);
  }
  return fallback;
}

export async function getProductBySlug(slug: string, isPreview = false): Promise<Product | null> {
  try {
    const approvalFilter = isPreview ? "" : "&& isApproved == true";
    const query = `*[_type == "product" && slug.current == $slug ${approvalFilter}][0]{ ${PRODUCT_FIELDS} }`;
    const data = await sanityClient.fetch<Product | null>(query, { slug });
    if (data) return data;
  } catch (error) {
    console.error(`Failed to fetch product by slug: ${slug}, using mock data:`, error);
  }
  return mockProducts.find((p) => p.slug === slug) || null;
}

export async function getBlogs(categorySlug?: string, isPreview = false): Promise<Blog[]> {
  try {
    const approvalFilter = isPreview ? "" : "&& isApproved == true";
    let filter = `*[_type == "blog" && defined(slug.current) ${approvalFilter}`;
    if (categorySlug) {
      filter += ` && category->slug.current == $categorySlug`;
    }
    filter += `] | order(_updatedAt desc){ ${BLOG_FIELDS} }`;

    const data = await sanityClient.fetch<Blog[]>(filter, { categorySlug });
    return data;
  } catch (error) {
    console.error("Failed to fetch blogs from Sanity, using mock data:", error);
  }
  
  let fallback = [...mockBlogs];
  if (categorySlug) {
    fallback = fallback.filter((b) => b.categorySlug === categorySlug);
  }
  return fallback;
}

export async function getBlogBySlug(slug: string, isPreview = false): Promise<Blog | null> {
  try {
    const approvalFilter = isPreview ? "" : "&& isApproved == true";
    const query = `*[_type == "blog" && slug.current == $slug ${approvalFilter}][0]{ ${BLOG_FIELDS} }`;
    const data = await sanityClient.fetch<Blog | null>(query, { slug });
    if (data) return data;
  } catch (error) {
    console.error(`Failed to fetch blog by slug: ${slug}, using mock data:`, error);
  }
  return mockBlogs.find((b) => b.slug === slug) || null;
}

export async function getRelatedProducts(productSlugs: string[]): Promise<Product[]> {
  if (productSlugs.length === 0) return [];

  try {
    return await sanityClient.fetch<Product[]>(RELATED_PRODUCTS_QUERY, { slugs: productSlugs });
  } catch (error) {
    console.error("Failed to fetch related products, using mock:", error);
  }
  return mockProducts.filter((p) => productSlugs.includes(p.slug));
}

export async function searchStore(searchTerm: string): Promise<{ products: Product[]; blogs: Blog[] }> {
  const query = searchTerm.trim().toLowerCase();
  const search = `*${query}*`;

  try {
    const [pData, bData] = await Promise.all([
      sanityClient.fetch<Product[]>(SEARCH_PRODUCTS_QUERY, { search }),
      sanityClient.fetch<Blog[]>(SEARCH_BLOGS_QUERY, { search })
    ]);
    
    return {
      products: pData,
      blogs: bData,
    };
  } catch (error) {
    console.error("Failed to search Sanity database, returning local results:", error);
    const filteredProducts = mockProducts.filter(
      (p) => p.title.toLowerCase().includes(query) || p.summary.toLowerCase().includes(query) || p.features.some(f => f.toLowerCase().includes(query))
    );
    const filteredBlogs = mockBlogs.filter(
      (b) => b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query) || b.content.toLowerCase().includes(query)
    );
    return { products: filteredProducts, blogs: filteredBlogs };
  }
}
