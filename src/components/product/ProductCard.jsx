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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col gap-3"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <ProductImage src={product.image} alt={product.name} />

          {!product.stock && (
            <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-sage-500 backdrop-blur-sm">
              Out of stock
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
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          {product.stock ? "Add to Selection" : "Out of Stock"}
        </Button>

        <IconButton
          variant="ghost"
          size="md"
          label={favorited ? "Remove from favorites" : "Add to favorites"}
          onClick={() => toggleFavorite(product.id, product.name)}
          className={`${
            favorited
              ? "bg-rose-100 text-rose-500 hover:bg-rose-200"
              : "text-sage-400 hover:bg-sage-100"
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-smooth ${
              favorited ? "fill-rose-500" : ""
            }`}
          />
        </IconButton>
      </div>
    </motion.article>
  );
}
