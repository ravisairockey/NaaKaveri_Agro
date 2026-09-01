import { Link } from "react-router-dom";
import { Sprout, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { STORE, waLink, directionsLink } from "../config";
import { categories, crops } from "../data/catalog";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-deep text-warm-yellow">
              <Sprout size={22} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-extrabold text-white">SRI NARAYANA</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">Seeds & Pesticides</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Your trusted agricultural partner in Dharmavaram — quality seeds, crop protection and
            honest guidance for every farmer.
          </p>
          <a
            href={waLink(`Hello ${STORE.name}, I would like to know about your products.`)}
            target="_blank" rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-extrabold text-white transition hover:brightness-95"
          >
            <MessageCircle size={15} /> Talk to Us on WhatsApp
          </a>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-warm-yellow">Products</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/products?category=${c.slug}`} className="transition hover:text-warm-yellow">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-warm-yellow">Shop by Crop</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {crops.map((c) => (
              <li key={c.slug}>
                <Link to={`/crops/${c.slug}`} className="transition hover:text-warm-yellow">
                  {c.emoji} {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-warm-yellow">Visit the Store</h4>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-warm-yellow" />
              <span>{STORE.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-warm-yellow" />
              <a href={`tel:${STORE.phoneTel}`} className="hover:text-warm-yellow">{STORE.phoneDisplay}</a>
            </li>
            {STORE.hours.map((h) => (
              <li key={h.day} className="flex gap-2.5">
                <Clock size={16} className="mt-0.5 shrink-0 text-warm-yellow" />
                <span>{h.day}: {h.time}</span>
              </li>
            ))}
          </ul>
          <a
            href={directionsLink} target="_blank" rel="noreferrer"
            className="mt-4 inline-block rounded-full border border-white/25 px-5 py-2 text-xs font-bold text-white transition hover:border-warm-yellow hover:text-warm-yellow"
          >
            Get Directions →
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {STORE.name}, Dharmavaram. All rights reserved.</p>
          <p className="text-center">
            Product information is provided by manufacturers. Always read the label before use.
          </p>
          <Link to="/admin" className="hover:text-warm-yellow">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
