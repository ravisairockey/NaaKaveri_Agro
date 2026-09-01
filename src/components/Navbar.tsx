import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Sprout, MessageCircle, Languages } from "lucide-react";
import SearchBox from "./SearchBox";
import { STORE, waLink } from "../config";
import { useLang, type DictKey } from "../lib/i18n";

const links = [
  { to: "/", key: "navHome" as DictKey },
  { to: "/products", key: "navProducts" as DictKey },
  { to: "/crops", key: "navByCrop" as DictKey },
  { to: "/problems", key: "navByProblem" as DictKey },
  { to: "/brands", key: "navBrands" as DictKey },
  { to: "/knowledge", key: "navKnowledge" as DictKey },
  { to: "/about", key: "navAbout" as DictKey },
  { to: "/contact", key: "navVisitStore" as DictKey },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggle, t, pick } = useLang();

  return (
    <header className="sticky top-0 z-40">
      {/* top strip */}
      <div className="bg-deep text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-[11px] font-semibold sm:text-xs">
          <p className="truncate">📍 {pick(STORE.addressShort, t("addressShortTe"))}</p>
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
                {t("brandName")}
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal/55">
                {t("brandTagline")}
              </span>
            </span>
          </Link>

          <div className="mx-auto hidden w-full max-w-md lg:block">
            <SearchBox />
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button
              onClick={toggle}
              aria-label={lang === "en" ? "Switch to Telugu" : "Switch to English"}
              title={lang === "en" ? "తెలుగులో చూడండి" : "View in English"}
              className="flex h-10 items-center gap-1.5 rounded-xl border-2 border-brand-yellow bg-white px-3 text-xs font-extrabold text-deep transition hover:bg-brand-yellow/15"
            >
              <Languages size={15} />
              {t("language")}
            </button>
            <a
              href={waLink(`Hello ${STORE.name}, I would like to know about your products.`)}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-extrabold text-white transition hover:brightness-95 sm:flex"
            >
              <MessageCircle size={15} /> {t("whatsappUs")}
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
              {t(l.key)}
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
                    {t(l.key)}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={toggle}
                  aria-label={lang === "en" ? "Switch to Telugu" : "Switch to English"}
                  className="col-span-2 flex items-center justify-center gap-2 rounded-xl border-2 border-brand-yellow bg-white py-3 text-sm font-extrabold text-deep transition hover:bg-brand-yellow/15"
                >
                  <Languages size={16} />
                  {lang === "en" ? "🌐 తెలుగులో చూడండి" : "🌐 View in English"}
                </button>
                <a href={`tel:${STORE.phoneTel}`} className="flex items-center justify-center gap-2 rounded-xl bg-charcoal py-3 text-sm font-bold text-white">
                  <Phone size={15} /> {t("call")}
                </a>
                <a href={waLink(`Hello ${STORE.name}, I would like to know about your products.`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white">
                  <MessageCircle size={15} /> {t("whatsapp")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
