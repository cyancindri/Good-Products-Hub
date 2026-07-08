import React from "react";
import { NavbarProps } from "sanity";

export function MyStudioNavbar(props: NavbarProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Branded Header Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center p-0.5 border border-white/20 shrink-0">
            <img src="/logo.png" alt="Good Products Hub Logo" className="object-contain w-full h-full rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-black text-sm text-white tracking-tight leading-none">
              Good Products <span className="text-emerald-400">Hub</span>
            </span>
            <span className="text-[9px] text-neutral-400 font-sans tracking-wide leading-none mt-1">
              Content Management Studio
            </span>
          </div>
        </div>
        <a
          href="/"
          className="text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>Go to Live Website</span>
          <span>&rarr;</span>
        </a>
      </div>
      {/* Default Sanity Navbar */}
      <div className="w-full">
        {props.renderDefault(props)}
      </div>
    </div>
  );
}
