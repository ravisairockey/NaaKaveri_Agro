import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl">🌾</p>
      <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/60">
        The page you're looking for doesn't exist or may have been moved. Explore our products
        instead — or message us on WhatsApp and we'll help you find what you need.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="rounded-full bg-deep px-6 py-3 text-sm font-bold text-white transition hover:bg-primary">
          Back to Home
        </Link>
        <Link to="/products" className="rounded-full border-2 border-charcoal/12 bg-white px-6 py-3 text-sm font-bold text-charcoal transition hover:border-deep hover:text-deep">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
