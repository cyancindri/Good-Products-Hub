import React from "react";
import Studio from "./Studio";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Good Products Hub | Admin Content Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  return <Studio />;
}
