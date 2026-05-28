import { Link } from "react-router-dom";
import { Leaf, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-sage-900 via-sage-800 to-sage-900 text-white/80">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,106,46,0.08)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(122,141,98,0.06)_0%,_transparent_50%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="font-serif text-xl font-bold text-cream-100 hover:text-cream-200 transition-colors duration-300">
              Velas & Succulentas
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/50 max-w-sm">
              Artisan candles and curated succulents for mindful living. Handcrafted with intention, designed for beauty.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/catalog" className="text-white/60 transition-all duration-200 hover:text-cream-200 hover:pl-1">All Products</Link></li>
              <li><Link to="/catalog" className="text-white/60 transition-all duration-200 hover:text-cream-200 hover:pl-1">Candles</Link></li>
              <li><Link to="/catalog" className="text-white/60 transition-all duration-200 hover:text-cream-200 hover:pl-1">Succulents</Link></li>
              <li><Link to="/catalog" className="text-white/60 transition-all duration-200 hover:text-cream-200 hover:pl-1">Gift Sets</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-white/60 transition-all duration-200 hover:text-cream-200 hover:pl-1">About Us</Link></li>
              <li><Link to="/contact" className="text-white/60 transition-all duration-200 hover:text-cream-200 hover:pl-1">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Connect</h3>
            <p className="text-sm leading-relaxed text-white/50">
              Follow us for inspiration, behind-the-scenes content, and new arrivals.
            </p>
            <div className="mt-4 flex gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/40 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:text-cream-200 hover:border-cream-200/30 cursor-pointer text-xs">
                IG
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/40 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:text-cream-200 hover:border-cream-200/30 cursor-pointer text-xs">
                FB
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/40 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:text-cream-200 hover:border-cream-200/30 cursor-pointer text-xs">
                PI
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; {currentYear} Velas & Succulentas. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/30">
            <span className="flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Handcrafted</span>
            <span className="flex items-center gap-1.5"><Leaf className="h-3 w-3" /> Sustainable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
