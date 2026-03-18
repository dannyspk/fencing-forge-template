"use client";

import { useState } from "react";

export const GoogleReviewBadge = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <div className="relative bg-white border border-border shadow-lg rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[210px]">
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss review badge"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-border text-xs text-muted-foreground flex items-center justify-center hover:text-foreground"
        >
          ✕
        </button>
        <div className="w-8 h-8 rounded-full bg-[#4285F4]/10 flex items-center justify-center text-[#4285F4] font-bold text-sm">
          G
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground leading-none">4.7</p>
          <div className="flex items-center gap-0.5 mt-1 text-[#f4b400] text-sm">
            {"★★★★★".split("").map((star, idx) => (
              <span key={idx}>{star}</span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Google Reviews</p>
        </div>
      </div>
    </div>
  );
};
