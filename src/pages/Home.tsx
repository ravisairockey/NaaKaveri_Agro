import { Link } from "react-router-dom";
import {
  ArrowRight, MessageCircle, Phone, MapPin, Clock, ShieldCheck,
  Leaf, HeartHandshake, Store, BookOpen,
} from "lucide-react";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";
import { categories, crops, problems, brands, products, articles } from "../data/catalog";
import { STORE, waLink, directionsLink, asset } from "../config";
import { useLang } from "../lib/i18n";
import { categoryTe } from "../lib/i18n-dict";

const trust = [
  { icon: ShieldCheck, title: "Quality Products", text: "Genuine, sealed stock from authorised distributors only." },
  { icon: Leaf, title: "Trusted Brands", text: "Bayer, Syngenta, UPL, Rallis and more under one roof." },
  { icon: HeartHandshake, title: "Farmer-Focused Support", text: "Honest guidance in Telugu — bring your problem, we'll help." },
  { icon: Store, title: "Local Store, Real People", text: "Visit us on Anjuman Cir Rd, Dharmavaram — we're here every day." },
];

export default function Home() {
  const featured = products.filter((p) => p.featured);
  const { t, pick } = useLang();

  return (
    <div>
            {/* ── HERO (auto cross-fade carousel) ── */}
      <HeroCarousel />

      {/* ── TRUST STRIP ── */}
      <section className="border-b border-charcoal/6 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08}>
              <div className="flex gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-deep">
                  <t.icon size={21} strokeWidth={2} />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-charcoal">{t.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-charcoal/55">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">{t("productCategories")}</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
                {t("everythingCropNeeds")}
              </h2>
            </div>
            <Link to="/products" className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-deep hover:text-primary sm:flex">
              {t("viewAllProducts")} <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                to={`/products?category=${c.slug}`}
                className="group block overflow-hidden rounded-2xl border border-charcoal/8 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden bg-mint/50">
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3.5">
                  <p className="font-display text-sm font-bold text-charcoal group-hover:text-deep">
                    {c.emoji} {pick(c.name, categoryTe[c.slug] ?? c.name)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-charcoal/55">{c.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="bg-mint/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Featured Products</p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
                  Farmer favourites, in stock now
                </h2>
              </div>
              <Link to="/products" className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-deep hover:text-primary sm:flex">
                Browse catalog <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 8).map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3 text-sm font-bold text-white">
              Browse full catalog <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SHOP BY CROP ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Shop by Crop</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
            Select your crop
          </h2>
          <p className="mt-2 max-w-xl text-sm text-charcoal/60">
            See only the seeds, protection and nutrition products relevant to what you grow.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {crops.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link to={`/crops/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl">
                <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-2xl">{c.emoji}</p>
                  <p className="font-display text-base font-extrabold text-white">{c.name}</p>
                  <p className="mt-0.5 text-[11px] font-bold text-warm-yellow opacity-0 transition group-hover:opacity-100">
                    View products →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SHOP BY PROBLEM ── */}
      <section className="bg-deep py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-warm-yellow">Shop by Problem</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              What are you looking for?
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {problems.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  to={`/problems/${p.slug}`}
                  className="group block h-full rounded-2xl border border-white/12 bg-white/5 p-5 transition hover:border-warm-yellow/60 hover:bg-white/10"
                >
                  <span className="text-3xl">{p.emoji}</span>
                  <p className="mt-3 font-display text-sm font-bold leading-snug">{p.name}</p>
                  <p className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed text-white/60">{p.blurb}</p>
                  <p className="mt-3 text-[11px] font-extrabold text-warm-yellow opacity-0 transition group-hover:opacity-100">
                    Find solutions →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED BRANDS ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Trusted Agricultural Brands</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
              The brands farmers trust, under one roof
            </h2>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((b, i) => (
            <Reveal key={b.slug} delay={(i % 6) * 0.04}>
              <Link
                to={`/brands/${b.slug}`}
                className="group flex h-full flex-col items-center justify-center rounded-2xl border border-charcoal/8 bg-white px-4 py-6 text-center transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="font-display text-base font-extrabold tracking-tight text-charcoal/80 group-hover:text-deep">
                  {b.name}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal/40">
                  View products
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT / LOCAL TRUST ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img src={asset("/images/hero/store.jpg")} alt="Sri Narayana Seeds & Pesticides store" className="w-full rounded-3xl object-cover shadow-xl" />
              <div className="absolute -bottom-5 left-5 rounded-2xl bg-brand-yellow px-5 py-3 shadow-lg">
                <p className="font-display text-sm font-extrabold text-charcoal">📍 Anjuman Cir Rd, Dharmavaram</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Why Sri Narayana</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
              {t("storeTrust")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/65 sm:text-base">
              Sri Narayana Seeds & Pesticides serves the farming families of Dharmavaram and
              surrounding villages with genuine agricultural inputs and honest, practical advice.
              We stock quality seed, crop protection and nutrition products from authorised
              distributors — and we take the time to explain every label in Telugu.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Genuine, sealed products with proper bills",
                "Season-wise guidance for paddy, groundnut, chilli & more",
                "Small pack sizes available for small farmers",
                "Bring a sample of your problem — we'll help identify it",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm font-semibold text-charcoal/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-[11px] text-deep">✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/about" className="mt-7 inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3 text-sm font-bold text-white transition hover:bg-primary">
              {t("aboutStore")} <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── KNOWLEDGE ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">From Sri Narayana</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
                Agriculture knowledge for better decisions
              </h2>
            </div>
            <Link to="/knowledge" className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-deep hover:text-primary sm:flex">
              All guides <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.07}>
              <Link to={`/knowledge/${a.slug}`} className="group block overflow-hidden rounded-2xl border border-charcoal/8 bg-white transition hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-mint px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-deep">
                    <BookOpen size={11} className="mr-1 inline" /> {a.kind}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold leading-snug text-charcoal group-hover:text-deep">{a.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-charcoal/55">{a.excerpt}</p>
                  <p className="mt-3 text-[11px] font-bold text-charcoal/40">{a.minutes} min read</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── STORE / VISIT ── */}
      <section className="bg-mint/60 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Visit Us</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
              Visit Sri Narayana
            </h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-deep" />
                <span className="font-semibold text-charcoal/80">{STORE.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-deep" />
                <a href={`tel:${STORE.phoneTel}`} className="font-semibold text-charcoal/80 hover:text-deep">{STORE.phoneDisplay}</a>
              </li>
              {STORE.hours.map((h) => (
                <li key={h.day} className="flex gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-deep" />
                  <span className="font-semibold text-charcoal/80">{h.day}: {h.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={directionsLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3 text-sm font-bold text-white transition hover:bg-primary">
                <MapPin size={15} /> Get Directions
              </a>
              <a href={waLink(`Hello ${STORE.name}, I want to visit your store. Please share the location.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:brightness-95">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-3">
            <div className="h-full min-h-[300px] overflow-hidden rounded-3xl border border-charcoal/8 shadow-md">
              <iframe
                title="Store location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(STORE.mapsQuery)}&output=embed`}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden bg-charcoal py-16 sm:py-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-yellow/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              Looking for the right agricultural product?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              Explore our products, or simply message us your crop and problem — our team will
              suggest the right label-approved solution.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-extrabold text-charcoal transition hover:bg-warm-yellow">
                Explore Products <ArrowRight size={16} />
              </Link>
              <a href={waLink(`Hello ${STORE.name}, I need help choosing a product for my crop.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-extrabold text-white transition hover:brightness-95">
                <MessageCircle size={16} /> Talk to Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
