import React from "react";
import {
  Laptop,
  Coffee,
  Dumbbell,
  BookOpen,
  Headphones,
  Smartphone,
  Tv,
  Watch,
  Gamepad,
  Speaker,
  Camera,
  Mouse,
  ShoppingBag,
  Tag,
  Utensils,
  Activity,
  Heart,
  Sparkles,
  Grid,
  Home,
  Flame,
  ChefHat,
  Bike,
} from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export default function DynamicIcon({ name, className }: DynamicIconProps) {
  const iconName = name ? name.toLowerCase().trim() : "";

  switch (iconName) {
    case "laptop":
    case "tech-gadgets":
      return <Laptop className={className} />;
    case "coffee":
    case "home-kitchen":
      return <Coffee className={className} />;
    case "dumbbell":
    case "fitness-wellness":
      return <Dumbbell className={className} />;
    case "bookopen":
    case "book-open":
    case "books-reading":
      return <BookOpen className={className} />;
    case "headphones":
    case "earbuds-accessories":
    case "headphones-earbuds-accessories":
      return <Headphones className={className} />;
    case "smartphone":
      return <Smartphone className={className} />;
    case "tv":
      return <Tv className={className} />;
    case "watch":
      return <Watch className={className} />;
    case "gamepad":
      return <Gamepad className={className} />;
    case "speaker":
      return <Speaker className={className} />;
    case "camera":
      return <Camera className={className} />;
    case "mouse":
      return <Mouse className={className} />;
    case "shoppingbag":
    case "shopping-bag":
      return <ShoppingBag className={className} />;
    case "tag":
      return <Tag className={className} />;
    case "utensils":
      return <Utensils className={className} />;
    case "activity":
      return <Activity className={className} />;
    case "heart":
      return <Heart className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "grid":
    case "all":
      return <Grid className={className} />;
    case "home":
      return <Home className={className} />;
    case "flame":
      return <Flame className={className} />;
    case "chefhat":
    case "chef-hat":
      return <ChefHat className={className} />;
    case "bicycle":
    case "bike":
      return <Bike className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}
