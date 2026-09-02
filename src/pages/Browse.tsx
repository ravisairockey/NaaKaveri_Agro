import { Link, useParams } from "react-router-dom";
import { ChevronRight, MessageCircle } from "lucide-react";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";
import BrandLogo from "../components/BrandLogo";
import { crops, problems, brands, products, categories, categoryName } from "../data/catalog";
import { STORE, waLink } from "../config";
import NotFound from "./NotFound";

// ────────────────────────── CROPS ──────────────────────────

export function CropsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <Reveal>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Shop by Crop</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
          Select your crop
        </h1>
        <p className="mt-3 max-w-xl text-sm text-charcoal/60">
          Choose your crop to see only the seeds, protection and nutrition products relevant to it.
        </p>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {crops.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05}>
            <Link to={`/crops/${c.slug}`} className="group relative block aspect-[16/10] overflow-hidden rounded-3xl">
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-xl font-extrabold text-white">{c.emoji} {c.name}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/75">{c.blurb}</p>
                <p className="mt-2 text-xs font-extrabold text-warm-yellow">
                  {products.filter((p) => p.crops.includes(c.slug)).length} products →
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function CropDetailPage() {
  const { slug } = useParams();
  const crop = crops.find((c) => c.slug === slug);
  if (!crop) return <NotFound />;

  const cropProducts = products.filter((p) => p.crops.includes(crop.slug));
  const byCategory = categories
    .map((cat) => ({ cat, items: cropProducts.filter((p) => p.category === cat.slug) }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      {/* hero */}
      <section className="relative overflow-hidden">
        <img src={crop.image} alt={crop.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 to-charcoal/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24">
          <nav className="flex items-center gap-1 text-xs font-semibold text-white/60">
            <Link to="/" className="hover:text-warm-yellow">Home</Link>
            <ChevronRight size={13} />
            <Link to="/crops" className="hover:text-warm-yellow">Crops</Link>
            <ChevronRight size={13} />
            <span className="text-white/90">{crop.name}</span>
          </nav>
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            {crop.emoji} {crop.name}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{crop.blurb}</p>
          <a
            href={waLink(`Hello ${STORE.name}, I grow ${crop.name}. Please suggest suitable products.`)}
            target="_blank" rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-extrabold text-white transition hover:brightness-95"
          >
            <MessageCircle size={16} /> Ask about {crop.name} products
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {byCategory.map(({ cat, items }, gi) => (
          <div key={cat.slug} className={gi > 0 ? "mt-14" : ""}>
            <Reveal>
              <div className="flex items-end justify-between gap-3">
                <h2 className="font-display text-xl font-extrabold tracking-tight text-charcoal sm:text-2xl">
                  {cat.emoji} {cat.name} for {crop.name}
                </h2>
                <Link to={`/products?category=${cat.slug}&crop=${crop.slug}`} className="shrink-0 text-xs font-bold text-deep hover:text-primary">
                  View all →
                </Link>
              </div>
            </Reveal>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {items.slice(0, 4).map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────── PROBLEMS ────────────────────────

export function ProblemsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <Reveal>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Shop by Problem</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
          What are you looking for?
        </h1>
        <p className="mt-3 max-w-xl text-sm text-charcoal/60">
          Tell us the problem — we'll show you the products farmers use for it.
        </p>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <Link
              to={`/problems/${p.slug}`}
              className="group block h-full rounded-3xl border border-charcoal/8 bg-white p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <span className="text-4xl">{p.emoji}</span>
              <h2 className="mt-4 font-display text-lg font-extrabold text-charcoal group-hover:text-deep">{p.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{p.blurb}</p>
              <p className="mt-4 text-xs font-extrabold text-primary">
                {products.filter((x) => x.problems.includes(p.slug)).length} products →
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function ProblemDetailPage() {
  const { slug } = useParams();
  const problem = problems.find((p) => p.slug === slug);
  if (!problem) return <NotFound />;

  const items = products.filter((p) => p.problems.includes(problem.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <nav className="flex items-center gap-1 text-xs font-semibold text-charcoal/50">
        <Link to="/" className="hover:text-deep">Home</Link>
        <ChevronRight size={13} />
        <Link to="/problems" className="hover:text-deep">Problems</Link>
        <ChevronRight size={13} />
        <span className="text-charcoal/80">{problem.name}</span>
      </nav>
      <Reveal>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
          {problem.emoji} {problem.name}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/60">{problem.blurb}</p>
        <div className="mt-5 rounded-2xl bg-mint p-4 text-xs font-semibold leading-relaxed text-deep sm:text-sm">
          💡 Not sure which product fits your situation? Send a photo of the affected crop on
          WhatsApp — correct identification saves money and the crop.
        </div>
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.05}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────── BRANDS ─────────────────────────

export function BrandsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <Reveal>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Trusted Brands</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
          Trusted agricultural brands
        </h1>
        <p className="mt-3 max-w-xl text-sm text-charcoal/60">
          We stock genuine products from India's most trusted agri-input companies, sourced only
          through authorised distributors.
        </p>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((b, i) => (
          <Reveal key={b.slug} delay={(i % 4) * 0.05}>
            <Link
              to={`/brands/${b.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-charcoal/8 bg-white p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
                            <BrandLogo name={b.name} logo={b.logo} />
              <span className="mt-3 font-display text-base font-extrabold leading-snug tracking-tight text-charcoal group-hover:text-deep">
                {b.name}
              </span>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-charcoal/55">{b.blurb}</p>
              <p className="mt-4 text-xs font-extrabold text-primary">
                {products.filter((p) => p.brand === b.slug).length > 0 ? products.filter((p) => p.brand === b.slug).length + " products →" : "Available in store →"}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function BrandDetailPage() {
  const { slug } = useParams();
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return <NotFound />;

  const items = products.filter((p) => p.brand === brand.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <nav className="flex items-center gap-1 text-xs font-semibold text-charcoal/50">
        <Link to="/" className="hover:text-deep">Home</Link>
        <ChevronRight size={13} />
        <Link to="/brands" className="hover:text-deep">Brands</Link>
        <ChevronRight size={13} />
        <span className="text-charcoal/80">{brand.name}</span>
      </nav>
      <Reveal>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
          {brand.name}
        </h1>
        <p className="mt-3 max-w-xl text-sm text-charcoal/60">{brand.blurb}</p>
      </Reveal>
      {items.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-charcoal/20 bg-white p-10 text-center">
          <p className="text-sm font-semibold text-charcoal/60">
            We stock {brand.name} products in store — categories listed online are being updated.
            Message us on WhatsApp for the current {brand.name} range.
          </p>
          <a
            href={waLink(`Hello ${STORE.name}, which ${brand.name} products do you currently stock?`)}
            target="_blank" rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-extrabold text-white"
          >
            <MessageCircle size={16} /> Ask on WhatsApp
          </a>
        </div>
      )}
      <p className="mt-10 text-[11px] text-charcoal/40">
        Brand names are the property of their respective owners and are listed here to indicate
        the range available at {STORE.name}. Category: {items[0] ? categoryName(items[0].category) : "various"} and more.
      </p>
    </div>
  );
}
