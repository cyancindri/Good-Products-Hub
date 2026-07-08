import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export default function Rating({ rating, size = 16, className = "" }: RatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4 && rating % 1 < 0.8;
  const roundedRating = Math.round(rating);
  
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex text-brand-gold">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} size={size} className="fill-brand-gold stroke-brand-gold" />;
          } else if (i === fullStars && hasHalf) {
            return <StarHalf key={i} size={size} className="fill-brand-gold stroke-brand-gold" />;
          } else {
            return <Star key={i} size={size} className="stroke-neutral-300" />;
          }
        })}
      </div>
      <span className="text-xs font-semibold text-neutral-600 font-sans ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
