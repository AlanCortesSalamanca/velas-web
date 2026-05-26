import { useState } from "react";
import { motion } from "framer-motion";
import products, { categories } from "../data/products";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import ProductGrid from "../components/product/ProductGrid";

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <Container className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-3xl font-bold text-sage-800 sm:text-4xl">
          Catalog
        </h1>
        <p className="mt-2 text-sage-500">
          Browse our collection of candles and succulents.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-8 flex flex-wrap gap-2"
      >
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </Button>
        ))}
      </motion.div>

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-10"
      >
        <p className="mb-6 text-sm text-sage-400">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <p className="py-20 text-center text-sage-400">
            No products found in this category.
          </p>
        )}
      </motion.div>
    </Container>
  );
}
