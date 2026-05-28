import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { getProducts } from "../services/productsService";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import ProductGrid from "../components/product/ProductGrid";
import { fadeUp, viewportOnce } from "../utils/motion";

export default function Favorites() {
  const { favoriteIds, totalFavorites } = useFavorites();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProducts().then(({ data }) => {
      if (!mounted) return;
      setAllProducts(data || []);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  const favoriteProducts = allProducts.filter((p) =>
    favoriteIds.includes(p.id)
  );

  return (
    <>
      <SEO title="Favorites" description="Your saved handcrafted candles, succulents, and decor pieces." />

      <Container className="py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-terra-500">
            <Sparkles className="h-3 w-3" />
            Saved Items
          </span>
          <h1 className="mt-2 font-serif text-4xl font-bold text-sage-700 sm:text-5xl">
            Favorites
          </h1>
          <p className="mt-2 text-sm text-sage-400">
            {totalFavorites > 0
              ? `${totalFavorites} saved item${totalFavorites !== 1 ? "s" : ""}`
              : "Your saved items, waiting for you."}
          </p>
        </motion.div>

        {loading && totalFavorites > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: Math.min(totalFavorites, 4) }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : favoriteProducts.length > 0 ? (
          <motion.div
            key={favoriteProducts.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-12"
          >
            <ProductGrid products={favoriteProducts} columns={4} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-50 to-cream-100">
              <Heart className="h-12 w-12 text-rose-300" />
            </div>
            <p className="mt-6 font-serif text-2xl font-bold text-sage-700">
              No favorites yet
            </p>
            <p className="mt-2 text-sm text-sage-400">
              Start exploring and save what you love.
            </p>
            <Link to="/catalog">
              <Button variant="primary" size="md" className="mt-10">
                Explore Products
              </Button>
            </Link>
          </motion.div>
        )}
      </Container>
    </>
  );
}
