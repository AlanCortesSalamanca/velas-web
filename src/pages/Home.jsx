import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-serif text-4xl font-bold text-brand-700 sm:text-5xl lg:text-6xl">
          Velas & Succulentas
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-600">
          Artisan candles and hand-selected succulents to bring warmth and life into your space.
        </p>
      </motion.section>
    </div>
  );
}
