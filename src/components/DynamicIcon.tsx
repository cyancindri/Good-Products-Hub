"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export default function DynamicIcon({ name, className }: DynamicIconProps) {
  const iconName = name ? name.toLowerCase().trim() : "";

  // 1. Check custom overrides / slug maps first
  switch (iconName) {
    case "tech-gadgets":
      return <LucideIcons.Laptop className={className} />;
    case "home-kitchen":
      return <LucideIcons.Coffee className={className} />;
    case "fitness-wellness":
      return <LucideIcons.Dumbbell className={className} />;
    case "books-reading":
      return <LucideIcons.BookOpen className={className} />;
    case "earbuds-accessories":
    case "headphones-earbuds-accessories":
      return <LucideIcons.Headphones className={className} />;
    case "shopping-bag":
      return <LucideIcons.ShoppingBag className={className} />;
    case "all":
      return <LucideIcons.Grid className={className} />;
    case "trending":
    case "trending-up":
      return <LucideIcons.TrendingUp className={className} />;
    case "chef-hat":
      return <LucideIcons.ChefHat className={className} />;
  }

  // 2. Dynamic lookup from lucide-react package case-insensitively
  const cleanName = iconName.replace(/[^a-z0-9]/g, "");
  const targetKey = Object.keys(LucideIcons).find(
    (key) => key.toLowerCase() === cleanName
  );

  if (targetKey) {
    const IconComponent = LucideIcons[targetKey as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
    return <IconComponent className={className} />;
  }

  // 3. Fallback to BookOpen
  return <LucideIcons.BookOpen className={className} />;
}
