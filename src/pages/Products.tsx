import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import SearchBox from "../components/SearchBox";
import {
  products, categories, crops, brands, problems,
  brandName, categoryName,
} from "../data/catalog";

type SortKey = "featured" | "newest" | "name";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [drawer, setDrawer] = useState(false);

  const category = params.get("category") ?? "";
  const crop = params.get("crop") ?? "";
  const brand = params.get("brand") ?? "";
  const problem = params.get("problem") ?? "";
  const q = params.get("q") ?? "";
  const sort = (params.get("sort") as SortKey) ?? "featured";

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams({}, { replace: true });
  const activeCount = [category, crop, brand, problem, q].filter(Boolean).length;

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (crop && !p.crops.includes(crop)) return false;
      if (brand && p.brand !== brand) return false;
      if (problem && !p.problems.includes(problem)) return false;
      if (q) {
        const term = q.toLowerCase();
        const hay = `${p.name} ${brandName(p.brand)} ${categoryName(p.category)} ${p.overview} ${p.crops.join(" ")}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "newest") list = [...list].sort((a, b) => b.id - a.id);
    else list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [category, crop, brand, problem, q, sort]);

  const FilterGroup = ({
    title, items, current, onSelect,
  }: {
    title: string;
    items: { slug: string; name: string }[];
    current: string;
    onSelect: (v: string) => void;
  }) => (
    <div>
      <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-charcoal/50">{title}</h4>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {items.map((it) => {
          const active = current === it.slug;
          return (
            <button
              key={it.slug}
              onClick={() => onSelect(active ? "" : it.slug)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                active
                  ? "bg-deep text-white"
                  : "border border-charcoal/12 bg-white text-charcoal/70 hover:border-primary/50 hover:text-deep"
              }`}
            >
              {it.name}
            </button>
          );
        })}
      </div>
    </div>
  );

  const filtersUI = (
    <div className="space-y-6">
      <FilterGroup title="Categories" items={categories} current={category} onSelect={(v) => setParam("category", v)} />
      <FilterGroup title="Crops" items={crops.map((c) => ({ slug: c.slug, name: `${c.emoji} ${c.name}` }))} current={crop} onSelect={(v) => setParam("crop", v)} />
      <FilterGroup title="Problem / Use" items={problems.map((p) => ({ slug: p.slug, name: `${p.emoji} ${p.name}` }))} current={problem} onSelect={(v) => setParam("problem", v)} />
      <FilterGroup title="Brands" items={brands} current={brand} onSelect={(v) => setParam("brand", v)} />
      {activeCount > 0 && (
        <button onClick={clearAll} className="w-full rounded-xl border border-charcoal/15 py-2.5 text-xs font-extrabold text-charcoal/60 transition hover:border-red-300 hover:text-red-600">
          Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      {/* header */}
      <div className="max-w-2xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Product Catalog</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">Products</h1>
        <p className="mt-3 text-sm text-charcoal/60">
          Browse our full range — or search by product, crop, brand or problem. Enquire on
          WhatsApp to check availability.
        </p>
        <div className="mt-5">
          <SearchBox placeholder="Search products… (try 'chilli' or 'fungus')" />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-36 rounded-2xl border border-charcoal/8 bg-white p-5">
            {filtersUI}
          </div>
        </aside>

        <div>
          {/* toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-charcoal/60">
              {filtered.length} product{filtered.length !== 1 && "s"}
              {q && <> for “<span className="text-deep">{q}</span>”</>}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDrawer(true)}
                className="flex items-center gap-2 rounded-full border border-charcoal/12 bg-white px-4 py-2 text-xs font-extrabold text-charcoal lg:hidden"
              >
                <SlidersHorizontal size={14} /> Filters{activeCount > 0 && ` (${activeCount})`}
              </button>
              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value)}
                className="rounded-full border border-charcoal/12 bg-white px-4 py-2 text-xs font-extrabold text-charcoal outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="name">Sort: Name A–Z</option>
              </select>
            </div>
          </div>

          {/* active filter chips */}
          {activeCount > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {category && <Chip label={categoryName(category)} onClear={() => setParam("category", "")} />}
              {crop && <Chip label={crops.find((c) => c.slug === crop)?.name ?? crop} onClear={() => setParam("crop", "")} />}
              {brand && <Chip label={brandName(brand)} onClear={() => setParam("brand", "")} />}
              {problem && <Chip label={problems.find((p) => p.slug === problem)?.name ?? problem} onClear={() => setParam("problem", "")} />}
              {q && <Chip label={`"${q}"`} onClear={() => setParam("q", "")} />}
            </div>
          )}

          {/* grid */}
          {filtered.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-charcoal/20 bg-white p-12 text-center">
              <p className="text-4xl">🌾</p>
              <h3 className="mt-3 font-display text-lg font-bold text-charcoal">No products match</h3>
              <p className="mt-2 text-sm text-charcoal/55">
                Try removing a filter — or message us on WhatsApp, we may have it in store.
              </p>
              <button onClick={clearAll} className="mt-5 rounded-full bg-deep px-6 py-2.5 text-sm font-bold text-white">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* mobile filter drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal/50 lg:hidden"
              onClick={() => setDrawer(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm overflow-y-auto bg-cream p-5 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-extrabold text-charcoal">Filters</h3>
                <button onClick={() => setDrawer(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/12 bg-white" aria-label="Close filters">
                  <X size={17} />
                </button>
              </div>
              <div className="mt-5">{filtersUI}</div>
              <button onClick={() => setDrawer(false)} className="mt-6 w-full rounded-xl bg-deep py-3.5 text-sm font-extrabold text-white">
                Show {filtered.length} products
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-deep">
      {label}
      <button onClick={onClear} aria-label={`Remove ${label} filter`} className="hover:text-red-600">
        <X size={12} />
      </button>
    </span>
  );
}
