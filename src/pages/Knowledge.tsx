import { Link, useParams } from "react-router-dom";
import { ChevronRight, Clock, MessageCircle } from "lucide-react";
import Reveal from "../components/Reveal";
import { articles } from "../data/catalog";
import { STORE, waLink } from "../config";
import NotFound from "./NotFound";

export function KnowledgePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <Reveal>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">From Sri Narayana</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
          Agriculture Knowledge
        </h1>
        <p className="mt-3 max-w-xl text-sm text-charcoal/60">
          Practical crop guides, pest identification and seasonal advice — written for the
          farmers of our region.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={(i % 3) * 0.06}>
            <Link to={`/knowledge/${a.slug}`} className="group block h-full overflow-hidden rounded-3xl border border-charcoal/8 bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-mint px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-deep">
                  {a.kind}
                </span>
                <h2 className="mt-3 font-display text-lg font-bold leading-snug text-charcoal group-hover:text-deep">
                  {a.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-charcoal/55">{a.excerpt}</p>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-charcoal/40">
                  <Clock size={12} /> {a.minutes} min read
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;

  const others = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <nav className="flex items-center gap-1 text-xs font-semibold text-charcoal/50">
          <Link to="/" className="hover:text-deep">Home</Link>
          <ChevronRight size={13} />
          <Link to="/knowledge" className="hover:text-deep">Knowledge</Link>
          <ChevronRight size={13} />
          <span className="truncate text-charcoal/80">{article.title}</span>
        </nav>

        <span className="mt-6 inline-block rounded-full bg-mint px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-deep">
          {article.kind}
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-charcoal sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-charcoal/45">
          <Clock size={13} /> {article.minutes} min read · {STORE.shortName} team
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl">
          <img src={article.image} alt={article.title} className="aspect-[16/9] w-full object-cover" />
        </div>

        <div className="mt-8 space-y-5">
          {article.body.map((p, i) => (
            <p key={i} className="text-[15px] leading-[1.85] text-charcoal/75">{p}</p>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-deep p-6 text-white sm:p-8">
          <h3 className="font-display text-lg font-extrabold">Have a crop problem right now?</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            Send a photo of the affected plant on WhatsApp — our team will help identify the
            problem and suggest a label-approved solution.
          </p>
          <a
            href={waLink(`Hello ${STORE.name}, I read your guide "${article.title}" and need advice for my crop.`)}
            target="_blank" rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-extrabold text-white transition hover:brightness-95"
          >
            <MessageCircle size={16} /> Ask on WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-14">
        <h2 className="font-display text-xl font-extrabold text-charcoal">More guides</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {others.map((a) => (
            <Link key={a.slug} to={`/knowledge/${a.slug}`} className="group flex gap-4 rounded-2xl border border-charcoal/8 bg-white p-3 transition hover:shadow-md">
              <img src={a.image} alt={a.title} loading="lazy" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-primary">{a.kind}</p>
                <p className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-charcoal group-hover:text-deep">{a.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
