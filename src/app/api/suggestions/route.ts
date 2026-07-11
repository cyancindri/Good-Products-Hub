import { NextResponse } from "next/server";
import { searchStore } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    if (!q.trim() || q.trim().length < 2) {
      return NextResponse.json({ products: [], blogs: [] });
    }

    const results = await searchStore(q);
    
    return NextResponse.json({
      products: (results.products || []).slice(0, 5),
      blogs: (results.blogs || []).slice(0, 3),
    });
  } catch (error) {
    console.error("Suggestions API failed:", error);
    return NextResponse.json({ products: [], blogs: [] }); // Fail gracefully to avoid breaking frontend UI
  }
}
