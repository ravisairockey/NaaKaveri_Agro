import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { STORE, waLink, asset } from "../config";
import { useLang } from "../lib/i18n";

// ─────────────────────────────────────────────────────────────
// HERO SLIDES — auto cross-fade loop.
// To add a slide: drop the photo in public/images/ and add an
// entry here (bilingual: En + Te). No other change needed.
// ─────────────────────────────────────────────────────────────
const SLIDES = [
  {
    image: "/images/hero.jpg",
    badgeEn: "Dharmavaram's Trusted Agri Store",
    badgeTe: "ధర్మవరం నమ్మకమైన వ్యవసాయ షాప్",
    line1En: "GROW BETTER.",
    line1Te: "మెరుగుగా పండించండి.",
    line2En: "GROW WITH",
    line2Te: "విశ్వాసంతో",
    accentEn: "CONFIDENCE.",
    accentTe: "పండించండి.",
    subEn: `Quality seeds, crop protection and agricultural solutions from ${STORE.name} — helping the farmers of Dharmavaram grow healthier, more profitable crops.`,
    subTe: `నాణ్యమైన విత్తనాలు, పంట రక్షణ మరియు వ్యవసాయ పరిష్కారాలు — ${STORE.name} ధర్మవరం రైతులు ఆరోగ్యకరమైన, లాభసాటి పంటలు పండించేందుకు పక్కనే ఉంది.`,
    altEn: "Green crop field at golden hour",
    altTe: "బంగారు వెలుతురులో పచ్చని పంట పొలం",
  },
  {
    image: "/images/store.jpg",
    badgeEn: "Anjuman Cir Rd, Dharmavaram",
    badgeTe: "అంజుమాన్ సర్కిల్ రోడ్, ధర్మవరం",
    line1En: "VISIT OUR STORE.",
    line1Te: "మా షాప్‌కు రండి.",
    line2En: "REAL PEOPLE,",
    line2Te: "నిజమైన సలహా,",
    accentEn: "REAL ADVICE.",
    accentTe: "నిజమైన ప్రజలు.",
    subEn: "Genuine, sealed products with proper bills — and we take the time to explain every label in Telugu.",
    subTe: "అసలైన, సీల్ చేసిన ఉత్పత్తులు సరైన బిల్లులతో — ప్రతి లేబుల్ తెలుగులో వివరించి చెబుతాము.",
    altEn: "Sri Narayana Seeds & Pesticides store",
    altTe: "శ్రీ నారాయణ సీడ్స్ & పెస్టిసైడ్స్ షాప్",
  },
  {
    image: "/images/products/seeds.jpg",
    badgeEn: "WhatsApp Ordering",
    badgeTe: "వాట్సాప్‌లో ఆర్డర్",
    line1En: "NEED SEEDS OR",
    line1Te: "విత్తనాలు లేదా",
    line2En: "MEDICINES?",
    line2Te: "మందులు కావాలా?",
    accentEn: "JUST MESSAGE US.",
    accentTe: "మాకు మెసేజ్ చేయండి.",
    subEn: "Send your list on WhatsApp — we'll keep it packed and ready before you reach the store.",
    subTe: "మీ జాబితా వాట్సాప్‌లో పంపండి — మీరు షాప్‌కు రాకముందే ప్యాక్ చేసి సిద్ధంగా ఉంచుతాము.",
    altEn: "High-germination hybrid seeds",
    altTe: "అధిక మొక్కల విత్తనాలు",
  },
];

const SLIDE_MS = 6000;

/** Auto cross-fading hero carousel (manual dot clicks reset the 6s timer). */
export default function HeroCarousel() {
  const { pick } = useLang();
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);

  // Auto-advance; the effect re-runs on every index change, so a manual
  // dot click also resets the timer — no stuck mid-interval jumps.
  useEffect(() => {
    const timer = window.setInterval(next, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [index, next]);

  const slide = SLIDES[index];
  const badgeEmoji =
    slide.image.includes("store") ? "🏪" : slide.image.includes("products") ? "💬" : "🌱";

  return (
    <section className="relative overflow-hidden">
      {/* cross-fading image layers */}
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.image}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.06 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={asset(s.image)}
              alt={pick(s.altEn, s.altTe)}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/60 to-charcoal/20" />
      </div>

      {/* slide text */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 pb-28 sm:py-32 lg:py-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-charcoal">
              {badgeEmoji} {pick(slide.badgeEn, slide.badgeTe)}
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pick(slide.line1En, slide.line1Te)}
              <br />
              {pick(slide.line2En, slide.line2Te)}{" "}
              <span className="text-warm-yellow">{pick(slide.accentEn, slide.accentTe)}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {pick(slide.subEn, slide.subTe)}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTAs — constant across slides so they never flicker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex max-w-2xl flex-wrap gap-3"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-extrabold text-charcoal transition hover:bg-warm-yellow"
          >
            {pick("Explore Products", "ఉత్పత్తులు చూడండి")} <ArrowRight size={17} />
          </Link>
          <a
            href={waLink(`Hello ${STORE.name}, I would like to know about your products.`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-extrabold text-white backdrop-blur transition hover:border-[#25D366] hover:bg-[#25D366]"
          >
            <MessageCircle size={17} /> {pick("WhatsApp Us", "వాట్సాప్ చేయండి")}
          </a>
        </motion.div>
      </div>

      {/* dot indicators */}
      <div className="absolute bottom-6 left-4 z-10 flex gap-2 sm:left-6">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            aria-label={pick(`Slide ${i + 1}`, `స్లైడ్ ${i + 1}`)}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-10 bg-warm-yellow" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* gold stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-yellow via-warm-yellow to-brand-yellow" />
    </section>
  );
}
