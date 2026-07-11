"use client";

import React, { useEffect } from "react";

interface AdContainerProps {
  type?: "banner" | "rectangle" | "vertical" | "inline";
  className?: string;
}

export default function AdContainer({ type = "banner", className = "" }: AdContainerProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense unit initialization failed:", err);
    }
  }, []);

  let sizeClasses = "";
  let adFormat = "auto";

  switch (type) {
    case "banner":
      sizeClasses = "w-full min-h-[90px] md:min-h-[120px] max-h-[140px]";
      adFormat = "horizontal";
      break;
    case "rectangle":
      sizeClasses = "w-full max-w-[336px] min-h-[280px] aspect-[1.2] mx-auto";
      adFormat = "rectangle";
      break;
    case "vertical":
      sizeClasses = "w-[160px] min-h-[600px] h-full hidden lg:flex";
      adFormat = "vertical";
      break;
    case "inline":
      sizeClasses = "w-full min-h-[80px]";
      adFormat = "horizontal";
      break;
  }

  return (
    <div className={`w-full overflow-hidden flex items-center justify-center relative ${sizeClasses} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client="ca-pub-6019707348267112"
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
