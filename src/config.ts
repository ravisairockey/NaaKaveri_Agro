// ─────────────────────────────────────────────────────────────
// CENTRAL STORE CONFIGURATION
// Change phone / WhatsApp / address here — it updates everywhere.
// ─────────────────────────────────────────────────────────────

export const STORE = {
  name: "Sri Narayana Seeds & Pesticides",
  shortName: "Sri Narayana",
  tagline: "Quality seeds, crop protection & agricultural solutions",
  // Store contact numbers (international format, digits only)
  whatsappNumber: "919347874855",
  phoneDisplay: "+91 94918 30758",
  phoneTel: "+919491830758",
  address: "Anjuman Cir Rd, Maruthinagar, Akkpedianera, Dharmavaram, Andhra Pradesh 515671",
  addressShort: "Anjuman Cir Rd, Dharmavaram",
  hours: [
    { day: "Monday – Saturday", time: "8:00 AM – 8:30 PM" },
    { day: "Sunday", time: "8:00 AM – 1:00 PM" },
  ],
  mapsQuery: "Sri Narayana Seeds and Pesticides, Anjuman Circle Road, Dharmavaram",
};

export function waLink(message: string): string {
  return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productEnquiryLink(productName: string): string {
  return waLink(
    `Hello, I'm interested in ${productName}. Is this product available at ${STORE.name}?`
  );
}

export const directionsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  STORE.mapsQuery
)}`;

// Resolve a public asset (e.g. "/images/hero/store.jpg") so it works on ANY host —
// GitHub Pages sub-path (ravisairockey.github.io/NaaKaveri_Agro/), a custom
// domain, or local dev. Always use asset() for images instead of raw paths.
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + "/";
  return base + path.replace(/^\//, "");
}
