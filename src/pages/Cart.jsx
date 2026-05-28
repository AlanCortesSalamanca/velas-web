import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  MessageCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { createQuoteRequest } from "../services/quoteRequestsService";
import { generateWhatsAppUrl } from "../utils/generateWhatsAppMessage";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import Button, { MagneticButton } from "../components/ui/Button";
import ProductImage from "../components/product/ProductImage";
import { fadeUp, staggerFast, viewportOnce } from "../utils/motion";

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, x: 24, transition: { duration: 0.25 } },
};

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } =
    useCart();
  const [sending, setSending] = useState(false);

  const handleWhatsApp = useCallback(async () => {
    setSending(true);

    const quoteData = {
      items: items.map((i) => ({
        productId: i.productId,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      estimatedSubtotal: subtotal,
      desiredTotalPieces: totalItems,
      uniqueProducts: items.length,
    };

    const { fallback } = await createQuoteRequest(quoteData);

    if (fallback) {
      console.log("[Cart] Quote request logged locally (DB unavailable).");
    } else {
      toast.success("Quote saved! Opening WhatsApp...");
    }

    const url = generateWhatsAppUrl(items, subtotal);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setSending(false), 800);
  }, [items, subtotal, totalItems]);

  if (items.length === 0) {
    return (
      <>
        <SEO title="Cart" description="Your custom order selection." />
        <Container className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-terra-50 to-cream-100">
              <FileText className="h-12 w-12 text-terra-300" />
            </div>
            <h1 className="mt-8 font-serif text-3xl font-bold text-sage-700 sm:text-4xl">
              No items selected yet
            </h1>
            <p className="mt-3 max-w-md text-sage-400 leading-relaxed">
              Browse our collection and add the pieces you&rsquo;re interested
              in. We&rsquo;ll prepare a personalized quote for you.
            </p>
            <Link to="/catalog">
              <Button variant="primary" size="md" className="mt-10">
                Start Browsing
              </Button>
            </Link>
          </motion.div>
        </Container>
      </>
    );
  }

  return (
    <>
      <SEO title="Cart" description="Review your selection and request a quote." />
      <Container className="py-12 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-terra-500">
              <Sparkles className="h-3 w-3" />
              Your Selection
            </span>
            <h1 className="mt-2 font-serif text-4xl font-bold text-sage-700 sm:text-5xl">
              Custom Order
            </h1>
            <p className="mt-1 text-sm text-sage-400">
              {totalItems} item{totalItems !== 1 ? "s" : ""} for quotation
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-sage-400 hover:text-rose-400">
            Clear All
          </Button>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          {/* ---- Product list ---- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerFast}
            className="space-y-5 lg:col-span-2"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  variants={slideIn}
                  layout
                  className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-sage-100/40 p-4 sm:p-5 transition-all duration-300 hover:shadow-card hover:bg-white/70"
                >
                  <div className="flex gap-4 sm:gap-6">
                    <Link to={`/product/${item.product.id}`} className="shrink-0">
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-28 w-24 sm:h-32 sm:w-28 rounded-xl"
                        aspectRatio=""
                      />
                    </Link>

                    <div className="flex flex-1 flex-col justify-between gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/product/${item.product.id}`}>
                            <h3 className="text-base font-semibold text-sage-700 transition-colors hover:text-terra-600">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="mt-0.5 text-xs text-sage-400">
                            ${item.product.price.toFixed(2)} per unit
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.productId, item.product.name)
                          }
                          className="shrink-0 p-1.5 rounded-lg text-sage-300 transition-all duration-200 hover:text-rose-400 hover:bg-rose-50/60"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-sage-400">
                            Desired qty
                          </span>
                          <div className="flex items-center gap-0.5 rounded-xl border border-sage-200/60 bg-white/60 overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                              className="flex h-9 w-9 items-center justify-center text-sage-400 transition-colors hover:text-sage-700 hover:bg-sage-50/60"
                              aria-label="Decrease desired quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="flex h-9 w-10 items-center justify-center text-sm font-semibold text-sage-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              className="flex h-9 w-9 items-center justify-center text-sage-400 transition-colors hover:text-sage-700 hover:bg-sage-50/60"
                              aria-label="Increase desired quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <span className="text-sm font-medium text-sage-600">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ---- Summary ---- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-fit"
          >
            <div className="rounded-2xl bg-gradient-to-br from-sage-50/50 to-cream-50/50 backdrop-blur-sm border border-sage-100/40 p-7">
              <h2 className="font-serif text-xl font-bold text-sage-700">
                Quote Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-sage-500">
                  <span>Unique products</span>
                  <span className="font-semibold text-sage-700">{items.length}</span>
                </div>
                <div className="flex justify-between text-sage-500">
                  <span>Desired total pieces</span>
                  <span className="font-semibold text-sage-700">{totalItems}</span>
                </div>
                <hr className="border-sage-200/60" />
                <div className="flex justify-between text-base font-bold text-sage-800">
                  <span>Estimated Selection</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-sage-400">
                  Price per unit is fixed. Quantity indicates desired pieces for
                  your quote. Final pricing confirmed via WhatsApp.
                </p>
              </div>

              <MagneticButton
                variant="primary"
                size="lg"
                className="mt-8 w-full gap-2"
                onClick={handleWhatsApp}
                disabled={sending}
              >
                {sending ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                )}
                {sending ? "Opening WhatsApp..." : "Request Quote via WhatsApp"}
              </MagneticButton>

              <p className="mt-4 text-center text-[11px] text-sage-400">
                We&rsquo;ll respond with a personalized quote
              </p>

              <div className="mt-6 text-center">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-sage-400 transition-colors hover:text-terra-600"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Continue Browsing
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </>
  );
}
