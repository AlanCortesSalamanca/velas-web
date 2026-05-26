import { Link, NavLink } from "react-router-dom";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sage-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-serif text-xl font-bold text-brand-700 tracking-tight">
          Velas & Succulentas
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-brand-600 ${
                  isActive ? "text-brand-600" : "text-sage-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `transition-colors hover:text-brand-600 ${
                isActive ? "text-brand-600" : "text-sage-700"
              }`
            }
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favorites</span>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `transition-colors hover:text-brand-600 ${
                isActive ? "text-brand-600" : "text-sage-700"
              }`
            }
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </NavLink>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sage-700 transition-colors hover:text-brand-600 md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="border-t border-sage-200 bg-white px-4 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-brand-600 ${
                    isActive ? "text-brand-600" : "text-sage-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
