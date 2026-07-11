import React from "react";
import { Check, X } from "lucide-react";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProsCons({ pros = [], cons = [] }: ProsConsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Pros */}
      <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 flex flex-col">
        <h4 className="font-display font-extrabold text-emerald-800 text-base flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs border border-emerald-500/20 font-sans">
            ✓
          </span>
          Key Advantages
        </h4>
        <ul className="space-y-3 flex-1">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs text-neutral-700 leading-relaxed">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-3xl border border-rose-100 bg-rose-50/50 p-6 flex flex-col">
        <h4 className="font-display font-extrabold text-rose-800 text-base flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center text-xs border border-rose-500/20 font-sans">
            ✕
          </span>
          Considerations
        </h4>
        <ul className="space-y-3 flex-1">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs text-neutral-700 leading-relaxed">
              <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
