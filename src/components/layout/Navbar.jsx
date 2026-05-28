import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, ShoppingCart, Shield, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/catalog", label: "Catalog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    ...(isAuthenticated ? [{ to: "/admin", label: "Admin" }] : []),
  ];

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-terra-400 after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded ${
      isActive ? "text-terra-600 after:w-full" : "text-sage-600 hover:text-sage-800"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/80 backdrop-blur-xl border-b border-sage-100/30 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12" aria-label="Main navigation">
        <Link
          to="/"
          className="font-serif text-xl font-bold tracking-tight text-sage-800 hover:text-terra-600 transition-colors duration-300"
          aria-label="Home"
        >
          Velas & Succulentas
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `relative p-2 transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 ${
                isActive ? "text-rose-500 bg-rose-50/60" : "text-sage-400 hover:text-rose-400 hover:bg-rose-50/40"
              }`
            }
            aria-label={`Favorites${totalFavorites > 0 ? ` (${totalFavorites} saved)` : ""}`}
          >
            <Heart className="h-5 w-5" />
            {totalFavorites > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-rose-400 px-1 text-[10px] font-bold text-white shadow-sm" aria-hidden="true">
                {totalFavorites}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative p-2 transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 ${
                isActive ? "text-terra-500 bg-terra-50/60" : "text-sage-400 hover:text-terra-400 hover:bg-terra-50/40"
              }`
            }
            aria-label={`Cart${totalItems > 0 ? ` (${totalItems} items)` : ""}`}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-terra-500 px-1 text-[10px] font-bold text-white shadow-sm" aria-hidden="true">
                {totalItems}
              </span>
            )}
          </NavLink>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-1 p-2 text-sage-400 transition-colors hover:text-sage-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 rounded-full md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="border-t border-sage-100/30 bg-cream-50/95 backdrop-blur-xl overflow-hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 px-5 pb-8 pt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-terra-50/80 text-terra-600"
                        : "text-sage-600 hover:bg-sage-50/60 hover:text-sage-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <hr className="my-2 border-sage-100/60" />
              <NavLink
                to="/favorites"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive ? "bg-rose-50/80 text-rose-500" : "text-sage-600 hover:bg-sage-50/60"
                  }`
                }
              >
                <span>Favorites</span>
                {totalFavorites > 0 && (
                  <span className="rounded-full bg-rose-400 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    {totalFavorites}
                  </span>
                )}
              </NavLink>
              <NavLink
                to="/cart"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive ? "bg-terra-50/80 text-terra-500" : "text-sage-600 hover:bg-sage-50/60"
                  }`
                }
              >
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="rounded-full bg-terra-500 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
