import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Phone, Clock, MessageCircle, Send, CheckCircle2,
  ShieldCheck, HeartHandshake, Leaf, Store,
} from "lucide-react";
import Reveal from "../components/Reveal";
import { STORE, waLink, directionsLink, asset } from "../config";

// ────────────────────────── ABOUT ──────────────────────────

export function AboutPage() {
  const values = [
    { icon: ShieldCheck, title: "Genuine Products Only", text: "Every product on our shelves comes from authorised distributors — sealed, billed and traceable." },
    { icon: HeartHandshake, title: "Honest Guidance", text: "We recommend what your crop needs, not what earns us more. Farmers return because advice here is straight." },
    { icon: Leaf, title: "Respect for the Label", text: "We explain the manufacturer's label clearly and never suggest off-label use of crop protection products." },
    { icon: Store, title: "Here Every Season", text: "A physical store on Anjuman Cir Rd, Dharmavaram — open through sowing, spraying and harvest seasons." },
  ];

  return (
    <div>
      <section className="bg-deep py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-warm-yellow">About Us</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
              Serving the farmers of Dharmavaram
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {STORE.name} is a family-run agricultural inputs store on Anjuman Cir Rd, Dharmavaram.
              We supply quality seed, crop protection and plant nutrition to farming families
              across Dharmavaram and the surrounding villages — with advice given the way it
              should be: honestly, patiently and in Telugu.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <Reveal>
          <img src={asset("/images/store.jpg")} alt="Our store" className="w-full rounded-3xl object-cover shadow-xl" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
            More than a shop — a season-long partner
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/65 sm:text-base">
            Farming in our region means paddy, groundnut, chilli, cotton, maize and vegetables —
            each with its own seasons, pests and decisions. Our role is simple: keep genuine
            inputs in stock, help you identify problems correctly, and make sure every product
            leaves the store with clear label guidance.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/65 sm:text-base">
            Bring an affected leaf, a photo, or just your question. Whether you farm half an acre
            or fifty, you get the same attention and the same honest answer.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/products" className="rounded-full bg-deep px-6 py-3 text-sm font-bold text-white transition hover:bg-primary">
              Explore Products
            </Link>
            <Link to="/contact" className="rounded-full border-2 border-charcoal/12 bg-white px-6 py-3 text-sm font-bold text-charcoal transition hover:border-deep hover:text-deep">
              Visit the Store
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="bg-mint/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <h2 className="text-center font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
              What we stand for
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-charcoal/8 bg-white p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-deep">
                    <v.icon size={23} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-extrabold text-charcoal">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ───────────────────────── CONTACT ─────────────────────────

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", crop: "", message: "" });

  const submitToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello ${STORE.name},\n\nName: ${form.name}\nPhone: ${form.phone}\nCrop: ${form.crop || "—"}\n\nEnquiry: ${form.message}`;
    window.open(waLink(msg), "_blank");
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <Reveal>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Visit Us</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
          Visit Sri Narayana
        </h1>
        <p className="mt-3 max-w-xl text-sm text-charcoal/60">
          Come to the store, call us, or send your enquiry — we reply fastest on WhatsApp.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-charcoal/8 shadow-sm">
              <iframe
                title="Store location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(STORE.mapsQuery)}&output=embed`}
                className="h-72 w-full sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-charcoal/8 bg-white p-6">
              <h2 className="font-display text-lg font-extrabold text-charcoal">{STORE.name}</h2>
              <ul className="mt-4 space-y-3.5 text-sm">
                <li className="flex gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-deep" />
                  <span className="font-semibold text-charcoal/75">{STORE.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone size={17} className="mt-0.5 shrink-0 text-deep" />
                  <a href={`tel:${STORE.phoneTel}`} className="font-semibold text-charcoal/75 hover:text-deep">{STORE.phoneDisplay}</a>
                </li>
                {STORE.hours.map((h) => (
                  <li key={h.day} className="flex gap-3">
                    <Clock size={17} className="mt-0.5 shrink-0 text-deep" />
                    <span className="font-semibold text-charcoal/75">{h.day}: {h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <a href={directionsLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-deep py-3 text-xs font-extrabold text-white transition hover:bg-primary">
                  <MapPin size={14} /> Directions
                </a>
                <a href={`tel:${STORE.phoneTel}`} className="flex items-center justify-center gap-2 rounded-xl bg-charcoal py-3 text-xs font-extrabold text-white">
                  <Phone size={14} /> Call
                </a>
                <a href={waLink(`Hello ${STORE.name}, I have an enquiry.`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-xs font-extrabold text-white">
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="rounded-3xl border border-charcoal/8 bg-white p-6 sm:p-8">
            <h2 className="font-display text-lg font-extrabold text-charcoal">Send an enquiry</h2>
            <p className="mt-1.5 text-xs text-charcoal/55">
              Fill this in and press send — it opens WhatsApp with your message ready.
            </p>
            {sent ? (
              <div className="mt-8 rounded-2xl bg-mint p-8 text-center">
                <CheckCircle2 size={40} className="mx-auto text-primary" />
                <h3 className="mt-3 font-display text-lg font-extrabold text-deep">Enquiry ready!</h3>
                <p className="mt-2 text-sm text-charcoal/65">
                  Your message was opened in WhatsApp. If it didn't open, call us at {STORE.phoneDisplay}.
                </p>
                <button onClick={() => setSent(false)} className="mt-5 rounded-full bg-deep px-6 py-2.5 text-xs font-extrabold text-white">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submitToWhatsApp} className="mt-6 space-y-4">
                <Field label="Your name *">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-charcoal/12 bg-cream px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Ravi Kumar" />
                </Field>
                <Field label="Phone number *">
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-charcoal/12 bg-cream px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="10-digit mobile number" />
                </Field>
                <Field label="Crop (optional)">
                  <input value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })}
                    className="w-full rounded-xl border border-charcoal/12 bg-cream px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Chilli, Paddy, Groundnut" />
                </Field>
                <Field label="Your enquiry *">
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-charcoal/12 bg-cream px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Which product do you need, or what problem is your crop facing?" />
                </Field>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 font-display text-sm font-extrabold text-white transition hover:brightness-95">
                  <Send size={16} /> Send via WhatsApp
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-charcoal/50">{label}</span>
      {children}
    </label>
  );
}
