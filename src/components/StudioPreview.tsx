import React from "react";

export function StudioPreview({ document }: { document: any }) {
  const { displayed } = document;
  
  if (!displayed || !displayed.slug || !displayed.slug.current) {
    return (
      <div className="flex flex-col items-center justify-center p-12 h-full text-neutral-500 font-sans">
        <p className="text-sm font-semibold">Please enter a title and slug to see the live preview.</p>
      </div>
    );
  }

  const slug = displayed.slug.current;
  const type = displayed._type; // 'product' or 'blog'
  
  // Construct the live preview URL pointing to Next.js routes
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
  const path = type === "product" ? `/product/${slug}` : `/blog/${slug}`;
  const previewUrl = `${baseUrl}${path}?preview=true`;

  return (
    <div className="w-full h-full flex flex-col min-h-[500px]" style={{ height: "100%" }}>
      <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-2 flex items-center justify-between text-xs text-neutral-500 font-mono select-none">
        <span>Preview URL: {path}?preview=true</span>
        <button 
          onClick={() => window.open(previewUrl, "_blank")}
          className="text-emerald-600 hover:text-emerald-700 font-semibold font-sans transition-colors cursor-pointer"
        >
          Open in New Tab &rarr;
        </button>
      </div>
      <div className="flex-1 w-full h-full relative bg-neutral-100" style={{ minHeight: "600px" }}>
        <iframe
          src={previewUrl}
          className="w-full h-full absolute inset-0 border-none bg-white"
          title="Live Site Preview"
        />
      </div>
    </div>
  );
}
