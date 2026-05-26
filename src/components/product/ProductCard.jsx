import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import IconButton from "../ui/IconButton";

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col gap-3"
    >
      <div className="relative">
        <ProductImage src={product.image} alt={product.name} />
        <IconButton
          variant="ghost"
          size="sm"
          label="Add to favorites"
          className="absolute right-2 top-2 bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </IconButton>
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
    </motion.article>
  );
}
