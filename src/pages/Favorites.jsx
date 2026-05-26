import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Favorites() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl font-bold text-brand-700 sm:text-4xl">Favorites</h1>
        <p className="mt-2 text-sage-600">Your saved items, waiting for you.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-16 flex flex-col items-center justify-center text-center text-sage-400"
      >
        <Heart className="h-12 w-12" />
        <p className="mt-4 text-lg">No favorites yet.</p>
        <p className="text-sm">Start exploring and save what you love.</p>
      </motion.div>
    </div>
  );
}
