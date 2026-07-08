const { createClient } = require("@sanity/client");
require("dotenv").config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dlqibmo9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("Error: SANITY_API_TOKEN environment variable is missing inside .env.local.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-07",
  useCdn: false, // write requires false
  token,
});

// Mock Categories
const categories = [
  {
    _id: "cat-1",
    _type: "category",
    name: "Tech & Gadgets",
    slug: { _type: "slug", current: "tech-gadgets" },
    description: "Sleek noise-cancelling headphones, smartwatches, keyboards, and modern workstations.",
    icon: "Laptop",
  },
  {
    _id: "cat-2",
    _type: "category",
    name: "Home & Kitchen",
    slug: { _type: "slug", current: "home-kitchen" },
    description: "High-performance air fryers, automated cookers, espresso machines, and home decor.",
    icon: "Coffee",
  },
  {
    _id: "cat-3",
    _type: "category",
    name: "Fitness & Wellness",
    slug: { _type: "slug", current: "fitness-wellness" },
    description: "Durable water bottles, yoga accessories, fitness trackers, and workout gear.",
    icon: "Dumbbell",
  },
  {
    _id: "cat-4",
    _type: "category",
    name: "Books & Smart Reading",
    slug: { _type: "slug", current: "books-reading" },
    description: "E-readers, journals, productivity planners, and best-selling books.",
    icon: "BookOpen",
  },
];

// Mock Products
const products = [
  {
    _id: "prod-1",
    _type: "product",
    title: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    slug: { _type: "slug", current: "sony-wh-1000xm5-headphones" },
    category: {
      _type: "reference",
      _ref: "cat-1"
    },
    images: [
      {
        _key: "img-1",
        _type: "customImage",
        url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
        alt: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones in black color, side profile"
      },
      {
        _key: "img-2",
        _type: "customImage",
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
        _key: "rev-1",
        reviewer: "Aditi S.",
        rating: 5,
        date: "May 14, 2026",
        comment: "Absolutely amazing! I wear them for 6+ hours at my programming desk and my ears don't hurt at all. The ANC deletes my fan and street noise completely. Def worth the money.",
        verified: true,
      },
      {
        _key: "rev-2",
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
    isTrending: true,
    isNewArrival: false,
    isApproved: true,
  },
  {
    _id: "prod-2",
    _type: "product",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker (6 Quart)",
    slug: { _type: "slug", current: "instant-pot-duo-cooker" },
    category: {
      _type: "reference",
      _ref: "cat-2"
    },
    images: [
      {
        _key: "img-1",
        _type: "customImage",
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
        _key: "rev-1",
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
    isTrending: false,
    isNewArrival: true,
    isApproved: true,
  },
  {
    _id: "prod-3",
    _type: "product",
    title: "Apple Watch Series 10 (GPS, 46mm) - Smart Watch",
    slug: { _type: "slug", current: "apple-watch-series-10" },
    category: {
      _type: "reference",
      _ref: "cat-1"
    },
    images: [
      {
        _key: "img-1",
        _type: "customImage",
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
        _key: "rev-1",
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
    isTrending: true,
    isNewArrival: false,
    isApproved: true,
  },
  {
    _id: "prod-4",
    _type: "product",
    title: "Logitech MX Master 3S Wireless Ergonomic Mouse",
    slug: { _type: "slug", current: "logitech-mx-master-3s-mouse" },
    category: {
      _type: "reference",
      _ref: "cat-1"
    },
    images: [
      {
        _key: "img-1",
        _type: "customImage",
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
        _key: "rev-1",
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
    isTrending: true,
    isNewArrival: false,
    isApproved: true,
  }
];

// Mock Blogs
const blogs = [
  {
    _id: "blog-1",
    _type: "blog",
    title: "Best Wireless Headphones for Coding and Focus in 2026",
    slug: { _type: "slug", current: "best-wireless-headphones-coding" },
    category: {
      _type: "reference",
      _ref: "cat-1"
    },
    coverImage: {
      _type: "object",
      url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop",
      alt: "Over-ear wireless headphones macro shot showing leather cups"
    },
    excerpt: "Lock in deep programming focus. We compare the top noise-cancelling headphones on comfort, battery, ANC, and soundstage for developers.",
    seo: {
      title: "Top Wireless Noise-Cancelling Headphones for Coding in 2026",
      description: "Discover the best headphones for programmers and creators. Detailed review of Sony WH-1000XM5, Bose, and Apple Watch integrations for study focus.",
    },
    relatedProducts: [
      {
        _key: "rel-1",
        _type: "reference",
        _ref: "prod-1",
      },
      {
        _key: "rel-2",
        _type: "reference",
        _ref: "prod-4",
      },
    ],
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
        _key: "faq-1",
        question: "Is active noise cancellation safe for my ears?",
        answer: "Yes, ANC is completely safe. It uses destructive interference to cancel soundwaves by emitting an out-of-phase wave. It does not damage your hearing; in fact, it protects your ears by allowing you to listen to music at lower, safer volumes in loud environments."
      },
      {
        _key: "faq-2",
        question: "How long should I wear headphones in one session?",
        answer: "It is recommended to follow the 60/60 rule: listen at no more than 60% volume for no more than 60 minutes at a time, then take a short break to let your ears breathe and prevent physical fatigue."
      }
    ],
    isApproved: true,
  },
  {
    _id: "blog-2",
    _type: "blog",
    title: "A Complete Guide to Setting Up Your Smart Kitchen on a Budget",
    slug: { _type: "slug", current: "smart-kitchen-guide-budget" },
    category: {
      _type: "reference",
      _ref: "cat-2"
    },
    coverImage: {
      _type: "object",
      url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop",
      alt: "Clean modern kitchen counter featuring vegetables and ingredients"
    },
    excerpt: "Save time and eat healthier. How smart appliances like electric multi-cookers can streamline cooking for busy professionals.",
    seo: {
      title: "Smart Kitchen Setup Guide on a Budget: Best Appliances | Good Products Hub",
      description: "How to streamline your cooking with smart appliances. We review budget-friendly options, featuring the Instant Pot Duo 7-in-1 electric cooker.",
    },
    relatedProducts: [
      {
        _key: "rel-1",
        _type: "reference",
        _ref: "prod-2",
      },
    ],
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
        _key: "faq-1",
        question: "Is electric pressure cooking safe?",
        answer: "Modern electric pressure cookers like the Instant Pot are incredibly safe. They feature 10+ redundant safety mechanisms, including automatic temperature regulation, lid locking, and pressure relief valves. They are far safer than old-style stovetop pressure cookers."
      },
      {
        _key: "faq-2",
        question: "Can I make rice in a multi-cooker?",
        answer: "Yes, multi-cookers make exceptional rice. They monitor the moisture level and automatically switch to 'Keep Warm' once the water is fully absorbed, preventing burning or mushiness."
      }
    ],
    isApproved: true,
  }
];

async function seed() {
  console.log("Starting Sanity database seeding script...");

  try {
    // 1. Create Categories
    console.log(`Seeding ${categories.length} categories...`);
    for (const cat of categories) {
      await client.createOrReplace(cat);
      console.log(`✓ Seeding category: ${cat.name}`);
    }

    // 2. Create Products
    console.log(`Seeding ${products.length} products...`);
    for (const prod of products) {
      await client.createOrReplace(prod);
      console.log(`✓ Seeding product: ${prod.title}`);
    }

    // 3. Create Blogs
    console.log(`Seeding ${blogs.length} blogs...`);
    for (const blog of blogs) {
      await client.createOrReplace(blog);
      console.log(`✓ Seeding blog: ${blog.title}`);
    }

    console.log("\nDatabase seeded successfully in Sanity!");
  } catch (error) {
    console.error("Error seeding Sanity dataset:", error);
    process.exit(1);
  }
}

seed();
