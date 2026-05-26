import { Link } from "react-router-dom";
import { Leaf, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-sage-200 bg-sage-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="font-serif text-lg font-bold text-brand-700">
              Velas & Succulentas
            </Link>
            <p className="mt-2 text-sm text-sage-600">
              Artisan candles and curated succulents for mindful living.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-sage-800">Shop</h3>
            <ul className="space-y-2 text-sm text-sage-600">
              <li><Link to="/catalog" className="transition-colors hover:text-brand-600">All Products</Link></li>
              <li><Link to="/catalog" className="transition-colors hover:text-brand-600">Candles</Link></li>
              <li><Link to="/catalog" className="transition-colors hover:text-brand-600">Succulents</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-sage-800">Company</h3>
            <ul className="space-y-2 text-sm text-sage-600">
              <li><Link to="/about" className="transition-colors hover:text-brand-600">About Us</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-brand-600">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-sage-800">Connect</h3>
            <p className="text-sm text-sage-600">
              Follow us for inspiration and new arrivals.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-sage-200 pt-8 sm:flex-row">
          <p className="text-xs text-sage-500">
            &copy; {currentYear} Velas & Succulentas. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-sage-500">
            <span className="flex items-center gap-1"><Sparkles className="h-3 w-3" /> Handcrafted</span>
            <span className="flex items-center gap-1"><Leaf className="h-3 w-3" /> Sustainable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
