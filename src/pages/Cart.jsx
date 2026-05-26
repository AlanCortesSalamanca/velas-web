import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function Cart() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl font-bold text-brand-700 sm:text-4xl">Cart</h1>
        <p className="mt-2 text-sage-600">Review your selections before checkout.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-16 flex flex-col items-center justify-center text-center text-sage-400"
      >
        <ShoppingCart className="h-12 w-12" />
        <p className="mt-4 text-lg">Your cart is empty.</p>
        <p className="text-sm">Add something beautiful to get started.</p>
      </motion.div>
    </div>
  );
}
