import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Sprout, Package, Tag } from "lucide-react";
import {
  products, crops, categories, brands,
  brandName, categoryName,
} from "../data/catalog";

interface Suggestion {
  type: "product" | "crop" | "category" | "brand";
  label: string;
  sub: string;
  to: string;
}

export default function SearchBox({
  autoFocus = false,
  onNavigate,
  placeholder = "Search products, crops, brands…",
}: {
  autoFocus?: boolean;
  onNavigate?: () => void;
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const suggestions = useMemo<Suggestion[]>(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    const out: Suggestion[] = [];

    crops
      .filter((c) => c.name.toLowerCase().includes(term))
      .forEach((c) =>
        out.push({ type: "crop", label: `${c.emoji} ${c.name}`, sub: "Shop by crop", to: `/crops/${c.slug}` })
      );

    categories
      .filter((c) => c.name.toLowerCase().includes(term))
      .forEach((c) =>
        out.push({ type: "category", label: `${c.emoji} ${c.name}`, sub: "Category", to: `/products?category=${c.slug}` })
      );

    brands
      .filter((b) => b.name.toLowerCase().includes(term))
      .forEach((b) =>
        out.push({ type: "brand", label: b.name, sub: "Brand", to: `/brands/${b.slug}` })
      );

    // fungus → fungicides, weed → herbicides, insect/pest → insecticides
    const aliases: Record<string, string> = {
      fungus: "fungicides", fungal: "fungicides", disease: "fungicides",
      weed: "herbicides", grass: "herbicides",
      insect: "insecticides", pest: "insecticides", worm: "insecticides",
      growth: "crop-care", nutrient: "crop-care",
    };
    Object.entries(aliases).forEach(([k, cat]) => {
      if (k.startsWith(term) || term.startsWith(k)) {
        const c = categories.find((x) => x.slug === cat)!;
        if (!out.some((s) => s.to === `/products?category=${cat}`))
          out.push({ type: "category", label: `${c.emoji} ${c.name}`, sub: "Suggested category", to: `/products?category=${cat}` });
      }
    });

    products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          brandName(p.brand).toLowerCase().includes(term) ||
          categoryName(p.category).toLowerCase().includes(term) ||
          p.crops.some((c) => c.includes(term)) ||
          p.overview.toLowerCase().includes(term)
      )
      .slice(0, 6)
      .forEach((p) =>
        out.push({ type: "product", label: p.name, sub: `${brandName(p.brand)} · ${categoryName(p.category)}`, to: `/products/${p.slug}` })
      );

    return out.slice(0, 9);
  }, [q]);

  const go = (to: string) => {
    setOpen(false);
    setQ("");
    onNavigate?.();
    navigate(to);
  };

  const icon = (t: Suggestion["type"]) =>
    t === "product" ? <Package size={15} /> : t === "crop" ? <Sprout size={15} /> : <Tag size={15} />;

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="flex items-center gap-2 rounded-full border border-charcoal/12 bg-white px-4 py-2.5 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <Search size={17} className="shrink-0 text-charcoal/40" />
        <input
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (suggestions[0]) go(suggestions[0].to);
              else if (q.trim()) go(`/products?q=${encodeURIComponent(q.trim())}`);
            }
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-charcoal/35"
        />
        {q && (
          <button onClick={() => setQ("")} className="text-charcoal/40 hover:text-charcoal" aria-label="Clear search">
            <X size={15} />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-charcoal/8 bg-white shadow-xl">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => go(s.to)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-mint"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mint text-deep">
                {icon(s.type)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-charcoal">{s.label}</span>
                <span className="block text-[11px] font-medium uppercase tracking-wide text-charcoal/45">{s.sub}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
