import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sage-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="font-serif text-xl font-bold tracking-tight text-brand-700"
        >
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

        <div className="flex items-center gap-3">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `relative transition-colors hover:text-brand-600 ${
                isActive ? "text-brand-600" : "text-sage-700"
              }`
            }
          >
            <Heart className="h-5 w-5" />
            {totalFavorites > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-400 px-1 text-[10px] font-bold text-white">
                {totalFavorites}
              </span>
            )}
            <span className="sr-only">Favorites</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative transition-colors hover:text-brand-600 ${
                isActive ? "text-brand-600" : "text-sage-700"
              }`
            }
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </NavLink>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-1 text-sage-700 transition-colors hover:text-brand-600 md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="border-t border-sage-200 bg-white px-4 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-brand-600 ${
                    isActive
                      ? "bg-brand-50 text-brand-600"
                      : "text-sage-700 hover:bg-sage-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <hr className="my-1 border-sage-200" />
            <NavLink
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-rose-50 text-rose-600" : "text-sage-700 hover:bg-sage-50"
                }`
              }
            >
              <span>Favorites</span>
              {totalFavorites > 0 && (
                <span className="rounded-full bg-rose-400 px-2 py-0.5 text-[11px] font-bold text-white">
                  {totalFavorites}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-brand-50 text-brand-600" : "text-sage-700 hover:bg-sage-50"
                }`
              }
            >
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
