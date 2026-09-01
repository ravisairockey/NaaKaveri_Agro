import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageCircle, Phone, ChevronRight, CheckCircle2, ShieldAlert,
  BookOpenText, Package, ShoppingCart,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import {
  products, brandName, categoryName, cropName, cropEmoji, problemName, productBuyUrl,
} from "../data/catalog";
import { STORE, productEnquiryLink } from "../config";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  if (!product) return <NotFound />;

  // Buy link for this product ("" = hide buy button; name is not clickable).
  const buyUrl = productBuyUrl(product);

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.crops.some((c) => product.crops.includes(c)))
    )
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      {/* breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-1 text-xs font-semibold text-charcoal/50">
        <Link to="/" className="hover:text-deep">Home</Link>
        <ChevronRight size={13} />
        <Link to="/products" className="hover:text-deep">Products</Link>
        <ChevronRight size={13} />
        <Link to={`/products?category=${product.category}`} className="hover:text-deep">
          {categoryName(product.category)}
        </Link>
        <ChevronRight size={13} />
        <span className="text-charcoal/80">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-charcoal/8 bg-white">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
            {product.featured && (
              <span className="absolute left-4 top-4 rounded-full bg-brand-yellow px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-charcoal">
                ★ Featured Product
              </span>
            )}
          </div>
          <p className="mt-3 text-center text-[11px] font-medium text-charcoal/40">
            Representative image — actual pack design may vary by batch.
          </p>
        </motion.div>

        {/* info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
            {brandName(product.brand)} · {categoryName(product.category)}
          </p>
          {/* Product name — with a buy link set, clicking the name opens the
              shop/buy page in a new tab. */}
          {buyUrl ? (
            <a
              href={buyUrl}
              target="_blank"
              rel="noreferrer"
              title={`Buy ${product.name}`}
              className="mt-2 block w-fit font-display text-3xl font-extrabold tracking-tight text-charcoal underline-offset-4 hover:text-deep hover:underline sm:text-4xl"
            >
              {product.name}
            </a>
          ) : (
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
              {product.name}
            </h1>
          )}
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70 sm:text-base">{product.overview}</p>

          {/* crops */}
          <div className="mt-6">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal/45">Suitable for</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.crops.map((c) => (
                <Link
                  key={c}
                  to={`/crops/${c}`}
                  className="rounded-full bg-mint px-3.5 py-1.5 text-sm font-bold text-deep transition hover:bg-deep hover:text-white"
                >
                  {cropEmoji(c)} {cropName(c)}
                </Link>
              ))}
            </div>
          </div>

          {/* problems */}
          <div className="mt-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal/45">Helps with</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.problems.map((p) => (
                <Link
                  key={p}
                  to={`/problems/${p}`}
                  className="rounded-full border border-charcoal/12 bg-white px-3.5 py-1.5 text-sm font-bold text-charcoal/70 transition hover:border-primary hover:text-deep"
                >
                  {problemName(p)}
                </Link>
              ))}
            </div>
          </div>

          {/* pack sizes */}
          <div className="mt-6">
            <h3 className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-charcoal/45">
              <Package size={13} /> Pack sizes
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.packSizes.map((s) => (
                <span key={s} className="rounded-xl border-2 border-charcoal/10 bg-white px-4 py-2 text-sm font-extrabold text-charcoal">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 space-y-3">
            {buyUrl && (
              <a
                href={buyUrl}
                target="_blank" rel="noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-yellow py-4 font-display text-base font-extrabold text-charcoal transition hover:bg-warm-yellow"
              >
                <ShoppingCart size={20} /> Buy Online
              </a>
            )}
            <a
              href={productEnquiryLink(product.name)}
              target="_blank" rel="noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] py-4 font-display text-base font-extrabold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] transition hover:brightness-95"
            >
              <MessageCircle size={20} /> Enquire About This Product
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${STORE.phoneTel}`} className="flex items-center justify-center gap-2 rounded-2xl bg-charcoal py-3.5 text-sm font-extrabold text-white transition hover:bg-deep">
                <Phone size={16} /> Call Store
              </a>
              <Link to="/contact" className="flex items-center justify-center gap-2 rounded-2xl border-2 border-charcoal/12 bg-white py-3.5 text-sm font-extrabold text-charcoal transition hover:border-deep hover:text-deep">
                Visit Store
              </Link>
            </div>
            <p className="text-center text-[11px] font-medium text-charcoal/45">
              We confirm availability & current pack sizes on WhatsApp — no online payment needed.
            </p>
          </div>
        </motion.div>
      </div>

      {/* details */}
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-1">
          <div className="h-full rounded-2xl border border-charcoal/8 bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-charcoal">
              <CheckCircle2 size={19} className="text-primary" /> Key Features
            </h2>
            <ul className="mt-4 space-y-3">
              {product.features.map((f, i) => (
                <li key={f} className="flex items-start gap-3 text-sm font-semibold text-charcoal/75">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-mint font-display text-[11px] font-extrabold text-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-1">
          <div className="h-full rounded-2xl border border-charcoal/8 bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-charcoal">
              <BookOpenText size={19} className="text-primary" /> Application / Usage
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70">{product.usage}</p>
            <p className="mt-4 rounded-xl bg-mint p-4 text-xs font-semibold leading-relaxed text-deep">
              📋 Exact dosage, target pests/diseases and crop stages are printed on the
              manufacturer's label. Our team will gladly walk you through the label in Telugu at
              the store or on WhatsApp.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="lg:col-span-1">
          <div className="h-full rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-amber-900">
              <ShieldAlert size={19} /> Safety Information
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-amber-900/80">{product.safety}</p>
          </div>
        </Reveal>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-16">
          <Reveal>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-charcoal sm:text-2xl">
              You may also need
            </h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
