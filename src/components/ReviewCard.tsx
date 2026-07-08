"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Star, ThumbsUp } from "lucide-react";

interface ReviewCardProps {
  reviewer: string;
  rating: number;
  date: string;
  comment: string;
  avatarUrl?: string;
  verified?: boolean;
}

export default function ReviewCard({
  reviewer,
  rating,
  date,
  comment,
  avatarUrl,
  verified = true,
}: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(10);
  const [hasClicked, setHasClicked] = useState(false);

  React.useEffect(() => {
    setHelpfulCount(Math.floor(Math.random() * 15) + 3);
  }, []);

  const handleHelpfulClick = () => {
    if (!hasClicked) {
      setHelpfulCount(helpfulCount + 1);
      setHasClicked(true);
    } else {
      setHelpfulCount(helpfulCount - 1);
      setHasClicked(false);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-4 text-xs shadow-sm">
      <div className="flex items-start justify-between gap-3">
        {/* User details & Name */}
        <div className="flex flex-col">
          <span className="font-semibold text-neutral-800">{reviewer}</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            {/* Stars */}
            <div className="flex text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={i < rating ? "fill-brand-gold stroke-brand-gold" : "stroke-neutral-300"}
                />
              ))}
            </div>
            <span className="text-[10px] text-neutral-400">&bull; {date}</span>
          </div>
        </div>

        {/* Verified Purchase Tag */}
        {verified && (
          <span className="flex items-center gap-0.5 rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-extrabold text-blue-600 border border-blue-200/50">
            <Check className="w-2.5 h-2.5 text-blue-500 font-bold" />
            Verified Buyer
          </span>
        )}
      </div>

      {/* Review Comment */}
      <p className="mt-3 text-neutral-600 leading-relaxed italic">
        &ldquo;{comment}&rdquo;
      </p>

      {/* Helpful button */}
      <div className="mt-4 flex items-center justify-between border-t border-neutral-50 pt-3">
        <span className="text-[10px] text-neutral-400 font-medium">
          {helpfulCount} people found this helpful
        </span>
        <button
          onClick={handleHelpfulClick}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold transition-all ${
            hasClicked
              ? "bg-brand-green text-white border-brand-green"
              : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
          }`}
        >
          <ThumbsUp className="w-3 h-3" />
          <span>Helpful</span>
        </button>
      </div>
    </div>
  );
}
