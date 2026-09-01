import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Sprout, MessageCircle } from "lucide-react";
import SearchBox from "./SearchBox";
import { STORE, waLink } from "../config";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/crops", label: "Shop by Crop" },
  { to: "/problems", label: "Shop by Problem" },
  { to: "/brands", label: "Brands" },
  { to: "/knowledge", label: "Knowledge" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Visit Store" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      {/* top strip */}
      <div className="bg-deep text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-[11px] font-semibold sm:text-xs">
          <p className="truncate">📍 {STORE.addressShort}</p>
          <a href={`tel:${STORE.phoneTel}`} className="flex shrink-0 items-center gap-1.5 hover:text-warm-yellow">
            <Phone size={12} /> {STORE.phoneDisplay}
          </a>
        </div>
      </div>

      {/* main bar */}
      <div className="border-b border-charcoal/8 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-deep text-warm-yellow">
              <Sprout size={22} strokeWidth={2.2} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-extrabold tracking-tight text-deep sm:text-base">
                SRI NARAYANA
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal/55">
                Seeds & Pesticides
              </span>
            </span>
          </Link>

          <div className="mx-auto hidden w-full max-w-md lg:block">
            <SearchBox />
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <a
              href={waLink(`Hello ${STORE.name}, I would like to know about your products.`)}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-extrabold text-white transition hover:brightness-95 sm:flex"
            >
              <MessageCircle size={15} /> WhatsApp Us
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-charcoal/12 bg-white text-charcoal lg:hidden"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* desktop nav */}
        <nav className="mx-auto hidden max-w-7xl items-center gap-1 px-4 pb-2 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-[13px] font-bold transition ${
                  isActive ? "bg-deep text-white" : "text-charcoal/70 hover:bg-mint hover:text-deep"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-charcoal/8 bg-cream lg:hidden"
          >
            <div className="px-4 pb-4 pt-3">
              <SearchBox onNavigate={() => setOpen(false)} />
              <nav className="mt-3 grid grid-cols-2 gap-1.5">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-bold transition ${
                        isActive ? "bg-deep text-white" : "bg-white text-charcoal/75 border border-charcoal/8"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href={`tel:${STORE.phoneTel}`} className="flex items-center justify-center gap-2 rounded-xl bg-charcoal py-3 text-sm font-bold text-white">
                  <Phone size={15} /> Call
                </a>
                <a href={waLink(`Hello ${STORE.name}, I would like to know about your products.`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white">
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
