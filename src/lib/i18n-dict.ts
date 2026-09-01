// ─────────────────────────────────────────────────────────────
// TELUGU / ENGLISH DICTIONARY
// Each entry is [English, తెలుగు]. Add new UI strings here and
// use t("key") / pick(en, te) from useLang() in any component.
// ─────────────────────────────────────────────────────────────

export type Lang = "en" | "te";

export const dict = {
  // Brand
  brandName: ["SRI NARAYANA", "శ్రీ నారాయణ"],
  brandTagline: ["Seeds & Pesticides", "సీడ్స్ & పెస్టిసైడ్స్"],
  addressShortTe: ["Anjuman Cir Rd, Dharmavaram", "అంజుమాన్ సర్కిల్ రోడ్, ధర్మవరం"],

  // Navigation
  navHome: ["Home", "హోమ్"],
  navProducts: ["Products", "ఉత్పత్తులు"],
  navByCrop: ["Shop by Crop", "పంట వారీగా"],
  navByProblem: ["Shop by Problem", "సమస్య వారీగా"],
  navBrands: ["Brands", "బ్రాండ్లు"],
  navKnowledge: ["Knowledge", "వ్యవసాయ సమాచారం"],
  navAbout: ["About", "మా గురించి"],
  navVisitStore: ["Visit Store", "మా షాప్"],
  language: ["తెలుగు", "English"],

  // Common actions
  whatsappUs: ["WhatsApp Us", "వాట్సాప్ చేయండి"],
  whatsapp: ["WhatsApp", "వాట్సాప్"],
  call: ["Call", "కాల్"],
  callStore: ["Call Store", "కాల్ చేయండి"],
  exploreProducts: ["Explore Products", "ఉత్పత్తులు చూడండి"],
  viewAllProducts: ["View all products", "అన్ని ఉత్పత్తులు చూడండి"],

  // Home hero
  heroBadge: ["Dharmavaram's Trusted Agri Store", "ధర్మవరం నమ్మకమైన వ్యవసాయ షాప్"],
  heroLine1: ["GROW BETTER.", "మెరుగుగా పండించండి."],
  heroLine2a: ["GROW WITH", "విశ్వాసంతో"],
  heroLine2b: ["CONFIDENCE.", "పండించండి."],
  heroSubPre: [
    "Quality seeds, crop protection and agricultural solutions from ",
    "నాణ్యమైన విత్తనాలు, పంట రక్షణ మరియు వ్యవసాయ పరిష్కారాలు — ",
  ],
  heroSubPost: [
    " — helping the farmers of Dharmavaram grow healthier, more profitable crops.",
    " ధర్మవరం రైతులు ఆరోగ్యకరమైన, లాభసాటి పంటలు పండించేందుకు పక్కనే ఉంది.",
  ],
  productCategories: ["Product Categories", "ఉత్పత్తి విభాగాలు"],
  everythingCropNeeds: ["Everything your crop needs", "మీ పంటకు కావాల్సినవన్నీ"],
  storeTrust: ["A store built on farmer trust", "రైతు నమ్మకంతో ఏర్పడిన షాప్"],
  aboutStore: ["About the store", "షాప్ గురించి"],

  // Footer
  footerAbout: [
    "Your trusted agricultural partner in Dharmavaram — quality seeds, crop protection and honest guidance for every farmer.",
    "ధర్మవరంలో మీ నమ్మకస్థుడైన వ్యవసాయ భాగస్వామి — ప్రతి రైతుకు నాణ్యమైన విత్తనాలు, పంట రక్షణ మరియు నిజాయితీ సలహా.",
  ],
  footerVisitHeading: ["Visit the Store", "మా షాప్‌కు రండి"],
  talkWhatsApp: ["Talk to Us on WhatsApp", "వాట్సాప్‌లో మాట్లాడండి"],
  getDirections: ["Get Directions →", "దారి చూపించండి →"],
  rights: ["All rights reserved.", "అన్ని హక్కులు రిజర్వ్ చేయబడినవి."],
  labelDisclaimer: [
    "Product information is provided by manufacturers. Always read the label before use.",
    "ఉత్పత్తి సమాచారం తయారీదారుల నుండి. వాడే ముందు ఎప్పుడూ లేబుల్ చదవండి.",
  ],
  hoursDayMonSat: ["Monday – Saturday", "సోమవారం – శనివారం"],
  hoursDaySun: ["Sunday", "ఆదివారం"],
  hoursTime1: ["8:00 AM – 8:30 PM", "ఉదయం 8:00 – రాత్రి 8:30"],
  hoursTime2: ["8:00 AM – 1:00 PM", "ఉదయం 8:00 – మధ్యాహ్నం 1:00"],
} as const;

export type DictKey = keyof typeof dict;

export function translate(key: DictKey, lang: Lang): string {
  const entry = dict[key];
  if (!entry) return key;
  return lang === "te" ? entry[1] : entry[0];
}

/** Telugu names for product categories (fallback = English name from catalog). */
export const categoryTe: Record<string, string> = {
  seeds: "విత్తనాలు",
  insecticides: "పురుగు మందులు",
  fungicides: "శిలీంధ్ర నాశకాలు",
  herbicides: "కలుపు సంహారకాలు",
  "crop-care": "పంట సంరక్షణ",
  "seed-treatment": "విత్తన చికిత్స",
};

/** Telugu working-hour labels keyed by their exact English strings in config.ts. */
export const hoursTe: Record<string, string> = {
  "Monday – Saturday": "సోమవారం – శనివారం",
  Sunday: "ఆదివారం",
  "8:00 AM – 8:30 PM": "ఉదయం 8:00 – రాత్రి 8:30",
  "8:00 AM – 1:00 PM": "ఉదయం 8:00 – మధ్యాహ్నం 1:00",
};
