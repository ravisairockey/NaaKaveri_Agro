import { Link } from "react-router-dom";
import { MessageCircle, ShoppingCart } from "lucide-react";
import type { Product } from "../data/catalog";
import { brandName, categoryName, cropEmoji, cropName, productBuyUrl } from "../data/catalog";
import { productEnquiryLink } from "../config";

export default function ProductCard({ product }: { product: Product }) {
  // Buy link for this product ("" = no buy link → name goes to details page
  // and the 🛒 Buy Online button is hidden).
  const buyUrl = productBuyUrl(product);
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(11,93,42,0.25)]">
      <Link to={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-mint/60">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-yellow px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-charcoal">
            ★ Featured
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-deep backdrop-blur">
          {categoryName(product.category)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{brandName(product.brand)}</p>
        {/* Product name — with a buy link set, clicking the name opens the
            shop/buy page in a new tab; otherwise it opens the details page. */}
        {buyUrl ? (
          <a
            href={buyUrl}
            target="_blank"
            rel="noreferrer"
            title={`Buy ${product.name}`}
            className="mt-1 font-display text-[15px] font-semibold leading-snug text-charcoal underline-offset-2 hover:text-deep hover:underline"
          >
            {product.name}
          </a>
        ) : (
          <Link to={`/products/${product.slug}`} className="mt-1 font-display text-[15px] font-semibold leading-snug text-charcoal hover:text-deep">
            {product.name}
          </Link>
        )}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-charcoal/60">{product.overview}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.crops.slice(0, 3).map((c) => (
            <span key={c} className="rounded-full bg-mint px-2 py-0.5 text-[11px] font-semibold text-deep">
              {cropEmoji(c)} {cropName(c)}
            </span>
          ))}
        </div>

        {product.packSizes.length > 0 && (
          <p className="mt-2 text-[11px] font-medium text-charcoal/50">
            Packs: {product.packSizes.join(" · ")}
          </p>
        )}

        <div className="mt-4 flex gap-2 pt-1">
          <Link
            to={`/products/${product.slug}`}
            className="flex-1 rounded-xl bg-deep px-3 py-2.5 text-center text-xs font-bold text-white transition hover:bg-primary"
          >
            View Details
          </Link>
          {buyUrl && (
            <a
              href={buyUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Buy ${product.name} online`}
              className="flex items-center justify-center rounded-xl bg-brand-yellow px-3 text-charcoal transition hover:bg-warm-yellow"
            >
              <ShoppingCart size={16} strokeWidth={2.4} />
            </a>
          )}
          <a
            href={productEnquiryLink(product.name)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="flex items-center justify-center rounded-xl border-2 border-[#25D366]/30 bg-[#25D366]/10 px-3 text-[#128C4B] transition hover:bg-[#25D366] hover:text-white"
          >
            <MessageCircle size={16} strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </div>
  );
}
