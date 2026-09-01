import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package, Tags, Award, MessageSquare, Star, Eye, MousePointerClick,
  Phone, Lock, LayoutDashboard, TrendingUp,
} from "lucide-react";
import { products, categories, brands, brandName, categoryName } from "../data/catalog";

/**
 * ADMIN DASHBOARD (demo preview)
 * In full deployment this is protected by authentication and backed by
 * PostgreSQL — products, brands, crops and enquiries are managed here
 * without touching code.
 */

const demoEnquiries = [
  { name: "Ravi", product: "Vijaya Hot Hybrid Chilli Seeds", channel: "WhatsApp", when: "Today, 10:24 AM" },
  { name: "Kumar", product: "K-6 Groundnut Seed (Selected)", channel: "WhatsApp", when: "Today, 9:02 AM" },
  { name: "Lakshmi", product: "BlastShield SC", channel: "Call", when: "Yesterday, 5:40 PM" },
  { name: "Suresh", product: "AgriStrike 505 EC", channel: "WhatsApp", when: "Yesterday, 11:15 AM" },
  { name: "Venkatesh", product: "GrowMax Bio Stimulant", channel: "Contact form", when: "2 days ago" },
];

const demoAnalytics = [
  { label: "Product views (7 days)", value: "1,284", icon: Eye },
  { label: "WhatsApp clicks", value: "173", icon: MousePointerClick },
  { label: "Phone clicks", value: "62", icon: Phone },
  { label: "Top search", value: "“chilli”", icon: TrendingUp },
];

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");

  if (!unlocked) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-deep text-warm-yellow">
          <Lock size={28} />
        </span>
        <h1 className="mt-6 font-display text-2xl font-extrabold text-charcoal">Sri Narayana Admin</h1>
        <p className="mt-2 text-sm text-charcoal/55">
          Demo preview — enter PIN <strong className="text-deep">1234</strong> to see the admin dashboard concept.
          In production this is secured with proper authentication.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); if (pin === "1234") setUnlocked(true); }}
          className="mt-6 flex w-full gap-2"
        >
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            type="password"
            inputMode="numeric"
            placeholder="Enter PIN"
            className="w-full rounded-xl border border-charcoal/12 bg-white px-4 py-3 text-center text-sm font-bold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button className="rounded-xl bg-deep px-6 py-3 text-sm font-extrabold text-white">Enter</button>
        </form>
        {pin && pin !== "1234" && pin.length >= 4 && (
          <p className="mt-3 text-xs font-bold text-red-600">Incorrect PIN — try 1234.</p>
        )}
        <Link to="/" className="mt-8 text-xs font-bold text-charcoal/45 hover:text-deep">← Back to website</Link>
      </div>
    );
  }

  const stats = [
    { label: "Products", value: products.length, icon: Package },
    { label: "Categories", value: categories.length, icon: Tags },
    { label: "Brands", value: brands.length, icon: Award },
    { label: "Enquiries", value: demoEnquiries.length, icon: MessageSquare },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
            <LayoutDashboard size={14} /> Admin Dashboard · Demo Preview
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold text-charcoal sm:text-3xl">Sri Narayana Admin</h1>
        </div>
        <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-extrabold text-amber-800">
          ⚠️ Demo data — production version connects to the database
        </span>
      </div>

      {/* stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-charcoal/8 bg-white p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-deep">
              <s.icon size={19} />
            </span>
            <p className="mt-3 font-display text-3xl font-extrabold text-charcoal">{s.value}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal/45">{s.label}</p>
          </div>
        ))}
      </div>

      {/* analytics */}
      <h2 className="mt-10 font-display text-lg font-extrabold text-charcoal">Analytics snapshot</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {demoAnalytics.map((a) => (
          <div key={a.label} className="rounded-2xl bg-deep p-5 text-white">
            <a.icon size={18} className="text-warm-yellow" />
            <p className="mt-3 font-display text-2xl font-extrabold">{a.value}</p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/55">{a.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* enquiries */}
        <div className="rounded-2xl border border-charcoal/8 bg-white">
          <div className="border-b border-charcoal/8 px-5 py-4">
            <h2 className="font-display text-base font-extrabold text-charcoal">Recent enquiries</h2>
          </div>
          <ul className="divide-y divide-charcoal/6">
            {demoEnquiries.map((e, i) => (
              <li key={i} className="flex items-center gap-3 px-5 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint font-display text-sm font-extrabold text-deep">
                  {e.name[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-charcoal">{e.name} · <span className="font-semibold text-charcoal/60">{e.product}</span></p>
                  <p className="text-[11px] font-semibold text-charcoal/45">{e.channel} · {e.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* product management preview */}
        <div className="rounded-2xl border border-charcoal/8 bg-white">
          <div className="flex items-center justify-between border-b border-charcoal/8 px-5 py-4">
            <h2 className="font-display text-base font-extrabold text-charcoal">Manage products</h2>
            <button className="rounded-full bg-deep px-4 py-2 text-xs font-extrabold text-white">+ Add product</button>
          </div>
          <ul className="divide-y divide-charcoal/6">
            {products.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-charcoal">{p.name}</p>
                  <p className="text-[11px] font-semibold text-charcoal/45">
                    {brandName(p.brand)} · {categoryName(p.category)}
                  </p>
                </div>
                {p.featured && <Star size={15} className="shrink-0 fill-brand-yellow text-brand-yellow" />}
                <span className="rounded-full bg-mint px-2.5 py-1 text-[10px] font-extrabold text-deep">Published</span>
              </li>
            ))}
          </ul>
          <p className="border-t border-charcoal/8 px-5 py-3 text-[11px] font-semibold text-charcoal/45">
            Full version: add/edit/delete products, upload images, manage pack sizes, mark featured,
            publish/unpublish — no developer needed.
          </p>
        </div>
      </div>
    </div>
  );
}
