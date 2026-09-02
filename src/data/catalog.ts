import { asset, DEFAULT_BUY_URL } from "../config";

// ─────────────────────────────────────────────────────────────
// PRODUCT CATALOG — in a full deployment this data lives in
// PostgreSQL and is managed from the /admin dashboard.
// ─────────────────────────────────────────────────────────────

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  image: string;
  blurb: string;
}

export interface Crop {
  slug: string;
  name: string;
  emoji: string;
  image: string;
  blurb: string;
}

export interface Problem {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
}

export interface Brand {
  slug: string;
  name: string;
  blurb: string;
  logo?: string; // optional — save a PNG to public/images/brands/<slug>.png and reference with asset()
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string; // brand slug
  category: string; // category slug
  crops: string[]; // crop slugs
  problems: string[]; // problem slugs
  packSizes: string[];
  overview: string;
  features: string[];
  usage: string;
  safety: string;
  image: string;
  featured: boolean;
  buyUrl?: string; // ← optional: shop/buy link for THIS product only (overrides DEFAULT_BUY_URL). Leave out = use DEFAULT_BUY_URL.
}

export interface Article {
  slug: string;
  title: string;
  kind: string;
  image: string;
  excerpt: string;
  minutes: number;
  body: string[];
}

// ── Categories ──────────────────────────────────────────────
export const categories: Category[] = [
  { slug: "seeds", name: "Seeds", emoji: "🌱", image: asset("/images/products/seeds.jpg"), blurb: "High-germination hybrid & selected seeds for every season." },
  { slug: "insecticides", name: "Insecticides", emoji: "🦟", image: asset("/images/products/insecticide.jpg"), blurb: "Protect crops from borers, sucking pests & caterpillars." },
  { slug: "fungicides", name: "Fungicides", emoji: "🍄", image: asset("/images/products/fungicide.jpg"), blurb: "Control blast, blight, mildew & other fungal diseases." },
  { slug: "herbicides", name: "Herbicides", emoji: "🌿", image: asset("/images/products/herbicide.jpg"), blurb: "Effective weed management for clean, healthy fields." },
  { slug: "crop-care", name: "Crop Care", emoji: "💧", image: asset("/images/products/cropcare.jpg"), blurb: "Nutrients, growth promoters & flowering support." },
  { slug: "seed-treatment", name: "Seed Treatment", emoji: "🧪", image: asset("/images/products/seedtreatment.jpg"), blurb: "Give your crop a strong, protected start." },
];

// ── Crops ───────────────────────────────────────────────────
export const crops: Crop[] = [
  { slug: "paddy", name: "Paddy", emoji: "🌾", image: "https://images.pexels.com/photos/19239403/pexels-photo-19239403.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", blurb: "Seeds, blast control, stem borer protection & weed management for rice." },
  { slug: "groundnut", name: "Groundnut", emoji: "🥜", image: "https://images.pexels.com/photos/33303306/pexels-photo-33303306.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", blurb: "Quality seed, seed treatment and disease protection for groundnut." },
  { slug: "chilli", name: "Chilli", emoji: "🌶️", image: "https://images.pexels.com/photos/13382942/pexels-photo-13382942.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", blurb: "Hybrid seed, sucking pest control and mildew management for chilli." },
  { slug: "cotton", name: "Cotton", emoji: "☁️", image: "https://images.pexels.com/photos/13924871/pexels-photo-13924871.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", blurb: "BG-II seed, bollworm & sucking pest solutions for cotton growers." },
  { slug: "maize", name: "Maize", emoji: "🌽", image: "https://images.pexels.com/photos/33981246/pexels-photo-33981246.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", blurb: "High-yield hybrids, fall armyworm control and weed solutions for maize." },
  { slug: "vegetables", name: "Vegetables", emoji: "🥕", image: "https://images.pexels.com/photos/24595911/pexels-photo-24595911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", blurb: "Vegetable seed and complete crop care for kitchen & market gardens." },
];

// ── Problems ────────────────────────────────────────────────
export const problems: Problem[] = [
  { slug: "insect-control", name: "Insect Control", emoji: "🦟", blurb: "Borers, caterpillars and chewing pests damaging your crop." },
  { slug: "sucking-pests", name: "Sucking Pests", emoji: "🪰", blurb: "Thrips, aphids, jassids and whitefly on leaves and shoots." },
  { slug: "fungal-disease", name: "Fungal Disease", emoji: "🍄", blurb: "Blast, blight, powdery mildew, rust and leaf spots." },
  { slug: "weed-control", name: "Weed Control", emoji: "🌿", blurb: "Grassy and broadleaf weeds competing with your crop." },
  { slug: "crop-growth", name: "Better Crop Growth", emoji: "🌱", blurb: "Nutrition, rooting, flowering and overall plant vigour." },
  { slug: "seed-treatment", name: "Seed Treatment", emoji: "🧪", blurb: "Protecting seed and seedlings for a healthy start." },
];

// ── Brands ──────────────────────────────────────────────────
// HOW TO ADD / REPLACE A BRAND LOGO (no coding needed):
//   1. Save the logo as a PNG here:   public/images/brands/<slug>.png
//   2. Add this line to that brand below:   logo: asset("/images/brands/<slug>.png"),
//   (No logo file? The site shows a clean monogram tile instead — nothing breaks.)
export const brands: Brand[] = [
  // ── With logos (shown first in every brand listing) ──
  { slug: "adama", name: "ADAMA", logo: asset("/images/brands/adama.png"), blurb: "Global crop protection & life-science solutions." },
  { slug: "advance-pesticides", name: "Advance Pesticides", logo: asset("/images/brands/advance-pesticides.png"), blurb: "Growth regulators, fungicides & weedicides." },
  { slug: "aimco", name: "Hindusthan Crop Science (AIMCO)", logo: asset("/images/brands/aimco.png"), blurb: "Agrochemical formulations from Aimco Pesticides Ltd." },
  { slug: "east-west-seeds", name: "East West Seeds", logo: asset("/images/brands/east-west-seeds.png"), blurb: "World-class vegetable seeds for tropical farming." },
  { slug: "fact", name: "FACT — Fertilisers & Chemicals Travancore", logo: asset("/images/brands/fact.png"), blurb: "Kerala's pioneering fertiliser PSU since 1943." },
  { slug: "iffco", name: "IFFCO", logo: asset("/images/brands/iffco.png"), blurb: "Farmer-owned cooperative — fertilisers & plant nutrition." },
  { slug: "spic", name: "SPIC", logo: asset("/images/brands/spic.png"), blurb: "Southern Petrochemical Industries Corporation Ltd." },
  // ── Monogram tiles (drop a PNG into public/images/brands/<slug>.png and add
  //    logo: asset("/images/brands/<slug>.png"), to auto-promote to the top row) ──
  { slug: "indian-potash", name: "Indian Potash Limited (IPL)", blurb: "India's leading potassic fertiliser company since 1955." },
  { slug: "indogulf", name: "Indogulf Cropsciences", blurb: "Agrochemical formulations & exports, Ahmedabad." },
  { slug: "dcs", name: "DCS — Dhana Crop Science", blurb: "Trusted crop protection for local farmers." },
  { slug: "rhyme-organics", name: "Rhyme Organics & Chemicals", blurb: "Organic inputs & crop care chemistry." },
  { slug: "kavitha", name: "Kavitha Life Sciences", blurb: "Life-science crop solutions for every season." },
  { slug: "nirmal-seeds", name: "Nirmal Seeds", blurb: "Quality vegetable & field crop seeds." },
  { slug: "sklose", name: "Sklose Crop Care Pvt. Ltd.", blurb: "Dedicated crop care formulations." },
  { slug: "sk-healthcare", name: "SK Health Care Formulations Pvt. Ltd.", blurb: "Trusted formulation partner for agri inputs." },
  { slug: "krishchem", name: "Krishchem Pvt. Ltd.", blurb: "Agro-chemistry for healthy crops." },
  { slug: "formova", name: "Formova Chemicals & Fertilizers Pvt. Ltd.", blurb: "Chemicals & fertilizers for balanced nutrition." },
  { slug: "amruth", name: "Amruth Fertilizers", blurb: "Soil nutrition the farm can rely on." },
  { slug: "random-agrovet", name: "Random Agrovet Pvt. Ltd.", blurb: "Agro-veterinary & crop input solutions." },
  { slug: "barrix", name: "Barrix Agro Sciences Pvt. Ltd.", blurb: "Eco-friendly pest management science." },
  { slug: "jaikishan", name: "Jaikishan Fertilizers", blurb: "Trusted fertiliser supplies for local farms." },
  { slug: "mangala", name: "Mangala Fertilizers", blurb: "Quality fertilizers for healthy soils." },
];

// LEGACY placeholder brands — some sample products still reference these slugs.
// Kept ONLY so product cards/details resolve the correct brand name.
// They are NOT shown in any brand listing.
export const legacyBrands: Brand[] = [
  { slug: "bayer", name: "Bayer", blurb: "Global leader in crop science & protection." },
  { slug: "syngenta", name: "Syngenta", blurb: "World-class seeds and crop protection." },
  { slug: "upl", name: "UPL", blurb: "Sustainable agricultural solutions." },
  { slug: "rallis", name: "Rallis (Tata)", blurb: "Trusted Indian crop care from the Tata group." },
  { slug: "dhanuka", name: "Dhanuka", blurb: "Transforming Indian agriculture." },
  { slug: "pi-industries", name: "PI Industries", blurb: "Innovative agri-input solutions." },
  { slug: "basf", name: "BASF", blurb: "Chemistry for sustainable farming." },
  { slug: "corteva", name: "Corteva", blurb: "Seed and crop protection science." },
  { slug: "indofil", name: "Indofil", blurb: "Crop protection chemistry since 1962." },
  { slug: "coromandel", name: "Coromandel", blurb: "Plant nutrition & crop care." },
  { slug: "kaveri-seeds", name: "Kaveri Seeds", blurb: "High-performance Indian hybrids." },
  { slug: "nuziveedu", name: "Nuziveedu Seeds", blurb: "India's leading hybrid seed company." },
  { slug: "siri-seeds", name: "Siri Seeds", blurb: "Quality for prosperity — trusted for 25+ years." },
];

// ── Products ────────────────────────────────────────────────
const IMG = {
  seeds: asset("/images/products/seeds.jpg"),
  insect: asset("/images/products/insecticide.jpg"),
  fungi: asset("/images/products/fungicide.jpg"),
  herb: asset("/images/products/herbicide.jpg"),
  care: asset("/images/products/cropcare.jpg"),
  treat: asset("/images/products/seedtreatment.jpg"),
};

const LABEL_NOTE =
  "Always read and follow the manufacturer's label before use. Application rates, timing and crop-stage guidance must follow the printed label and local agricultural department recommendations. Our store team is happy to explain the label in Telugu.";

// Where does the 🛒 "Buy Online" button / product-name click go?
//   product.buyUrl  →  if this product has its own link, use it;
//   otherwise       →  DEFAULT_BUY_URL from src/config.ts ("" = buy button hidden).
export function productBuyUrl(p: Product): string {
  return p.buyUrl ?? DEFAULT_BUY_URL;
}

// ┌──────────────────────────────────────────────────────────────────────┐
// │  HOW TO ADD A NEW PRODUCT (no coding knowledge needed)               │
// │                                                                      │
// │  1. Scroll to the LAST product in the list below.                    │
// │  2. Copy ONE whole block — from  {  down to  },  (including both).   │
// │  3. Paste it right after, then change the values:                    │
// │                                                                      │
// │    id:        any number not used yet (use the highest number + 1)   │
// │    slug:      short english name, small letters, dashes not spaces   │
// │    name:      the product name customers will see                    │
// │    brand:     must match a brand slug above (e.g. "bayer")           │
// │    category:  must match a category slug (e.g. "seeds")              │
// │    crops:     which crops it suits — slugs like "paddy", "chilli"    │
// │    packSizes: pack options shown on the card                         │
// │    overview:  1–2 line description                                   │
// │    features:  bullet points list (each in "quotes", comma between)   │
// │    image:     IMG.seeds etc. (photo from public/images/products/)    │
// │    buyUrl:    OPTIONAL — paste a link to buy THIS product.           │
// │               Leave this line out to use DEFAULT_BUY_URL instead.    │
// │                                                                      │
// │  4. Save, then publish: git add . && git commit -m "Add product"     │
// │     && git push                                                      │
// └──────────────────────────────────────────────────────────────────────┘
//
// ── COPY-FROM-HERE TEMPLATE (fill in the values, then paste it INSIDE the
//    product list — after the last product block, before the closing  ]; ) ──
// {
//   id: 99, slug: "my-new-product", name: "My New Product Name", brand: "bayer",
//   category: "seeds", crops: ["paddy"], problems: ["crop-growth"],
//   packSizes: ["1 kg", "5 kg"],
//   overview: "One or two lines describing the product.",
//   features: ["First strong point", "Second strong point", "Third strong point"],
//   usage: "How and when to use it (short, plain language).",
//   safety: LABEL_NOTE, image: IMG.seeds, featured: false,
//   buyUrl: "https://example.com/buy/my-new-product",   // ← optional
// },
// ── COPY-UPTO-HERE ─────────────────────────────────────────────────────

export const products: Product[] = [
  // ── SEEDS ──
  {
    id: 1, slug: "sn-gold-paddy-seeds", name: "SN Gold Fine Paddy Seeds", brand: "kaveri-seeds",
    category: "seeds", crops: ["paddy"], problems: ["crop-growth"],
    packSizes: ["5 kg", "10 kg", "25 kg"],
    overview: "Premium fine-grain paddy seed known for strong tillering, uniform maturity and excellent market preference in the Rayalaseema region.",
    features: ["High germination & vigorous seedlings", "Strong tillering habit", "Fine grain with good market demand", "Suited to Kharif & Rabi seasons"],
    usage: "Suitable for transplanted and direct-sown paddy. Sowing window and seed rate as per the seed packet label for your region.",
    safety: LABEL_NOTE, image: IMG.seeds, featured: false,
  },
  {
    id: 2, slug: "vijaya-hybrid-chilli-seeds", name: "Vijaya Hot Hybrid Chilli Seeds", brand: "nuziveedu",
    category: "seeds", crops: ["chilli"], problems: ["crop-growth"],
    packSizes: ["10 g", "50 g", "100 g"],
    overview: "A vigorous hot chilli hybrid producing long, glossy red fruit with high dry-recovery — a favourite with commercial chilli growers.",
    features: ["Long, attractive dark-red fruit", "High dry-chilli recovery", "Good tolerance to leaf curl stress", "Extended picking window"],
    usage: "Nursery-raised and transplanted. Follow packet guidance for nursery, spacing and transplanting stage.",
    safety: LABEL_NOTE, image: IMG.seeds, featured: false,
  },
  {
    id: 3, slug: "superboll-cotton-seeds", name: "SuperBoll BG-II Cotton Seeds", brand: "kaveri-seeds",
    category: "seeds", crops: ["cotton"], problems: ["crop-growth", "insect-control"],
    packSizes: ["475 g packet"],
    overview: "BG-II cotton hybrid with big bolls, good staple quality and strong performance in rain-fed and irrigated conditions.",
    features: ["Big boll size & easy picking", "Good fibre quality", "Wide adaptability", "Robust plant frame"],
    usage: "Sowing time, spacing and refuge requirements as printed on the packet.",
    safety: LABEL_NOTE, image: IMG.seeds, featured: false,
  },
  {
    id: 4, slug: "powerkernel-maize-seeds", name: "PowerKernel Hybrid Maize Seeds", brand: "corteva",
    category: "seeds", crops: ["maize"], problems: ["crop-growth"],
    packSizes: ["4 kg", "8 kg"],
    overview: "High-yield single-cross maize hybrid with deep orange kernels, strong standability and reliable performance across seasons.",
    features: ["High shelling percentage", "Strong stalk — lodging tolerance", "Uniform cob filling", "Performs in Kharif & Rabi"],
    usage: "Seed rate and spacing per packet label. Suitable for grain and feed purposes.",
    safety: LABEL_NOTE, image: IMG.seeds, featured: false,
  },
  {
    id: 5, slug: "k6-groundnut-seeds", name: "K-6 Groundnut Seed (Selected)", brand: "kaveri-seeds",
    category: "seeds", crops: ["groundnut"], problems: ["crop-growth"],
    packSizes: ["10 kg", "20 kg", "40 kg bag"],
    overview: "Carefully graded K-6 groundnut seed — the trusted variety of Anantapur district — cleaned and selected for high field emergence.",
    features: ["Graded, uniform kernels", "High field emergence", "Trusted regional variety", "Good pod filling & oil content"],
    usage: "Recommended with seed treatment before sowing. Ask our team about suitable seed-treatment products.",
    safety: LABEL_NOTE, image: IMG.seeds, featured: false,
  },
  {
    id: 6, slug: "greenleaf-vegetable-combo", name: "GreenLeaf Vegetable Seed Combo", brand: "syngenta",
    category: "seeds", crops: ["vegetables"], problems: ["crop-growth"],
    packSizes: ["Combo pack", "Individual packets"],
    overview: "A curated combo of tomato, brinjal, okra and leafy vegetable seed packets — ideal for market gardens and home plots.",
    features: ["Popular commercial varieties", "High germination packets", "Season-wise selection help at store", "Small & large pack options"],
    usage: "Each packet carries its own sowing calendar and spacing guide.",
    safety: LABEL_NOTE, image: IMG.seeds, featured: false,
  },

  // ── INSECTICIDES ──
  {
    id: 7, slug: "agristrike-505", name: "AgriStrike 505 EC", brand: "upl",
    category: "insecticides", crops: ["paddy", "cotton", "maize"], problems: ["insect-control"],
    packSizes: ["100 ml", "250 ml", "500 ml", "1 L"],
    overview: "Broad-spectrum contact insecticide for chewing pests including borers and caterpillars in paddy, cotton and maize.",
    features: ["Broad-spectrum action", "Quick knockdown of caterpillars", "Widely used & trusted formulation", "Multiple pack sizes"],
    usage: "Target pests, crop stage and application details are specified on the manufacturer's label. Use only label-listed crops.",
    safety: "Wear protective clothing, avoid spraying against the wind and keep away from children, food and water bodies. " + LABEL_NOTE,
    image: IMG.insect, featured: false,
  },
  {
    id: 8, slug: "stemguard-granules", name: "StemGuard 4G Granules", brand: "dhanuka",
    category: "insecticides", crops: ["paddy"], problems: ["insect-control"],
    packSizes: ["1 kg", "5 kg"],
    overview: "Granular soil-applied insecticide widely used against stem borer and leaf folder pressure in paddy fields.",
    features: ["Convenient granular application", "Systemic protection", "Fits standard paddy pest schedules", "Trusted by paddy growers"],
    usage: "Apply as per the label at the crop stage indicated by the manufacturer.",
    safety: "Use gloves while broadcasting granules and wash hands thoroughly after use. " + LABEL_NOTE,
    image: IMG.insect, featured: false,
  },
  {
    id: 9, slug: "suckaway-sl", name: "SuckAway Systemic SL", brand: "bayer",
    category: "insecticides", crops: ["chilli", "cotton", "vegetables"], problems: ["sucking-pests", "insect-control"],
    packSizes: ["50 ml", "100 ml", "250 ml", "500 ml"],
    overview: "Systemic insecticide for sucking pest complexes — thrips, aphids, jassids and whitefly — in chilli, cotton and vegetables.",
    features: ["Systemic, rain-fast action", "Effective on thrips & whitefly", "Low dose per acre", "Compatible with spray schedules"],
    usage: "Crop-wise pest targets and spray timing per the manufacturer's label.",
    safety: "Do not spray during bee activity hours; follow the pre-harvest interval printed on the label. " + LABEL_NOTE,
    image: IMG.insect, featured: false,
  },
  {
    id: 10, slug: "larvaend-ec", name: "LarvaEnd EC", brand: "syngenta",
    category: "insecticides", crops: ["maize", "vegetables"], problems: ["insect-control"],
    packSizes: ["80 ml", "160 ml", "300 ml"],
    overview: "Modern-chemistry insecticide for fall armyworm and fruit borer management in maize and vegetable crops.",
    features: ["Effective on fall armyworm", "Long spray interval", "Soft on beneficial insects", "New-generation chemistry"],
    usage: "Apply at the pest stage and interval given on the manufacturer's label.",
    safety: "Follow label pre-harvest intervals strictly for vegetables. " + LABEL_NOTE,
    image: IMG.insect, featured: false,
  },

  // ── FUNGICIDES ──
  {
    id: 11, slug: "fungocure-75wp", name: "FungoCure 75 WP", brand: "indofil",
    category: "fungicides", crops: ["paddy", "chilli", "groundnut", "vegetables"], problems: ["fungal-disease"],
    packSizes: ["250 g", "500 g", "1 kg"],
    overview: "Multi-site protective fungicide — a spray-schedule staple for leaf spots, blights and general fungal disease pressure.",
    features: ["Broad-spectrum protection", "Multi-site action — low resistance risk", "Economical per-acre cost", "Mixes well in schedules"],
    usage: "Crop and disease targets are listed on the manufacturer's label; use as a protective spray as directed.",
    safety: "Avoid inhaling powder while mixing; use a mask and gloves. " + LABEL_NOTE,
    image: IMG.fungi, featured: false,
  },
  {
    id: 12, slug: "blastshield-sc", name: "BlastShield SC", brand: "bayer",
    category: "fungicides", crops: ["paddy"], problems: ["fungal-disease"],
    packSizes: ["120 ml", "250 ml", "500 ml"],
    overview: "Systemic fungicide widely used by paddy farmers against blast and sheath blight during vulnerable crop stages.",
    features: ["Systemic & curative action", "Targets blast + sheath blight", "Protects panicle stage", "Trusted paddy fungicide"],
    usage: "Spray timing for nursery, tillering and panicle stages is specified on the label.",
    safety: "Do not enter the sprayed field until the re-entry period is over. " + LABEL_NOTE,
    image: IMG.fungi, featured: false,
  },
  {
    id: 13, slug: "powdervanish-sl", name: "PowderVanish SL", brand: "rallis",
    category: "fungicides", crops: ["chilli", "vegetables"], problems: ["fungal-disease"],
    packSizes: ["100 ml", "250 ml", "500 ml"],
    overview: "Specialist fungicide for powdery mildew management in chilli and vegetable crops with protective and curative activity.",
    features: ["Strong on powdery mildew", "Protective + curative", "Safe on flowering when used per label", "Good tank-mix partner"],
    usage: "Apply at first sign of mildew as per label guidance.",
    safety: LABEL_NOTE, image: IMG.fungi, featured: false,
  },
  {
    id: 14, slug: "rootsafe-wp", name: "RootSafe WP", brand: "basf",
    category: "fungicides", crops: ["groundnut", "vegetables"], problems: ["fungal-disease", "seed-treatment"],
    packSizes: ["100 g", "250 g", "500 g"],
    overview: "Soil and collar-region fungicide used against stem rot and root rot complexes in groundnut and vegetables.",
    features: ["Targets stem & root rots", "Soil drench or seed-furrow use", "Supports healthy root zone", "Proven in groundnut belts"],
    usage: "Application method (drench / furrow) and timing as per the manufacturer's label.",
    safety: LABEL_NOTE, image: IMG.fungi, featured: false,
  },

  // ── HERBICIDES ──
  {
    id: 15, slug: "weedzero-41sl", name: "WeedZero 41 SL", brand: "upl",
    category: "herbicides", crops: ["cotton", "maize"], problems: ["weed-control"],
    packSizes: ["500 ml", "1 L", "5 L"],
    overview: "Non-selective systemic herbicide for clearing established weeds in field bunds, fallows and label-permitted situations.",
    features: ["Systemic — kills weeds to the root", "Broad weed spectrum", "Economical field clearing", "Rain-fast after drying"],
    usage: "Use only in situations permitted on the label. Avoid drift onto standing crops.",
    safety: "Use a dedicated sprayer or triple-rinse equipment after use; keep away from desirable plants. " + LABEL_NOTE,
    image: IMG.herb, featured: false,
  },
  {
    id: 16, slug: "paddyclean-ec", name: "PaddyClean Selective EC", brand: "pi-industries",
    category: "herbicides", crops: ["paddy"], problems: ["weed-control"],
    packSizes: ["100 ml", "250 ml", "500 ml"],
    overview: "Selective post-emergence herbicide for grassy weed control in transplanted and direct-sown paddy.",
    features: ["Selective — safe on paddy per label", "Controls Echinochloa grasses", "Early post-emergence window", "Widely used in AP paddy"],
    usage: "Weed stage and water management guidance per the manufacturer's label.",
    safety: LABEL_NOTE, image: IMG.herb, featured: false,
  },
  {
    id: 17, slug: "maizemaster-od", name: "MaizeMaster OD", brand: "corteva",
    category: "herbicides", crops: ["maize"], problems: ["weed-control"],
    packSizes: ["115 ml", "230 ml"],
    overview: "Post-emergence herbicide for broadleaf and grassy weed control in maize with crop-safe selective chemistry.",
    features: ["Broadleaf + grass control", "Crop-safe on maize per label", "Wide application window", "One-pass weed management"],
    usage: "Apply at the weed and crop stage indicated on the label.",
    safety: LABEL_NOTE, image: IMG.herb, featured: false,
  },

  // ── CROP CARE ──
  {
    id: 18, slug: "growmax-bio-stimulant", name: "GrowMax Bio Stimulant", brand: "coromandel",
    category: "crop-care", crops: ["paddy", "chilli", "cotton", "groundnut", "maize", "vegetables"], problems: ["crop-growth"],
    packSizes: ["250 ml", "500 ml", "1 L"],
    overview: "Seaweed-based bio stimulant that supports root development, stress recovery and overall plant vigour across crops.",
    features: ["Boosts root & shoot growth", "Helps crops recover from stress", "Suitable for all major crops", "Foliar or drip application"],
    usage: "Foliar spray or fertigation as per pack directions.",
    safety: LABEL_NOTE, image: IMG.care, featured: false,
  },
  {
    id: 19, slug: "microboost-zn-b", name: "MicroBoost Zinc + Boron", brand: "coromandel",
    category: "crop-care", crops: ["paddy", "groundnut", "maize", "vegetables"], problems: ["crop-growth"],
    packSizes: ["250 g", "500 g", "1 kg"],
    overview: "Micronutrient formulation correcting zinc and boron deficiency — supports grain filling, pod development and fruit set.",
    features: ["Corrects Zn & B deficiency", "Supports pod & grain filling", "Chelated for quick uptake", "Soil or foliar application"],
    usage: "Apply on visible deficiency or as part of the nutrition schedule per pack directions.",
    safety: LABEL_NOTE, image: IMG.care, featured: false,
  },
  {
    id: 20, slug: "flowerset-pgr", name: "FlowerSet PGR", brand: "rallis",
    category: "crop-care", crops: ["chilli", "cotton", "vegetables"], problems: ["crop-growth"],
    packSizes: ["100 ml", "250 ml", "500 ml"],
    overview: "Plant growth regulator supporting flowering, fruit set and retention in chilli, cotton and vegetable crops.",
    features: ["Improves flowering & retention", "Reduces flower drop stress", "Fits standard spray schedules", "Trusted PGR chemistry"],
    usage: "Apply at flowering stages as directed on the manufacturer's label.",
    safety: LABEL_NOTE, image: IMG.care, featured: false,
  },

  // ── SEED TREATMENT ──
  {
    id: 21, slug: "seedarmor-ws", name: "SeedArmor WS", brand: "syngenta",
    category: "seed-treatment", crops: ["groundnut", "paddy", "maize"], problems: ["seed-treatment", "fungal-disease"],
    packSizes: ["50 g", "100 g", "250 g"],
    overview: "Seed-treatment fungicide protecting seed and young seedlings from soil-borne and seed-borne diseases for a strong start.",
    features: ["Protects seed & seedlings", "Improves field emergence", "Easy slurry treatment", "Small packs for marginal farmers"],
    usage: "Seed treatment rate per kg of seed is given on the label; treat and shade-dry before sowing.",
    safety: "Treated seed must never be used for food or feed. " + LABEL_NOTE,
    image: IMG.treat, featured: false,
  },
  {
    id: 22, slug: "rhizogold-culture", name: "RhizoGold Bio Culture", brand: "coromandel",
    category: "seed-treatment", crops: ["groundnut"], problems: ["seed-treatment", "crop-growth"],
    packSizes: ["200 g", "500 g"],
    overview: "Rhizobium bio-inoculant for groundnut supporting natural nitrogen fixation and healthier root nodulation.",
    features: ["Natural nitrogen fixation", "Better nodulation & root health", "Eco-friendly bio input", "Low cost per acre"],
    usage: "Coat seed just before sowing as per pack directions; keep away from direct sunlight.",
    safety: LABEL_NOTE, image: IMG.treat, featured: false,
  },
  {
    id: 23, slug: "siri-green-hybrid-ssg", name: "Siri-Green Hybrid SSG Fodder Jowar", brand: "siri-seeds",
    category: "seeds", crops: ["maize"], problems: ["crop-growth"],
    packSizes: ["1 kg", "5 kg"],
    overview: "Premium multi-cut fodder jowar producing a massive 190–200 t/ha of high-protein green biomass — the trusted feed for dairy and livestock farmers.",
    features: ["Multicut — average fodder yield 190–200 t/ha", "High tillering & lush leaf foliage", "Produces high biomass per acre", "High crude protein green fodder", "Siri Seeds — 25+ years of trust"],
    usage: "Sow 8–10 kg per acre in rows; first cut at 50–55 days, then every 25–30 days as per the packet label.",
    safety: LABEL_NOTE, image: asset("/images/products/Siri-Green_Packshot.jpg"), featured: true,
  },
];

// ── Knowledge articles ──────────────────────────────────────
export const articles: Article[] = [
  {
    slug: "chilli-crop-care-guide",
    title: "Complete guide to chilli crop care",
    kind: "Crop Guide",
    image: "https://images.pexels.com/photos/13208797/pexels-photo-13208797.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    excerpt: "From nursery to final picking — the key stages, common problems and good practices for a healthy chilli crop.",
    minutes: 6,
    body: [
      "Chilli is one of the most rewarding — and most sensitive — commercial crops in our region. Success starts with a healthy nursery: use fresh, quality hybrid seed, raised beds and clean nursery soil to avoid damping-off problems.",
      "After transplanting, the first 30–40 days decide the frame of the plant. Balanced nutrition and careful irrigation matter more than heavy spraying at this stage. Scout the field twice a week and look under leaves for early thrips or mite activity.",
      "Flowering and fruit-set stages are when sucking pests and powdery mildew typically build up. Identify the exact problem before spraying — bring an affected leaf or plant to the store and our team will help you identify it and choose a label-approved product.",
      "Always rotate chemistry between spray rounds as per label guidance, respect pre-harvest intervals, and never mix products without checking compatibility. Good picking hygiene and proper drying protect the final grade of your dry chilli.",
    ],
  },
  {
    slug: "groundnut-common-pests",
    title: "Common pests affecting groundnut",
    kind: "Pest Guide",
    image: "https://images.pexels.com/photos/33303280/pexels-photo-33303280.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    excerpt: "Know the leaf miner, thrips, red hairy caterpillar and white grub — and when each one becomes a real threat.",
    minutes: 5,
    body: [
      "Groundnut in Anantapur–Dharmavaram belts faces a familiar set of pests each season. The key is knowing which pest is present and whether it has crossed the economic threshold before spending on sprays.",
      "Leaf miner shows as blotchy mines and folded leaflets, usually in dry spells. Thrips damage shows as curled, silvery leaflets on young plants and can also spread bud necrosis disease.",
      "White grub and red hairy caterpillar are soil and defoliating pests respectively — both are best managed with community-level action and preventive measures like seed treatment and summer ploughing.",
      "Before purchasing any insecticide, confirm the pest with our store team or your local agricultural officer, and follow the label for the exact crop and pest listed.",
    ],
  },
  {
    slug: "identify-fungal-diseases",
    title: "Identifying fungal diseases in crops",
    kind: "Disease Guide",
    image: "https://images.pexels.com/photos/39006068/pexels-photo-39006068.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    excerpt: "Blast, blight, mildew or leaf spot? Learn to read the symptoms before choosing a fungicide.",
    minutes: 5,
    body: [
      "Many crop losses come not from the disease itself but from spraying the wrong product for it. Fungal diseases have readable patterns once you know what to look for.",
      "Paddy blast shows spindle-shaped lesions with grey centres; sheath blight climbs from the waterline as irregular banded patches. Powdery mildew appears as white dusty growth, usually on the upper leaf surface, while downy mildew shows on the underside.",
      "Leaf spots are usually round with defined borders; blights spread fast with irregular dead areas. Wilts and root rots show as whole-plant drooping — check the stem base and roots, not just the leaves.",
      "Take clear photos or bring a sample to the store. Choosing a fungicide whose label lists your crop and disease — and spraying at the right stage — saves both money and the crop.",
    ],
  },
  {
    slug: "seasonal-farming-tips",
    title: "Seasonal advice for Kharif preparation",
    kind: "Farmer Tips",
    image: "https://images.pexels.com/photos/18620459/pexels-photo-18620459.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    excerpt: "Simple pre-season steps — seed selection, seed treatment and soil preparation — that pay off all season.",
    minutes: 4,
    body: [
      "The cheapest yield gains come before sowing. Summer ploughing exposes soil pests, and well-decomposed farmyard manure improves both moisture holding and root health.",
      "Buy seed early from a trusted source, check the lot number and germination date on the packet, and keep your bill — it is your guarantee.",
      "Treat seed before sowing wherever recommended: seed treatment is the lowest-cost crop protection you will do all year.",
      "Plan your input needs for the whole season and talk to us before the rush — we can help you plan category-wise: seed, nutrition, weed management and protection.",
    ],
  },
  {
    slug: "safe-pesticide-use",
    title: "Using crop protection products safely",
    kind: "Farmer Tips",
    image: "https://images.pexels.com/photos/33339086/pexels-photo-33339086.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    excerpt: "Protect yourself, your family and your buyers — the essential rules of safe pesticide handling.",
    minutes: 4,
    body: [
      "Crop protection products are tools — safe when respected, dangerous when careless. Always read the label, even for products you have used before; labels change.",
      "Wear covered clothing, gloves and a mask while mixing and spraying. Never blow into blocked nozzles, never spray against the wind, and never let children near spraying operations or empty containers.",
      "Respect the pre-harvest interval printed on every label — it protects your family and your market. Triple-rinse and puncture empty containers; never reuse them for any household purpose.",
      "Store products locked, in original containers, away from food and feed. If anyone feels unwell after handling products, go to a doctor immediately and carry the product label with you.",
    ],
  },
  {
    slug: "paddy-weed-management",
    title: "Smart weed management in paddy",
    kind: "Crop Guide",
    image: "https://images.pexels.com/photos/13888402/pexels-photo-13888402.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    excerpt: "Weeds steal up to a third of paddy yield. Timing — not just product choice — is everything.",
    minutes: 5,
    body: [
      "The first 40 days are the critical weed-free period for paddy. Weeds that establish in this window cause most of the yield loss for the whole season.",
      "Good water management is your first herbicide: uniform land levelling and maintaining a thin water film suppresses many grassy weeds naturally.",
      "Where herbicides are needed, product choice depends on whether your field is transplanted or direct-sown and on the weed stage — the same product fails completely if sprayed too late.",
      "Bring details of your sowing method and weed age when you visit; we will help you match a label-approved product and explain the water management it needs to work.",
    ],
  },
];

// ── Lookup helpers ──────────────────────────────────────────
export const brandName = (slug: string) =>
  brands.find((b) => b.slug === slug)?.name ??
  legacyBrands.find((b) => b.slug === slug)?.name ??
  slug;
export const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
export const cropName = (slug: string) => crops.find((c) => c.slug === slug)?.name ?? slug;
export const cropEmoji = (slug: string) => crops.find((c) => c.slug === slug)?.emoji ?? "🌱";
export const problemName = (slug: string) => problems.find((p) => p.slug === slug)?.name ?? slug;
