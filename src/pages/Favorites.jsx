import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { getProducts } from "../services/productsService";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import ProductGrid from "../components/product/ProductGrid";

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

      <Container className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-3xl font-bold text-sage-800 sm:text-4xl">
          Favorites
        </h1>
        <p className="mt-1 text-sm text-sage-500">
          {totalFavorites > 0
            ? `${totalFavorites} saved item${totalFavorites !== 1 ? "s" : ""}`
            : "Your saved items, waiting for you."}
        </p>
      </motion.div>

      {loading && totalFavorites > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: Math.min(totalFavorites, 4) }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : favoriteProducts.length > 0 ? (
        <motion.div
          key={favoriteProducts.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-10"
        >
          <ProductGrid products={favoriteProducts} columns={4} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <Heart className="h-16 w-16 text-sage-200" />
          <p className="mt-4 font-serif text-xl font-bold text-sage-800">
            No favorites yet
          </p>
          <p className="mt-1 text-sm text-sage-500">
            Start exploring and save what you love.
          </p>
          <Link to="/catalog">
            <Button variant="primary" size="md" className="mt-8">
              Explore Products
            </Button>
          </Link>
        </motion.div>
      )}
    </Container>
    </>
  );
}
