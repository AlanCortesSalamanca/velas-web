import { motion } from "framer-motion";

export default function Catalog() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl font-bold text-brand-700 sm:text-4xl">Catalog</h1>
        <p className="mt-2 text-sage-600">Browse our collection of candles and succulents.</p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="aspect-[3/4] rounded-lg bg-sage-100"
          />
        ))}
      </div>
    </div>
  );
}
