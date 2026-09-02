import { useState } from "react";

// Brand logo tile:
//   • Brand has a logo image  → render it (contained, fixed height, always aligned).
//   • Logo missing / broken   → fall back to a clean monogram badge.
// The site never shows a broken image, no matter what.
function initialsOf(name: string): string {
  const words = name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean);
  if (words.length === 0) return "★";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function BrandLogo({ name, logo }: { name: string; logo?: string }) {
  const [broken, setBroken] = useState(false);

  if (logo && !broken) {
    return (
      <span className="flex h-12 items-center justify-center">
        <img
          src={logo}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setBroken(true)}
          className="max-h-12 max-w-[120px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </span>
    );
  }

  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-mint to-primary/20 font-display text-lg font-black tracking-tight text-deep shadow-sm transition-transform duration-300 group-hover:scale-105">
      {initialsOf(name)}
    </span>
  );
}