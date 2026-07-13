"use client";

import React from "react";
import { Share2 } from "lucide-react";

export default function ShareButton() {
  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-2 bg-[#2E3B26] hover:bg-[#3f5235] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors self-start sm:self-auto"
    >
      <Share2 size={14} /> Copy Link
    </button>
  );
}
