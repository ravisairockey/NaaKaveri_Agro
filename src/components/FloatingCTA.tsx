import { Phone, MessageCircle } from "lucide-react";
import { STORE, waLink } from "../config";

/** Floating WhatsApp button (desktop) + sticky Call/WhatsApp bar (mobile). */
export default function FloatingCTA() {
  const msg = waLink(`Hello ${STORE.name}, I would like to know about your products.`);
  return (
    <>
      {/* desktop floating whatsapp */}
      <a
        href={msg}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition hover:scale-105 sm:flex"
      >
        <MessageCircle size={26} strokeWidth={2.2} />
      </a>

      {/* mobile sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-charcoal/10 bg-charcoal/10 sm:hidden">
        <a href={`tel:${STORE.phoneTel}`} className="flex items-center justify-center gap-2 bg-charcoal py-3.5 text-sm font-extrabold text-white">
          <Phone size={17} /> Call Store
        </a>
        <a href={msg} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-extrabold text-white">
          <MessageCircle size={17} /> WhatsApp
        </a>
      </div>
      {/* spacer so content is not hidden behind mobile bar */}
      <div className="h-12 sm:hidden" />
    </>
  );
}
