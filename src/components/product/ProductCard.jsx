import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col gap-4 rounded-2xl bg-white/40 p-4 backdrop-blur-sm border border-sage-100/40 hover:border-sage-200/60 transition-all duration-500 hover:shadow-elevated hover:bg-white/60"
    >
      <Link to={`/product/${product.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 rounded-xl" aria-label={`View ${product.name}`}>
        <div className="relative">
          <ProductImage src={product.image} alt={product.name} />

          {!product.stock && (
            <span className="absolute left-3 top-3 rounded-full bg-white/60 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-sage-500 border border-white/20">
              Out of stock
            </span>
          )}

          {product.featured && (
            <span className="absolute right-3 top-3 rounded-full bg-terra-500/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
              Featured
            </span>
          )}
        </div>

        <ProductInfo
          name={product.name}
          category={product.category}
          description={product.description}
        />

        <ProductPrice price={product.price} />
      </Link>

      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => addToCart(product)}
          disabled={!product.stock}
          className="flex-1"
          aria-label={`Add ${product.name} to selection`}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          {product.stock ? "Add to Selection" : "Out of Stock"}
        </Button>

        <IconButton
          variant="ghost"
          size="md"
          label={favorited ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          onClick={() => toggleFavorite(product.id, product.name)}
          className={`transition-all duration-300 ${
            favorited
              ? "bg-rose-100/80 text-rose-500 hover:bg-rose-200/80 shadow-sm"
              : "text-sage-300 hover:text-rose-400 hover:bg-rose-50/60"
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${
              favorited ? "fill-rose-500 scale-110" : ""
            }`}
          />
        </IconButton>
      </div>
    </motion.article>
  );
}
