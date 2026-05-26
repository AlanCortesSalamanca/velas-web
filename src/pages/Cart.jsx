import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import ProductImage from "../components/product/ProductImage";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <ShoppingCart className="h-16 w-16 text-sage-200" />
          <h1 className="mt-6 font-serif text-2xl font-bold text-sage-800 sm:text-3xl">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sage-500">
            Add something beautiful to get started.
          </p>
          <Link to="/catalog">
            <Button variant="primary" size="md" className="mt-8">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-serif text-3xl font-bold text-sage-800 sm:text-4xl">
            Cart
          </h1>
          <p className="mt-1 text-sm text-sage-500">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCart}>
          Clear All
        </Button>
      </motion.div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* ---- Product list ---- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-4 lg:col-span-2"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.productId}
                variants={slideIn}
                layout
                className="flex gap-4 rounded-xl border border-sage-100 bg-white p-3 shadow-soft sm:gap-5 sm:p-4"
              >
                <Link
                  to="/catalog"
                  className="shrink-0"
                >
                  <ProductImage
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-20 sm:h-28 sm:w-24"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to="/catalog">
                        <h3 className="text-sm font-semibold text-sage-800 transition-colors hover:text-brand-600 sm:text-base">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="mt-0.5 text-xs text-sage-400">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        removeFromCart(item.productId, item.product.name)
                      }
                      className="shrink-0 text-sage-300 transition-colors hover:text-rose-400"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-lg border border-sage-200">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center text-sage-500 transition-colors hover:text-sage-800"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="flex h-8 w-8 items-center justify-center text-sm font-medium text-sage-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center text-sage-500 transition-colors hover:text-sage-800"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-sage-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ---- Summary ---- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="h-fit rounded-xl border border-sage-100 bg-sage-50 p-6"
        >
          <h2 className="font-serif text-lg font-bold text-sage-800">
            Order Summary
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-sage-600">
              <span>Subtotal ({totalItems} items)</span>
              <span className="font-medium text-sage-800">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sage-600">
              <span>Shipping</span>
              <span className="font-medium text-sage-400">Calculated at checkout</span>
            </div>
            <hr className="border-sage-200" />
            <div className="flex justify-between text-base font-semibold text-sage-800">
              <span>Estimated Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Button variant="primary" size="lg" className="mt-6 w-full" disabled>
            Proceed to Checkout
          </Button>
          <p className="mt-3 text-center text-[11px] text-sage-400">
            Demo store — no real payment processing
          </p>

          <div className="mt-5 text-center">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sage-500 transition-colors hover:text-brand-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
